<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ContentVersion extends Model
{
    public $timestamps = false;

    protected $fillable = ['data', 'user_id', 'created_at'];

    protected $casts = ['data' => 'array', 'created_at' => 'datetime'];

    public function versionable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
