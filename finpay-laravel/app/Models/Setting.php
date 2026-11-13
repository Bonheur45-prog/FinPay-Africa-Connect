<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

/** Key/value site settings. Groups are stored as one row each (e.g. "general", "contact", "navigation"). */
class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    protected $casts = ['value' => 'array'];

    public const CACHE_KEY = 'cms.settings';

    public static function allCached(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, fn () => static::query()->pluck('value', 'key')
            ->map(fn ($v) => is_string($v) ? json_decode($v, true) : $v)->all());
    }

    /** Dot-notation read: Setting::get('contact.email') */
    public static function get(string $key, mixed $default = null): mixed
    {
        return data_get(static::allCached(), $key, $default);
    }

    public static function put(string $group, array $value): void
    {
        static::updateOrCreate(['key' => $group], ['value' => $value]);
        Cache::forget(self::CACHE_KEY);
    }
}
