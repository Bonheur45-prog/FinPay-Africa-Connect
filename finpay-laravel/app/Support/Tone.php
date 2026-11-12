<?php

namespace App\Support;

class Tone
{
    public static function section(?string $tone): string
    {
        return match ($tone) {
            'dark' => 'bg-dark-section on-dark relative overflow-hidden',
            'muted' => 'bg-surface',
            default => 'bg-white',
        };
    }

    public static function dark(?string $tone): bool
    {
        return $tone === 'dark';
    }
}
