<?php

namespace App\Http\Controllers\Admin;

use App\Models\Lead;
use App\Models\Media;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Post;
use App\Models\Solution;
use App\Models\TeamMember;
use App\Services\MediaService;

class TrashController extends AdminController
{
    public const TYPES = [
        'pages' => [Page::class, 'Page'],
        'solutions' => [Solution::class, 'Solution'],
        'posts' => [Post::class, 'Article'],
        'partners' => [Partner::class, 'Partner'],
        'team' => [TeamMember::class, 'Team member'],
        'media' => [Media::class, 'File'],
        'leads' => [Lead::class, 'Message'],
    ];

    public function index()
    {
        $items = collect();
        foreach (self::TYPES as $key => [$class, $label]) {
            foreach ($class::onlyTrashed()->latest('deleted_at')->limit(200)->get() as $m) {
                $items->push([
                    'type' => $key, 'label' => $label, 'id' => $m->id, 'deleted_at' => $m->deleted_at,
                    'name' => $m instanceof Lead ? $m->fullName().' <'.$m->email.'>' : (method_exists($m, 'auditLabel') ? $m->auditLabel() : '#'.$m->id),
                ]);
            }
        }

        return view('admin.trash', ['items' => $items->sortByDesc('deleted_at')->values()]);
    }

    public function restore(string $type, int $id)
    {
        $this->find($type, $id)->restore();

        return back()->with('status', 'Item restored.');
    }

    public function destroy(string $type, int $id, MediaService $media)
    {
        $model = $this->find($type, $id);
        if ($model instanceof Media) {
            $media->deleteFiles($model);
        }
        $model->forceDelete();

        return back()->with('status', 'Item permanently deleted.');
    }

    private function find(string $type, int $id)
    {
        abort_unless(isset(self::TYPES[$type]), 404);

        return self::TYPES[$type][0]::onlyTrashed()->findOrFail($id);
    }
}
