<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lead extends Model
{
    use SoftDeletes;

    public const TYPES = ['general', 'partnership', 'investor'];
    public const STATUSES = ['new', 'read', 'replied', 'archived'];

    protected $fillable = ['type', 'first_name', 'last_name', 'email', 'phone', 'organization', 'message', 'locale',
        'status', 'notes', 'source_url', 'ip', 'user_agent', 'email_sent'];

    protected $casts = ['email_sent' => 'boolean'];

    public function fullName(): string
    {
        return trim($this->first_name.' '.$this->last_name);
    }
}
