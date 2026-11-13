<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\Blocks;
use App\Support\Icons;
use App\Support\Locales;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

abstract class AdminController extends Controller
{
    /** Validation rules for a translatable field: French required (when $required), English optional. */
    protected function tRules(string $field, bool $required = false, int $max = 255): array
    {
        return [
            $field => ['nullable', 'array'],
            $field.'.fr' => [$required ? 'required' : 'nullable', 'string', 'max:'.$max],
            $field.'.en' => ['nullable', 'string', 'max:'.$max],
        ];
    }

    /** Normalized {"fr": "...", "en": "..."} value from the request. */
    protected function tValue(Request $request, string $field, bool $html = false): array
    {
        $out = [];
        foreach (Locales::ALL as $l) {
            $v = trim((string) $request->input($field.'.'.$l, ''));
            $out[$l] = $html ? \App\Support\HtmlSanitizer::clean($v) : strip_tags($v);
        }

        return $out;
    }

    protected function uniqueSlug(string $modelClass, string $slug, ?int $ignoreId = null): string
    {
        $base = Str::slug($slug) ?: 'item';
        $candidate = $base;
        $i = 2;
        while ($modelClass::withTrashed()->where('slug', $candidate)->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))->exists()) {
            $candidate = $base.'-'.$i++;
        }

        return $candidate;
    }

    /** Data needed by the JS block editor. */
    protected function editorPayload(array $sections): array
    {
        $ids = Blocks::mediaIds($sections);
        $media = \App\Models\Media::whereIn('id', $ids)->get()->mapWithKeys(fn ($m) => [$m->id => [
            'id' => $m->id, 'url' => $m->url(), 'thumb' => $m->url('sm'), 'name' => $m->filename,
        ]]);

        return [
            'schema' => Blocks::types(),
            'sections' => $sections,
            'media' => $media,
            'icons' => Icons::names(),
        ];
    }
}
