<?php

namespace App\Http\Controllers\Admin;

use App\Models\Media;
use App\Services\MediaService;
use Illuminate\Http\Request;
use RuntimeException;

class MediaController extends AdminController
{
    public function index(Request $request)
    {
        $media = Media::query()
            ->when($request->filled('q'), fn ($q) => $q->where('filename', 'like', '%'.$request->q.'%'))
            ->when($request->input('type') === 'images', fn ($q) => $q->where('mime', 'like', 'image/%'))
            ->when($request->input('type') === 'documents', fn ($q) => $q->where('mime', 'not like', 'image/%'))
            ->latest()->paginate(36)->withQueryString();

        return view('admin.media.index', ['media' => $media]);
    }

    /** JSON list for the media picker. */
    public function picker(Request $request)
    {
        $items = Media::query()
            ->when($request->boolean('images'), fn ($q) => $q->where('mime', 'like', 'image/%'))
            ->when($request->filled('q'), fn ($q) => $q->where('filename', 'like', '%'.$request->q.'%'))
            ->latest()->limit(120)->get();

        return response()->json(['data' => $items->map(fn (Media $m) => $this->json($m))->values()]);
    }

    public function store(Request $request, MediaService $service)
    {
        $request->validate([
            'files' => ['required', 'array', 'max:20'],
            'files.*' => ['file', 'max:10240', 'mimetypes:image/jpeg,image/png,image/webp,image/gif,application/pdf'],
        ], ['files.*.mimetypes' => 'Only JPG, PNG, WebP, GIF images and PDF documents can be uploaded.', 'files.*.max' => 'Files must be 10 MB or smaller.']);

        $created = [];
        try {
            foreach ($request->file('files') as $file) {
                $created[] = $service->storeUpload($file, $request->user()->id);
            }
        } catch (RuntimeException $e) {
            return $request->expectsJson()
                ? response()->json(['message' => $e->getMessage()], 422)
                : back()->with('error', $e->getMessage());
        }

        if ($request->expectsJson()) {
            return response()->json(['data' => collect($created)->map(fn ($m) => $this->json($m))]);
        }

        return back()->with('status', count($created).' file(s) uploaded.');
    }

    public function update(Request $request, Media $media)
    {
        $request->validate($this->tRules('alt', false, 200));
        $media->update(['alt' => $this->tValue($request, 'alt')]);

        return back()->with('status', 'Description saved.');
    }

    public function destroy(Media $media)
    {
        $media->delete();

        return back()->with('status', 'File moved to the trash. Pages still using it will show no image.');
    }

    private function json(Media $m): array
    {
        return [
            'id' => $m->id,
            'url' => $m->url(),
            'thumb' => $m->isImage() ? $m->url('sm') : null,
            'name' => $m->filename,
            'alt' => $m->t('alt'),
            'is_image' => $m->isImage(),
            'size' => $m->humanSize(),
            'dims' => $m->width ? $m->width.'×'.$m->height : null,
        ];
    }
}
