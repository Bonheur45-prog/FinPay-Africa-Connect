<x-admin.layout title="Insights (blog)" subtitle="Articles in French and English.">
    <x-slot:actions><a href="{{ route('admin.posts.create') }}" class="a-btn a-btn-primary">+ New article</a></x-slot:actions>
    <div class="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div>
            <form class="mb-4 flex flex-wrap gap-2">
                <input name="q" value="{{ request('q') }}" placeholder="Search articles…" class="a-input max-w-xs">
                <select name="status" class="a-input w-40"><option value="">All statuses</option><option value="published" @selected(request('status') === 'published')>Published</option><option value="draft" @selected(request('status') === 'draft')>Draft</option></select>
                <button class="a-btn a-btn-outline">Filter</button>
            </form>
            <x-admin.card :pad="false">
                <table class="a-table">
                    <thead><tr><th>Article</th><th>Category</th><th>Status</th><th>Date</th><th></th></tr></thead>
                    <tbody>
                        @forelse ($posts as $p)
                            <tr>
                                <td><a href="{{ route('admin.posts.edit', $p) }}" class="flex items-center gap-3 font-semibold hover:text-brand-600">
                                    @if ($p->cover)<img src="{{ $p->cover->url('sm') }}" alt="" class="h-9 w-14 rounded object-cover">@endif
                                    <span>{{ $p->t('title') }} @if ($p->featured)<span class="a-badge a-badge-amber ml-1">Featured</span>@endif</span></a></td>
                                <td class="text-muted">{{ $p->category?->t('name') ?? '—' }}</td>
                                <td>@if ($p->status === 'published' && $p->published_at?->isFuture())<x-admin.status status="scheduled" />@else<x-admin.status :status="$p->status" />@endif</td>
                                <td class="text-xs text-muted">{{ $p->published_at?->format('d M Y') }}</td>
                                <td class="text-right"><a href="{{ route('admin.posts.edit', $p) }}" class="a-btn a-btn-outline a-btn-sm">Edit</a></td>
                            </tr>
                        @empty
                            <tr><td colspan="5" class="py-8 text-center text-muted">No articles found.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </x-admin.card>
            <div class="mt-4">{{ $posts->links() }}</div>
        </div>
        <x-admin.card title="Categories">
            <ul class="mb-5 space-y-2">
                @foreach ($categories as $c)
                    <li x-data="{ edit: false }" class="rounded-lg border border-line p-2.5">
                        <div class="flex items-center justify-between gap-2 text-[13px]" x-show="!edit">
                            <span><span class="font-semibold">{{ $c->t('name', 'fr') }}</span> <span class="text-muted">/ {{ $c->t('name', 'en') }}</span> <span class="text-xs text-muted">({{ $c->posts_count }})</span></span>
                            <span class="flex gap-1"><button type="button" class="a-btn a-btn-ghost a-btn-sm" @click="edit = true">Edit</button>
                                <form method="POST" action="{{ route('admin.categories.destroy', $c) }}" data-confirm="Delete this category? Its articles become uncategorised.">@csrf @method('DELETE')<button class="a-btn a-btn-ghost a-btn-sm text-brand-600">✕</button></form></span>
                        </div>
                        <form x-show="edit" x-cloak method="POST" action="{{ route('admin.categories.update', $c) }}" class="space-y-2">@csrf @method('PUT')
                            <input name="name[fr]" value="{{ $c->name['fr'] ?? '' }}" class="a-input" placeholder="Nom (FR)">
                            <input name="name[en]" value="{{ $c->name['en'] ?? '' }}" class="a-input" placeholder="Name (EN)">
                            <input name="slug" value="{{ $c->slug }}" class="a-input font-mono text-xs">
                            <div class="flex gap-2"><button class="a-btn a-btn-dark a-btn-sm">Save</button><button type="button" class="a-btn a-btn-ghost a-btn-sm" @click="edit = false">Cancel</button></div>
                        </form>
                    </li>
                @endforeach
            </ul>
            <form method="POST" action="{{ route('admin.categories.store') }}" class="space-y-2 border-t border-line pt-4">@csrf
                <p class="a-label">Add a category</p>
                <input name="name[fr]" class="a-input" placeholder="Nom en français" required>
                <input name="name[en]" class="a-input" placeholder="Name in English">
                <button class="a-btn a-btn-outline a-btn-sm">Add</button>
            </form>
        </x-admin.card>
    </div>
</x-admin.layout>
