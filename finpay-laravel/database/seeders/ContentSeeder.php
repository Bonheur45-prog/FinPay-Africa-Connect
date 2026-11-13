<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Media;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Post;
use App\Models\Redirect;
use App\Models\Setting;
use App\Models\Solution;
use App\Models\TeamMember;
use App\Models\User;
use App\Services\MediaService;
use App\Support\Blocks;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

/**
 * Initial FinPay Africa content (converted from the previous React site, FR + EN).
 * Safe to run once on an empty database; it skips everything if pages already exist.
 */
class ContentSeeder extends Seeder
{
    private array $assets = [];

    public function run(): void
    {
        if (Page::withTrashed()->exists()) {
            $this->command?->warn('Content already exists — ContentSeeder skipped.');

            return;
        }

        $data = json_decode(file_get_contents(database_path('seeders/data/content.json')), true);

        foreach ($data['settings'] as $group => $value) {
            Setting::put($group, $this->resolveAssets($value));
        }

        foreach ($data['pages'] as $p) {
            Page::create([
                'slug' => $p['slug'],
                'system_key' => $p['system_key'],
                'title' => $p['title'],
                'meta_title' => $p['meta_title'] ?? null,
                'meta_description' => $p['meta_description'] ?? null,
                'sections' => Blocks::sanitize($this->resolveAssets($p['sections'])),
                'status' => 'published',
                'show_in_footer' => $p['show_in_footer'] ?? false,
            ]);
        }

        foreach ($data['solutions'] as $s) {
            Solution::create([
                'slug' => $s['slug'], 'icon' => $s['icon'], 'sort' => $s['sort'],
                'tag' => $s['tag'], 'title' => $s['title'], 'summary' => $s['summary'],
                'image_id' => $this->resolveAssets($s['image']),
                'meta_title' => $s['meta_title'], 'meta_description' => $s['meta_description'],
                'sections' => Blocks::sanitize($this->resolveAssets($s['sections'])),
                'status' => 'published',
            ]);
        }

        foreach ($data['partners'] as $p) {
            Partner::create([
                'name' => $p['name'], 'category' => $p['category'],
                'logo_id' => isset($p['logo']) ? $this->resolveAssets($p['logo']) : null,
                'partnership_type' => $p['partnership_type'], 'description' => $p['description'],
                'since' => $p['since'], 'region' => $p['region'], 'sort' => $p['sort'],
                'show_in_logo_bar' => $p['show_in_logo_bar'], 'status' => 'published',
            ]);
        }

        foreach ($data['team'] as $m) {
            TeamMember::create($m + ['status' => 'published', 'show_on_contact' => true]);
        }

        $cats = [];
        foreach ($data['categories'] as $i => $c) {
            $cats[$c['slug']] = Category::create($c + ['sort' => $i])->id;
        }

        foreach ($data['posts'] as $i => $p) {
            Post::create([
                'slug' => $p['slug'], 'category_id' => $cats[$p['category']] ?? null,
                'cover_id' => $this->resolveAssets($p['cover']),
                'title' => $p['title'], 'excerpt' => $p['excerpt'], 'body' => $p['body'],
                'author_name' => 'FinPay Africa',
                'reading_minutes' => Post::estimateMinutes($p['body']),
                'status' => 'draft',              // TODO(content): sample articles stay drafts until replaced
                'published_at' => now()->subDays(3 * ($i + 1)),
            ]);
        }

        foreach ($data['redirects'] as $r) {
            Redirect::create($r);
        }

        $this->createAdmin();

        \App\Support\ContentUpgrades::run();
    }

    /** Replace "@asset:file" tokens with media ids, importing each asset once. */
    private function resolveAssets(mixed $value): mixed
    {
        if (is_array($value)) {
            return array_map(fn ($v) => $this->resolveAssets($v), $value);
        }
        if (is_string($value) && str_starts_with($value, '@asset:')) {
            $file = substr($value, 7);
            if (! isset($this->assets[$file])) {
                $path = database_path('seeders/assets/'.$file);
                $this->assets[$file] = is_file($path)
                    ? app(MediaService::class)->storePath($path, $file)->id
                    : null;
            }

            return $this->assets[$file];
        }

        return $value;
    }

    private function createAdmin(): void
    {
        $email = config('services.admin.email');
        if (! $email) {
            $this->command?->warn('ADMIN_EMAIL not set — create the first admin with: php artisan cms:create-admin');

            return;
        }
        if (! config('services.admin.password') && app()->isProduction()) {
            // Never print a generated password into deploy logs.
            $this->command?->warn('ADMIN_PASSWORD not set — run: php artisan cms:create-admin '.$email);

            return;
        }
        $password = config('services.admin.password') ?: Str::password(16);
        User::updateOrCreate(['email' => $email], ['name' => 'Administrator', 'password' => $password, 'role' => 'admin', 'is_active' => true]);
        if (! config('services.admin.password')) {
            $this->command?->info("Admin created: {$email} / {$password}  (change it after first login)");
        }
    }
}
