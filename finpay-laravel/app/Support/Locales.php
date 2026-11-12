<?php

namespace App\Support;

class Locales
{
    public const ALL = ['fr', 'en'];
    public const DEFAULT = 'fr';

    public static function labels(): array
    {
        return ['fr' => 'Français', 'en' => 'English'];
    }

    public static function current(): string
    {
        $l = app()->getLocale();

        return in_array($l, self::ALL, true) ? $l : self::DEFAULT;
    }

    /** Pick a translated value from {"fr":..,"en":..} (or a plain string) with fallback. */
    public static function pick(mixed $value, ?string $locale = null): string
    {
        if (is_string($value) || is_numeric($value)) {
            return (string) $value;
        }
        if (! is_array($value)) {
            return '';
        }
        $locale ??= self::current();
        foreach ([$locale, self::DEFAULT, ...self::ALL] as $l) {
            if (isset($value[$l]) && is_scalar($value[$l]) && trim((string) $value[$l]) !== '') {
                return (string) $value[$l];
            }
        }

        return '';
    }

    /** Is this array a {"fr":..,"en":..} translation map? */
    public static function isMap(mixed $value): bool
    {
        return is_array($value) && $value !== [] && array_diff(array_keys($value), self::ALL) === [];
    }
}
