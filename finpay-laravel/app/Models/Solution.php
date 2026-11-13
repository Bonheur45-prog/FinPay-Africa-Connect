<?php

namespace App\Models;

use App\Models\Concerns\Audited;
use App\Models\Concerns\HasTranslations;
use App\Models\Concerns\Versionable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Solution extends Model
{
    use Audited, HasTranslations, SoftDeletes, Versionable;

    protected $fillable = ['slug', 'icon', 'tag', 'title', 'summary', 'image_id', 'meta_title', 'meta_description',
        'sections', 'sort', 'status', 'updated_by'];

    protected array $translatable = ['tag', 'title', 'summary', 'meta_title', 'meta_description'];

    protected $casts = ['sections' => 'array'];

    public function image(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'image_id');
    }

    public function scopePublished(Builder $q): Builder
    {
        return $q->where('status', 'published')->orderBy('sort')->orderBy('id');
    }

    public function publicUrl(?string $locale = null): string
    {
        return url(($locale ?? \App\Support\Locales::current()).'/solutions/'.$this->slug);
    }
}
