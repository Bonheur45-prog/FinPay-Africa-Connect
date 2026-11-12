<?php

namespace App\Models;

use App\Models\Concerns\Audited;
use App\Models\Concerns\HasTranslations;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Partner extends Model
{
    use Audited, HasTranslations, SoftDeletes;

    public const CATEGORIES = ['financial', 'technology', 'mobile_money', 'commerce'];

    protected $fillable = ['name', 'logo_id', 'category', 'partnership_type', 'description', 'since', 'region',
        'website', 'show_in_logo_bar', 'sort', 'status'];

    protected array $translatable = ['partnership_type', 'description', 'region'];

    protected $casts = ['show_in_logo_bar' => 'boolean'];

    public function logo(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'logo_id');
    }

    public function scopePublished(Builder $q): Builder
    {
        return $q->where('status', 'published')->orderBy('sort')->orderBy('id');
    }

    public function initials(): string
    {
        return collect(preg_split('/[\s\-]+/', $this->name))->filter()->take(2)
            ->map(fn ($w) => mb_strtoupper(mb_substr($w, 0, 1)))->implode('');
    }
}
