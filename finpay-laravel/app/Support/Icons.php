<?php

namespace App\Support;

/** Inline SVG icons (Lucide, ISC licence — see resources/icons/LICENSE-lucide). */
class Icons
{
    private static ?array $cache = null;

    public static function names(): array
    {
        return array_keys(self::all());
    }

    public static function all(): array
    {
        if (self::$cache !== null) {
            return self::$cache;
        }
        $icons = [];
        foreach (glob(resource_path('icons/*.svg')) as $file) {
            $svg = file_get_contents($file);
            if (preg_match('#<svg[^>]*>(.*)</svg>#s', $svg, $m)) {
                $icons[basename($file, '.svg')] = trim(preg_replace('/\s+/', ' ', $m[1]));
            }
        }
        ksort($icons);

        return self::$cache = $icons;
    }

    public static function svg(string $name, string $class = 'icon', float $stroke = 1.75): string
    {
        $inner = self::all()[$name] ?? self::all()['circle-check'] ?? '';
        $fill = str_starts_with($name, 'brand-') ? 'currentColor' : 'none';
        $strokeAttr = $fill === 'none' ? ' stroke="currentColor" stroke-width="'.$stroke.'" stroke-linecap="round" stroke-linejoin="round"' : '';

        return '<svg class="'.e($class).'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="'.$fill.'"'.$strokeAttr.' aria-hidden="true" focusable="false">'.$inner.'</svg>';
    }
}
