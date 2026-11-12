<?php

namespace App\Services;

use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use RuntimeException;

/** Stores uploads under public/media/YYYY/MM and creates resized WebP variants with GD. */
class MediaService
{
    public const MAX_BYTES = 10 * 1024 * 1024;

    public const ALLOWED = [
        'image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif',
        'application/pdf' => 'pdf',
    ];

    private const VARIANTS = ['sm' => 640, 'md' => 1280];

    public function storeUpload(UploadedFile $file, ?int $userId = null): Media
    {
        return $this->storePath($file->getRealPath(), $file->getClientOriginalName(), $userId);
    }

    public function storePath(string $source, string $originalName, ?int $userId = null): Media
    {
        $mime = mime_content_type($source) ?: 'application/octet-stream';
        if (! isset(self::ALLOWED[$mime])) {
            throw new RuntimeException("File type {$mime} is not allowed.");
        }
        $size = filesize($source);
        if ($size > self::MAX_BYTES) {
            throw new RuntimeException('File is larger than 10 MB.');
        }

        $dir = date('Y/m');
        $base = Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) ?: 'file';
        $base = Str::limit($base, 60, '').'-'.Str::lower(Str::random(6));
        $ext = self::ALLOWED[$mime];
        $root = public_path('media');
        File::ensureDirectoryExists($root.'/'.$dir);
        $rel = $dir.'/'.$base.'.'.$ext;
        copy($source, $root.'/'.$rel);

        $width = $height = null;
        $variants = [];
        if (str_starts_with($mime, 'image/') && $mime !== 'image/gif' && ($info = @getimagesize($source))) {
            [$width, $height] = $info;
            $variants = $this->makeVariants($root.'/'.$rel, $mime, $width, $height, $dir, $base);
        }

        return Media::create([
            'path' => $rel,
            'filename' => Str::limit($originalName, 180, ''),
            'mime' => $mime,
            'size' => $size,
            'width' => $width,
            'height' => $height,
            'variants' => $variants,
            'alt' => ['fr' => '', 'en' => ''],
            'uploaded_by' => $userId,
        ]);
    }

    private function makeVariants(string $path, string $mime, int $w, int $h, string $dir, string $base): array
    {
        if (! function_exists('imagewebp')) {
            return [];
        }
        $src = match ($mime) {
            'image/jpeg' => @imagecreatefromjpeg($path),
            'image/png' => @imagecreatefrompng($path),
            'image/webp' => @imagecreatefromwebp($path),
            default => false,
        };
        if (! $src) {
            return [];
        }
        $out = [];
        foreach (self::VARIANTS as $key => $target) {
            if ($w <= $target) {
                continue;
            }
            $nh = (int) round($h * $target / $w);
            $dst = imagecreatetruecolor($target, $nh);
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
            imagecopyresampled($dst, $src, 0, 0, 0, 0, $target, $nh, $w, $h);
            $rel = $dir.'/'.$base.'-'.$key.'.webp';
            imagewebp($dst, public_path('media/'.$rel), 82);
            imagedestroy($dst);
            $out[$key] = $rel;
        }
        imagedestroy($src);

        return $out;
    }

    /** Remove the files of a media item (used on permanent delete). */
    public function deleteFiles(Media $media): void
    {
        foreach (array_merge([$media->path], array_values($media->variants ?? [])) as $rel) {
            $full = public_path('media/'.$rel);
            if (is_file($full)) {
                @unlink($full);
            }
        }
    }
}
