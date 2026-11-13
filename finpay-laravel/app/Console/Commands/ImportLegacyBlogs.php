<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Post;
use App\Services\MediaService;
use App\Support\HtmlSanitizer;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Throwable;

/**
 * Imports blog posts exported from the previous Express/MongoDB backend.
 * Accepts `mongoexport --jsonArray` output or one JSON document per line.
 * Existing slugs are skipped, so the command can be re-run safely.
 */
class ImportLegacyBlogs extends Command
{
    protected $signature = 'cms:import-blogs {file : Path to the exported JSON} {--no-images : Do not download cover images} {--dry-run}';

    protected $description = 'Import blog posts from the old FinPay MongoDB export';

    private const CATEGORY_NAMES = [
        'product' => ['fr' => 'Produit', 'en' => 'Product'], 'engineering' => ['fr' => 'Ingénierie', 'en' => 'Engineering'],
        'growth' => ['fr' => 'Croissance', 'en' => 'Growth'], 'security' => ['fr' => 'Sécurité', 'en' => 'Security'],
        'design' => ['fr' => 'Design', 'en' => 'Design'], 'culture' => ['fr' => 'Culture', 'en' => 'Culture'],
    ];

    public function handle(MediaService $media): int
    {
        $path = $this->argument('file');
        if (! is_file($path)) {
            $this->error("File not found: {$path}");

            return self::FAILURE;
        }
        $raw = trim(file_get_contents($path));
        $docs = str_starts_with($raw, '[') ? json_decode($raw, true) : array_map(fn ($l) => json_decode($l, true), array_filter(explode("\n", $raw)));
        if (! is_array($docs)) {
            $this->error('Could not read JSON.');

            return self::FAILURE;
        }

        $created = $skipped = 0;
        foreach (array_filter($docs) as $d) {
            $slug = Str::slug($d['slug'] ?? Str::slug($d['title']['en'] ?? $d['title']['fr'] ?? '')) ?: null;
            if (! $slug || Post::withTrashed()->where('slug', $slug)->exists()) {
                $skipped++;

                continue;
            }
            $body = [];
            foreach (['fr', 'en'] as $l) {
                $body[$l] = HtmlSanitizer::clean($this->toHtml((string) ($d['content'][$l] ?? '')));
            }
            $catKey = (string) ($d['category'] ?? '');
            $category = $catKey ? Category::firstOrCreate(['slug' => Str::slug($catKey)], ['name' => self::CATEGORY_NAMES[$catKey] ?? ['fr' => ucfirst($catKey), 'en' => ucfirst($catKey)]]) : null;

            if ($this->option('dry-run')) {
                $this->line("Would import: {$slug}");
                $created++;

                continue;
            }

            $coverId = null;
            if (! $this->option('no-images') && ! empty($d['coverImage']) && str_starts_with($d['coverImage'], 'https://')) {
                $coverId = $this->downloadImage($d['coverImage'], $slug, $media);
            }

            Post::create([
                'slug' => $slug,
                'category_id' => $category?->id,
                'cover_id' => $coverId,
                'title' => $this->pair($d['title'] ?? []),
                'excerpt' => $this->pair($d['excerpt'] ?? $d['description'] ?? []),
                'body' => $body,
                'meta_title' => $this->pair($d['seoTitle'] ?? []),
                'meta_description' => $this->pair($d['seoDescription'] ?? []),
                'author_name' => $d['author']['name'] ?? 'FinPay Africa',
                'status' => ($d['status'] ?? 'draft') === 'published' ? 'published' : 'draft',
                'published_at' => $this->date($d['publishedAt'] ?? $d['createdAt'] ?? null),
                'featured' => (bool) ($d['featured'] ?? false),
                'views' => (int) ($d['views'] ?? 0),
                'reading_minutes' => Post::estimateMinutes($body),
            ]);
            $created++;
            $this->info("Imported: {$slug}");
        }

        $this->line("Done — {$created} imported, {$skipped} skipped (already present or without slug).");

        return self::SUCCESS;
    }

    private function pair(array $v): array
    {
        return ['fr' => trim(strip_tags((string) ($v['fr'] ?? ''))), 'en' => trim(strip_tags((string) ($v['en'] ?? '')))];
    }

    private function toHtml(string $text): string
    {
        if ($text === '' || preg_match('/<(p|h[1-6]|ul|ol|div|br)\b/i', $text)) {
            return $text;
        }

        return collect(preg_split("/\n{2,}/", str_replace("\r", '', $text)))->map(fn ($p) => '<p>'.nl2br(e(trim($p))).'</p>')->implode('');
    }

    private function date(mixed $v): ?Carbon
    {
        $v = is_array($v) ? ($v['$date'] ?? null) : $v;
        try {
            return $v ? Carbon::parse(is_array($v) ? ($v['$numberLong'] / 1000) : $v) : null;
        } catch (Throwable) {
            return null;
        }
    }

    private function downloadImage(string $url, string $slug, MediaService $media): ?int
    {
        try {
            $res = Http::timeout(20)->get($url);
            if (! $res->successful()) {
                return null;
            }
            $tmp = tempnam(sys_get_temp_dir(), 'img');
            file_put_contents($tmp, $res->body());
            $m = $media->storePath($tmp, $slug.'.'.(pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg'));
            @unlink($tmp);

            return $m->id;
        } catch (Throwable $e) {
            $this->warn("Image skipped for {$slug}: ".$e->getMessage());

            return null;
        }
    }
}
