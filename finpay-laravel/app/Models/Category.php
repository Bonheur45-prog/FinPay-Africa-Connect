<?php

namespace App\Models;

use App\Models\Concerns\Audited;
use App\Models\Concerns\HasTranslations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use Audited, HasTranslations;

    protected $fillable = ['slug', 'name', 'sort'];

    protected array $translatable = ['name'];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}
