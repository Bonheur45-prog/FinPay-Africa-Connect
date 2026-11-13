<?php

namespace App\Models\Concerns;

use App\Support\Locales;

/**
 * Translatable JSON columns shaped {"fr": "...", "en": "..."}.
 * Declare `protected array $translatable = ['title', ...];` on the model.
 */
trait HasTranslations
{
    public function initializeHasTranslations(): void
    {
        $this->mergeCasts(array_fill_keys($this->translatable ?? [], 'array'));
    }

    /** Value of a translatable field in the given (or current) locale, falling back to the default locale. */
    public function t(string $field, ?string $locale = null): string
    {
        return Locales::pick($this->getAttribute($field), $locale);
    }
}
