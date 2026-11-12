<?php

namespace App\Models\Concerns;

use App\Models\AuditLog;

/** Writes create/update/delete/restore events to the activity log. */
trait Audited
{
    public static function bootAudited(): void
    {
        $events = ['created', 'updated', 'deleted'];
        if (method_exists(static::class, 'restored')) {
            $events[] = 'restored';
        }
        foreach ($events as $event) {
            static::$event(function ($model) use ($event) {
                if ($event === 'updated' && ! $model->wasChanged()) {
                    return;
                }
                if (app()->runningInConsole() && ! app()->runningUnitTests()) {
                    return; // seeders and imports stay out of the activity log
                }
                AuditLog::record($event, $model, class_basename($model).' “'.$model->auditLabel().'” '.$event);
            });
        }
    }

    public function auditLabel(): string
    {
        foreach (['name', 'title', 'email', 'slug', 'from_path', 'key'] as $f) {
            $v = $this->getAttribute($f);
            if ($v !== null) {
                return mb_strimwidth(is_array($v) ? \App\Support\Locales::pick($v) : (string) $v, 0, 80, '…');
            }
        }

        return '#'.$this->getKey();
    }
}
