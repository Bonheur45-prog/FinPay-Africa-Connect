@php $exists = $solution->exists; @endphp
<x-admin.layout :title="$exists ? 'Edit: '.$solution->t('title') : 'New solution'" :back="route('admin.solutions.index')" lang-switch>
    <x-slot:actions>
        @if ($exists)<a href="{{ $solution->publicUrl('fr') }}" target="_blank" class="a-btn a-btn-outline">Preview</a>@endif
        <button form="sol-form" class="a-btn a-btn-primary">Save solution</button>
    </x-slot:actions>

    <form id="sol-form" method="POST" action="{{ $exists ? route('admin.solutions.update', $solution) : route('admin.solutions.store') }}" class="grid gap-6 xl:grid-cols-[1fr_340px]">
        @csrf @if ($exists) @method('PUT') @endif
        <input type="hidden" name="sections" id="sections-input" value="">
        <div class="min-w-0 space-y-6">
            <x-admin.card title="Card shown in menus and lists">
                <div class="grid gap-5 md:grid-cols-2" x-data="slugField(@js($solution->slug ?? ''))">
                    <x-admin.input name="title" label="Name" :value="$solution->title" t required attrs='x-on:input="fromTitle($event.target.value)"' />
                    <div>
                        <label class="a-label" for="f_slug">Address <span class="text-brand-600">*</span></label>
                        <div class="flex items-center rounded-lg border border-line bg-surface pl-3 text-xs text-muted">/fr/solutions/&nbsp;<input id="f_slug" name="slug" x-model="slug" @input="touched = true" class="a-input rounded-l-none border-0 font-mono" required></div>
                        @error('slug')<p class="a-error">{{ $message }}</p>@enderror
                    </div>
                    <x-admin.input name="tag" label="Small tag (e.g. Flagship)" :value="$solution->tag" t />
                    <x-admin.select name="icon" label="Icon" :options="array_combine($icons, $icons)" :value="$solution->icon" />
                    <x-admin.input class="md:col-span-2" name="summary" label="Short description" :value="$solution->summary" t type="textarea" rows="2" />
                </div>
            </x-admin.card>
            <div>
                <h2 class="mb-3 text-[15px] font-semibold">Detail page blocks</h2>
                <div data-block-editor data-input="#sections-input" data-schema='@json($schema)' data-sections='@json($sections)' data-media='@json($media)' data-icons='@json($icons)'></div>
            </div>
        </div>
        <aside class="space-y-6">
            <x-admin.card title="Publishing">
                <div class="space-y-4">
                    <x-admin.select name="status" label="Status" :options="['published' => 'Published', 'draft' => 'Draft (hidden)']" :value="$solution->status" />
                    <x-admin.media name="image_id" label="Card image" :media="$solution->image" help="Used on the home page cards and as the share image." />
                    <button class="a-btn a-btn-primary w-full">Save solution</button>
                </div>
            </x-admin.card>
            <x-admin.card title="Search engines">
                <div class="space-y-4">
                    <x-admin.input name="meta_title" label="SEO title" :value="$solution->meta_title" t />
                    <x-admin.input name="meta_description" label="SEO description" :value="$solution->meta_description" t type="textarea" />
                </div>
            </x-admin.card>
            @if ($exists)
                <x-admin.versions :model="$solution" />
                <x-admin.card title="More"><button form="del-form" class="a-btn a-btn-danger a-btn-sm">Move to trash</button></x-admin.card>
            @endif
        </aside>
    </form>
    @if ($exists)
        <form id="del-form" method="POST" action="{{ route('admin.solutions.destroy', $solution) }}" data-confirm="Move this solution to the trash?">@csrf @method('DELETE')</form>
    @endif
</x-admin.layout>
