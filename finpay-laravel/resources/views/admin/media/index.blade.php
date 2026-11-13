<x-admin.layout title="Media library" subtitle="Images are resized automatically. Max 10 MB per file (JPG, PNG, WebP, GIF, PDF)." lang-switch>
    <x-slot:actions>
        <form method="POST" action="{{ route('admin.media.store') }}" enctype="multipart/form-data" x-data>
            @csrf
            <input type="file" name="files[]" multiple accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" class="hidden" x-ref="f" @change="$el.form.submit()">
            <button type="button" class="a-btn a-btn-primary" @click="$refs.f.click()">Upload files</button>
        </form>
    </x-slot:actions>
    <form class="mb-5 flex flex-wrap gap-2">
        <input name="q" value="{{ request('q') }}" placeholder="Search by file name…" class="a-input max-w-xs">
        <select name="type" class="a-input w-40"><option value="">All files</option><option value="images" @selected(request('type') === 'images')>Images</option><option value="documents" @selected(request('type') === 'documents')>Documents</option></select>
        <button class="a-btn a-btn-outline">Filter</button>
    </form>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        @forelse ($media as $m)
            <div class="a-card overflow-hidden" x-data="{ open: false }">
                <button type="button" class="block w-full" @click="open = !open">
                    @if ($m->isImage())
                        <img src="{{ $m->url('sm') }}" alt="" class="aspect-[4/3] w-full bg-[repeating-conic-gradient(#f1f3f5_0_25%,#fff_0_50%)] bg-[length:16px_16px] object-contain" loading="lazy">
                    @else
                        <span class="grid aspect-[4/3] place-items-center bg-surface text-sm font-bold text-muted">PDF</span>
                    @endif
                </button>
                <div class="p-3">
                    <p class="truncate text-xs font-medium" title="{{ $m->filename }}">{{ $m->filename }}</p>
                    <p class="text-[11px] text-muted">{{ $m->humanSize() }} @if ($m->width) · {{ $m->width }}×{{ $m->height }} @endif</p>
                    <div x-show="open" x-cloak class="mt-3 space-y-2 border-t border-line pt-3">
                        <form method="POST" action="{{ route('admin.media.update', $m) }}" class="space-y-2">@csrf @method('PUT')
                            <label class="a-label">Description (alt text)</label>
                            <input name="alt[fr]" value="{{ $m->alt['fr'] ?? '' }}" class="a-input t-fr text-xs" placeholder="Description en français">
                            <input name="alt[en]" value="{{ $m->alt['en'] ?? '' }}" class="a-input t-en text-xs" placeholder="Description in English">
                            <button class="a-btn a-btn-dark a-btn-sm">Save</button>
                        </form>
                        <div class="flex gap-1">
                            <button type="button" class="a-btn a-btn-outline a-btn-sm" data-copy="{{ $m->url() }}">Copy URL</button>
                            <form method="POST" action="{{ route('admin.media.destroy', $m) }}" data-confirm="Move this file to the trash?">@csrf @method('DELETE')<button class="a-btn a-btn-danger a-btn-sm">Delete</button></form>
                        </div>
                    </div>
                </div>
            </div>
        @empty
            <p class="col-span-full text-muted">No files yet.</p>
        @endforelse
    </div>
    <div class="mt-6">{{ $media->links() }}</div>
</x-admin.layout>
