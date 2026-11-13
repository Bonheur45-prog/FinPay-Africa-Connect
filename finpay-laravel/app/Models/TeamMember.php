<?php

namespace App\Models;

use App\Models\Concerns\Audited;
use App\Models\Concerns\HasTranslations;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class TeamMember extends Model
{
    use Audited, HasTranslations, SoftDeletes;

    protected $fillable = ['name', 'role', 'email', 'phone', 'location', 'availability', 'photo_id',
        'show_on_contact', 'sort', 'status'];

    protected array $translatable = ['role', 'location', 'availability'];

    protected $casts = ['show_on_contact' => 'boolean'];

    public function photo(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'photo_id');
    }

    public function scopePublished(Builder $q): Builder
    {
        return $q->where('status', 'published')->orderBy('sort')->orderBy('id');
    }

    public function initials(): string
    {
        return collect(explode(' ', $this->name))->filter()->take(2)
            ->map(fn ($w) => mb_strtoupper(mb_substr($w, 0, 1)))->implode('');
    }

    public function telHref(): string
    {
        return 'tel:'.preg_replace('/[^\d+]/', '', (string) $this->phone);
    }
}
