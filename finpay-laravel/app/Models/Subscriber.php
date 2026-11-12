<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $fillable = ['email', 'locale', 'status', 'token', 'ip', 'unsubscribed_at'];

    protected $casts = ['unsubscribed_at' => 'datetime'];
}
