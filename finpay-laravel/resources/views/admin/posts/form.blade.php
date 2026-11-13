@php $exists = $post->exists; @endphp
<x-admin.layout :title="$exists ? 'Edit article' : 'New article'" :subtitle="$exists ? $post->t('title') : null" :back="route('admin.posts.index')" lang-switch>
    <x-slot:actions>
        @if ($exists)<a href="{{ $post->publicUrl('fr') }}" target="_blank" class="a-btn a-btn-outline">Preview</a>@endif
        <button form="post-form" class="a-btn a-btn-primary">Save article</button>
    </x-slot:actions>
    <form id="post-form" method="POST" action="{{ $exists ? route('admin.posts.update', $post) : route('admin.posts.store') }}" class="grid gap-6 xl:grid-cols-[1fr_340px]">
        @csrf @if ($exists) @method('PUT') @endif
        <div class="min-w-0 space-y-6">
            <x-admin.card>
                <div class="space-y-5" x-data="slugField(@js($post->slug ?? ''))">
                    <x-admin.input name="title" label="Title" :value="$post->title" t required attrs='x-on:input="fromTitle($event.target.value)"' />
                    <div>
                        <label class="a-label" for="f_slug">Address <span class="text-brand-600">*</span></label>
                        <div class="flex items-center rounded-lg border border-line bg-surface pl-3 text-xs text-muted">/fr/blog/&nbsp;<input id="f_slug" name="slug" x-model="slug" @input="touched = true" class="a-input rounded-l-none border-0 font-mono" required></div>
                        @error('slug')<p class="a-error">{{ $message }}</p>@enderror
                    </div>
                    <x-admin.input name="excerpt" label="Summary" :value="$post->excerpt" t type="textarea" rows="2" help="Shown on article cards and in search results." />
                    <x-admin.rich name="body" label="Article" :value="$post->body ?? []" tall />
                </div>
            </x-admin.card>
        </div>
        <aside class="space-y-6">
            <x-admin.card title="Publishing">
                <div class="space-y-4">
                    <x-admin.select name="status" label="Status" :options="['draft' => 'Draft', 'published' => 'Published']" :value="$post->status" />
                    <x-admin.input name="published_at" label="Publication date" type="datetime-local" :value="$post->published_at?->format('Y-m-d\TH:i')" help="A future date schedules the article." />
                    <x-admin.select name="category_id" label="Category" :options="$categories->mapWithKeys(fn ($c) => [$c->id => $c->t('name', 'fr')])->all()" :value="$post->category_id" placeholder="— none —" />
                    <x-admin.input name="author_name" label="Author shown" :value="$post->author_name" />
                    <x-admin.toggle name="featured" label="Feature this article" :checked="$post->featured" help="Featured articles are shown first." />
                    <x-admin.media name="cover_id" label="Cover image" :media="$post->cover" />
                    <button class="a-btn a-btn-primary w-full">Save article</button>
                </div>
            </x-admin.card>
            <x-admin.card title="Search engines">
                <div class="space-y-4">
                    <x-admin.input name="meta_title" label="SEO title" :value="$post->meta_title" t />
                    <x-admin.input name="meta_description" label="SEO description" :value="$post->meta_description" t type="textarea" />
                </div>
            </x-admin.card>
            @if ($exists)
                <x-admin.versions :model="$post" />
                <x-admin.card title="More"><button form="del-form" class="a-btn a-btn-danger a-btn-sm">Move to trash</button></x-admin.card>
            @endif
        </aside>
    </form>
    @if ($exists)<form id="del-form" method="POST" action="{{ route('admin.posts.destroy', $post) }}" data-confirm="Move this article to the trash?">@csrf @method('DELETE')</form>@endif
</x-admin.layout>
