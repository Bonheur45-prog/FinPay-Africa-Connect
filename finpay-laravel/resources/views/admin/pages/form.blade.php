@php $exists = $page->exists; @endphp
<x-admin.layout :title="$exists ? 'Edit: '.$page->t('title') : 'New page'" :back="route('admin.pages.index')" lang-switch>
    <x-slot:actions>
        @if ($exists)<a href="{{ $page->publicUrl('fr') }}" target="_blank" class="a-btn a-btn-outline">Preview</a>@endif
        <button form="page-form" class="a-btn a-btn-primary">Save page</button>
    </x-slot:actions>

    <form id="page-form" method="POST" action="{{ $exists ? route('admin.pages.update', $page) : route('admin.pages.store') }}" class="grid gap-6 xl:grid-cols-[1fr_340px]">
        @csrf @if ($exists) @method('PUT') @endif
        <input type="hidden" name="sections" id="sections-input" value="">
        <div class="min-w-0 space-y-6">
            <x-admin.card title="Page">
                <div class="grid gap-5 md:grid-cols-2" x-data="slugField(@js($page->slug ?? ''), @js($page->isSystem()))">
                    <x-admin.input name="title" label="Page title" :value="$page->title" t required attrs='x-on:input="fromTitle($event.target.value)"' />
                    @if ($page->isSystem())
                        <div><p class="a-label">Address</p><p class="a-input bg-surface font-mono text-xs text-muted">{{ parse_url($page->publicUrl('fr'), PHP_URL_PATH) }}</p><p class="a-help">Core page — its address is fixed.</p></div>
                    @else
                        <div>
                            <label class="a-label" for="f_slug">Address <span class="text-brand-600">*</span></label>
                            <div class="flex items-center rounded-lg border border-line bg-surface pl-3 text-xs text-muted focus-within:border-brand-500">
                                /fr/&nbsp;<input id="f_slug" name="slug" x-model="slug" @input="touched = true" class="a-input rounded-l-none border-0 font-mono" required>
                            </div>
                            @error('slug')<p class="a-error">{{ $message }}</p>@enderror
                        </div>
                    @endif
                </div>
            </x-admin.card>

            <div>
                <div class="mb-3 flex items-end justify-between">
                    <div><h2 class="text-[15px] font-semibold">Content blocks</h2><p class="text-xs text-muted">Click a block to open it. Use the language switch at the top to edit French or English.</p></div>
                </div>
                <div data-block-editor data-input="#sections-input"
                     data-schema='@json($schema)' data-sections='@json($sections)' data-media='@json($media)' data-icons='@json($icons)'></div>
            </div>
        </div>

        <aside class="space-y-6">
            <x-admin.card title="Publishing">
                <div class="space-y-4">
                    <x-admin.select name="status" label="Status" :options="['published' => 'Published', 'draft' => 'Draft (hidden)']" :value="$page->status" />
                    @unless ($page->isSystem())
                        <x-admin.toggle name="show_in_footer" label="Link in the footer" :checked="$page->show_in_footer" help="Shown under “Legal” in the footer." />
                    @endunless
                    <button class="a-btn a-btn-primary w-full">Save page</button>
                </div>
            </x-admin.card>
            <x-admin.card title="Search engines & sharing">
                <div class="space-y-4">
                    <x-admin.input name="meta_title" label="SEO title" :value="$page->meta_title" t help="Shown in Google results. Leave empty to use the page title." />
                    <x-admin.input name="meta_description" label="SEO description" :value="$page->meta_description" t type="textarea" help="About 150 characters." />
                    <x-admin.media name="og_image_id" label="Share image" :media="$page->ogImage" help="Shown when the page is shared on LinkedIn, WhatsApp… (1200×630 recommended)." />
                </div>
            </x-admin.card>
            @if ($exists)
                <x-admin.versions :model="$page" />
                <x-admin.card title="More">
                    <div class="flex flex-wrap gap-2">
                        <button form="dup-form" class="a-btn a-btn-outline a-btn-sm">Duplicate</button>
                        @unless ($page->isSystem())<button form="del-form" class="a-btn a-btn-danger a-btn-sm">Move to trash</button>@endunless
                    </div>
                </x-admin.card>
            @endif
        </aside>
    </form>
    @if ($exists)
        <form id="dup-form" method="POST" action="{{ route('admin.pages.duplicate', $page) }}">@csrf</form>
        <form id="del-form" method="POST" action="{{ route('admin.pages.destroy', $page) }}" data-confirm="Move this page to the trash?">@csrf @method('DELETE')</form>
    @endif
</x-admin.layout>
