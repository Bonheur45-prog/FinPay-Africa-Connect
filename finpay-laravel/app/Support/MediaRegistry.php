<?php

namespace App\Support;

use App\Models\Media;

/** Request-scoped media cache so templates can resolve image ids without N+1 queries. */
class MediaRegistry
{
    private array $items = [];

    public function preload(array $ids): void
    {
        $ids = array_values(array_diff(array_filter(array_map('intval', $ids)), array_keys($this->items)));
        if ($ids) {
            foreach (Media::whereIn('id', $ids)->get() as $m) {
                $this->items[$m->id] = $m;
            }
            foreach ($ids as $id) {
                $this->items[$id] ??= null;
            }
        }
    }

    public function get(mixed $id): ?Media
    {
        if ($id instanceof Media) {
            return $id;
        }
        if (! is_numeric($id) || (int) $id <= 0) {
            return null;
        }
        $id = (int) $id;
        if (! array_key_exists($id, $this->items)) {
            $this->preload([$id]);
        }

        return $this->items[$id];
    }
}
