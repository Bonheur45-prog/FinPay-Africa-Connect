<?php

namespace App\Models;

use App\Models\Concerns\Audited;
use App\Models\Concerns\HasTranslations;
use App\Models\Concerns\Versionable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use Audited, HasTranslations, SoftDeletes, Versionable;

    /** Pages the public routes depend on; they cannot be deleted or re-slugged. */
    public const SYSTEM = ['home', 'about', 'solutions', 'partners', 'investors', 'contact', 'blog'];

    protected $fillable = ['slug', 'system_key', 'title', 'meta_title', 'meta_description', 'og_image_id',
        'sections', 'status', 'show_in_footer', 'updated_by'];

    protected array $translatable = ['title', 'meta_title', 'meta_description'];

    protected $casts = ['sections' => 'array', 'show_in_footer' => 'boolean'];

    public function ogImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'og_image_id');
    }

    public function isSystem(): bool
    {
        return $this->system_key !== null;
    }

    public static function system(string $key): ?self
    {
        return static::where('system_key', $key)->where('status', 'published')->first();
    }

    public function publicUrl(?string $locale = null): string
    {
        $locale ??= \App\Support\Locales::current();
        $path = match ($this->system_key) {
            'home' => '',
            'contact' => 'contact-us',
            null => $this->slug,
            default => $this->system_key,
        };

        return url($locale.($path ? '/'.$path : ''));
    }
}
