<?php

namespace App\Support;

use Illuminate\Support\Str;

/** Validation, sanitizing and helpers for CMS blocks (see config/blocks.php). */
class Blocks
{
    public static function types(): array
    {
        return config('blocks');
    }

    public static function newId(): string
    {
        return 'b_'.Str::lower(Str::random(8));
    }

    /** Clean a sections array coming from the editor: drop unknown types/fields, coerce values. */
    public static function sanitize(mixed $sections): array
    {
        if (is_string($sections)) {
            $sections = json_decode($sections, true);
        }
        if (! is_array($sections)) {
            return [];
        }
        $types = self::types();
        $out = [];
        foreach ($sections as $block) {
            if (! is_array($block) || ! isset($types[$block['type'] ?? null])) {
                continue;
            }
            $type = $block['type'];
            $id = is_string($block['id'] ?? null) && preg_match('/^[a-z0-9_]{3,20}$/i', $block['id']) ? $block['id'] : self::newId();
            $out[] = [
                'id' => $id,
                'type' => $type,
                'visible' => (bool) ($block['visible'] ?? true),
                'data' => self::sanitizeFields($types[$type]['fields'], is_array($block['data'] ?? null) ? $block['data'] : []),
            ];
        }

        return $out;
    }

    public static function sanitizeFields(array $fields, array $data): array
    {
        $clean = [];
        foreach ($fields as $key => $spec) {
            $clean[$key] = self::sanitizeValue($spec, $data[$key] ?? null);
        }

        return $clean;
    }

    private static function sanitizeValue(array $spec, mixed $value): mixed
    {
        $type = $spec['type'];
        if ($type === 'repeater') {
            $rows = [];
            foreach (is_array($value) ? array_values($value) : [] as $row) {
                if (is_array($row)) {
                    $rows[] = self::sanitizeFields($spec['fields'], $row);
                }
            }

            return array_slice($rows, 0, 60);
        }
        if ($type === 'link') {
            $value = is_array($value) ? $value : [];

            return [
                'label' => self::translated($value['label'] ?? null, fn ($v) => self::text($v, 120)),
                'url' => self::url($value['url'] ?? ''),
            ];
        }
        if (! empty($spec['t'])) {
            return self::translated($value, fn ($v) => self::scalar($type, $v, $spec));
        }

        return self::scalar($type, $value, $spec);
    }

    private static function translated(mixed $value, callable $fn): array
    {
        if (! is_array($value)) {
            $value = [Locales::DEFAULT => $value];
        }
        $out = [];
        foreach (Locales::ALL as $l) {
            $out[$l] = $fn($value[$l] ?? '');
        }

        return $out;
    }

    private static function scalar(string $type, mixed $v, array $spec): mixed
    {
        return match ($type) {
            'richtext' => HtmlSanitizer::clean(is_scalar($v) ? (string) $v : ''),
            'textarea' => self::text($v, 5000),
            'number' => is_numeric($v) ? $v + 0 : null,
            'toggle' => filter_var($v, FILTER_VALIDATE_BOOLEAN),
            'image' => is_numeric($v) && (int) $v > 0 ? (int) $v : null,
            'select' => array_key_exists((string) $v, $spec['options'] ?? []) ? (string) $v : (string) array_key_first($spec['options'] ?? ['' => '']),
            'icon' => in_array($v, Icons::names(), true) ? $v : '',
            default => self::text($v, 300),
        };
    }

    private static function text(mixed $v, int $max): string
    {
        return is_scalar($v) ? mb_substr(trim(strip_tags((string) $v)), 0, $max) : '';
    }

    public static function url(mixed $v): string
    {
        $v = is_scalar($v) ? trim((string) $v) : '';
        if ($v === '' || preg_match('#^(https?://|mailto:|tel:|/|\#)#i', $v)) {
            return mb_substr($v, 0, 500);
        }

        return '';
    }

    /** Localize an internal link: "/contact-us" → "/en/contact-us". */
    public static function href(?string $url, ?string $locale = null): string
    {
        $url = (string) $url;
        if ($url === '' || ! str_starts_with($url, '/') || str_starts_with($url, '//')) {
            return $url;
        }
        $locale ??= Locales::current();
        if (preg_match('#^/('.implode('|', Locales::ALL).')(/|$)#', $url) || str_starts_with($url, '/media/')) {
            return url($url);
        }

        return url($locale.($url === '/' ? '' : $url));
    }

    /** Collect every media id referenced by image fields (for eager loading). */
    public static function mediaIds(array $sections): array
    {
        $ids = [];
        $types = self::types();
        $walk = function (array $fields, array $data) use (&$walk, &$ids) {
            foreach ($fields as $key => $spec) {
                if ($spec['type'] === 'image' && ! empty($data[$key])) {
                    $ids[] = (int) $data[$key];
                } elseif ($spec['type'] === 'repeater') {
                    foreach ($data[$key] ?? [] as $row) {
                        $walk($spec['fields'], (array) $row);
                    }
                }
            }
        };
        foreach ($sections as $b) {
            if (isset($types[$b['type'] ?? ''])) {
                $walk($types[$b['type']]['fields'], $b['data'] ?? []);
            }
        }

        return array_values(array_unique($ids));
    }

    /** Empty data skeleton for a new block of the given type. */
    public static function blank(string $type): array
    {
        return ['id' => self::newId(), 'type' => $type, 'visible' => true,
            'data' => self::sanitizeFields(self::types()[$type]['fields'], [])];
    }
}
