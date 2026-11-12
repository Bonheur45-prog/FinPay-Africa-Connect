<?php

namespace App\Models\Concerns;

use App\Models\ContentVersion;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/** Stores a snapshot of the model after each save so editors can restore earlier versions. */
trait Versionable
{
    public static int $keepVersions = 25;

    public static function bootVersionable(): void
    {
        static::saved(function ($model) {
            if (! $model->wasChanged() && ! $model->wasRecentlyCreated) {
                return;
            }
            $model->versions()->create([
                'data' => $model->versionPayload(),
                'user_id' => auth()->id(),
                'created_at' => now(),
            ]);
            $ids = $model->versions()->orderByDesc('id')->skip(static::$keepVersions)->take(1000)->pluck('id');
            if ($ids->isNotEmpty()) {
                ContentVersion::whereIn('id', $ids)->delete();
            }
        });
    }

    public function versions(): MorphMany
    {
        return $this->morphMany(ContentVersion::class, 'versionable')->orderByDesc('id');
    }

    public function versionPayload(): array
    {
        return collect($this->getAttributes())
            ->except(['id', 'created_at', 'updated_at', 'deleted_at', 'views'])
            ->map(fn ($v, $k) => $this->hasCast($k, ['array', 'json']) ? $this->getAttribute($k) : $v)
            ->all();
    }

    public function restoreVersion(ContentVersion $version): void
    {
        $this->forceFill(collect($version->data)->only($this->getFillable())->all())->save();
    }
}
