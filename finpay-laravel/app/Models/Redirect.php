<?php

namespace App\Models;

use App\Models\Concerns\Audited;
use Illuminate\Database\Eloquent\Model;

class Redirect extends Model
{
    use Audited;

    protected $fillable = ['from_path', 'to_path', 'code', 'hits', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];

    protected static function booted(): void
    {
        $flush = fn () => \Illuminate\Support\Facades\Cache::forget(\App\Http\Middleware\CmsRedirects::CACHE_KEY);
        static::saved($flush);
        static::deleted($flush);
    }

    public static function normalize(string $path): string
    {
        $path = parse_url(trim($path), PHP_URL_PATH) ?: '/';

        return '/'.trim($path, '/');
    }
}
