<?php

use App\Models\Media;
use App\Models\Setting;
use App\Support\Blocks;
use App\Support\Icons;
use App\Support\Locales;
use App\Support\MediaRegistry;
use Illuminate\Support\HtmlString;

if (! function_exists('tr')) {
    /** Translated value of a {"fr":..,"en":..} map for the current locale. */
    function tr(mixed $value, ?string $locale = null): string
    {
        return Locales::pick($value, $locale);
    }
}

if (! function_exists('icon')) {
    function icon(?string $name, string $class = 'icon size-5', float $stroke = 1.75): HtmlString
    {
        return new HtmlString($name ? Icons::svg($name, $class, $stroke) : '');
    }
}

if (! function_exists('href')) {
    /** Localized URL for an internal path ("/about" → "/en/about"); external URLs pass through. */
    function href(?string $url, ?string $locale = null): string
    {
        return Blocks::href($url, $locale);
    }
}

if (! function_exists('setting')) {
    function setting(string $key, mixed $default = null): mixed
    {
        return Setting::get($key, $default);
    }
}

if (! function_exists('media')) {
    function media(mixed $id): ?Media
    {
        return app(MediaRegistry::class)->get($id);
    }
}

if (! function_exists('has_text')) {
    /** True when a translated field has text in the current locale (or fallback). */
    function has_text(mixed $value): bool
    {
        return trim(Locales::pick($value)) !== '';
    }
}
