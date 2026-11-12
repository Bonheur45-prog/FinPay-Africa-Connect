<?php

namespace App\Models;

use App\Models\Concerns\Audited;
use App\Models\Concerns\HasTranslations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use Audited, HasTranslations, SoftDeletes;

    protected $table = 'media';

    protected $fillable = ['path', 'filename', 'mime', 'size', 'width', 'height', 'variants', 'alt', 'uploaded_by'];

    protected array $translatable = ['alt'];

    protected $casts = ['variants' => 'array'];

    public const DISK = 'media';

    public function url(?string $variant = null): string
    {
        $path = ($variant && ! empty($this->variants[$variant])) ? $this->variants[$variant] : $this->path;

        return asset('media/'.ltrim($path, '/'));
    }

    /** srcset string for responsive images. */
    public function srcset(): string
    {
        $parts = [];
        foreach (['sm' => 640, 'md' => 1280] as $k => $w) {
            if (! empty($this->variants[$k])) {
                $parts[] = $this->url($k).' '.$w.'w';
            }
        }
        if ($this->width) {
            $parts[] = $this->url().' '.$this->width.'w';
        }

        return implode(', ', $parts);
    }

    public function isImage(): bool
    {
        return str_starts_with($this->mime, 'image/');
    }

    public function auditLabel(): string
    {
        return $this->filename;
    }

    public function humanSize(): string
    {
        $s = $this->size;

        return $s > 1048576 ? round($s / 1048576, 1).' MB' : max(1, round($s / 1024)).' KB';
    }
}
