<?php

namespace App\Models;

use App\Models\Concerns\Audited;
use App\Models\Concerns\HasTranslations;
use App\Models\Concerns\Versionable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use Audited, HasTranslations, SoftDeletes, Versionable;

    protected $fillable = ['slug', 'category_id', 'cover_id', 'title', 'excerpt', 'body', 'author_name', 'author_id',
        'reading_minutes', 'status', 'published_at', 'featured', 'meta_title', 'meta_description'];

    protected array $translatable = ['title', 'excerpt', 'body', 'meta_title', 'meta_description'];

    protected $casts = ['published_at' => 'datetime', 'featured' => 'boolean'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function cover(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'cover_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /** Published and not scheduled in the future. */
    public function scopeLive(Builder $q): Builder
    {
        return $q->where('status', 'published')->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    public function isLive(): bool
    {
        return $this->status === 'published' && $this->published_at && $this->published_at->lte(now());
    }

    public function publicUrl(?string $locale = null): string
    {
        return url(($locale ?? \App\Support\Locales::current()).'/blog/'.$this->slug);
    }

    public static function estimateMinutes(array $body): int
    {
        $words = str_word_count(strip_tags(implode(' ', array_map('strval', $body))));

        return max(1, (int) ceil($words / 220));
    }
}
