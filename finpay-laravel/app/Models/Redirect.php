<?php

namespace App\Models;

use App\Models\Concerns\Audited;
use Illuminate\Database\Eloquent\Model;

class Redirect extends Model
{
    use Audited;

    protected $fillable = ['from_path', 'to_path', 'code', 'hits', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];

    public static function normalize(string $path): string
    {
        $path = parse_url(trim($path), PHP_URL_PATH) ?: '/';

        return '/'.trim($path, '/');
    }
}
