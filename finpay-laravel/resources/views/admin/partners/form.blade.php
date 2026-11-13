@php $exists = $partner->exists; @endphp
<x-admin.layout :title="$exists ? 'Edit partner' : 'New partner'" :back="route('admin.partners.index')" lang-switch>
    <form method="POST" action="{{ $exists ? route('admin.partners.update', $partner) : route('admin.partners.store') }}" class="grid gap-6 xl:grid-cols-[1fr_320px]">
        @csrf @if ($exists) @method('PUT') @endif
        <x-admin.card>
            <div class="grid gap-5 md:grid-cols-2">
                <x-admin.input name="name" label="Name" :value="$partner->name" required />
                <x-admin.select name="category" label="Category" :options="collect(\App\Models\Partner::CATEGORIES)->mapWithKeys(fn ($c) => [$c => __('site.partners.categories.'.$c, [], 'en')])->all()" :value="$partner->category" />
                <x-admin.input name="partnership_type" label="Type of partnership" :value="$partner->partnership_type" t />
                <x-admin.input name="region" label="Region" :value="$partner->region" t />
                <x-admin.input class="md:col-span-2" name="description" label="Description" :value="$partner->description" t type="textarea" rows="4" />
                <x-admin.input name="since" label="Partner since (year)" :value="$partner->since" />
                <x-admin.input name="website" label="Website" type="url" :value="$partner->website" placeholder="https://" />
            </div>
        </x-admin.card>
        <aside class="space-y-6">
            <x-admin.card title="Display">
                <div class="space-y-4">
                    <x-admin.select name="status" label="Status" :options="['published' => 'Published', 'draft' => 'Hidden']" :value="$partner->status" />
                    <x-admin.media name="logo_id" label="Logo" :media="$partner->logo" />
                    <x-admin.toggle name="show_in_logo_bar" label="Show in the home page logo bar" :checked="$partner->show_in_logo_bar" help="Only with written permission from the partner." />
                    <x-admin.input name="sort" label="Order" type="number" :value="$partner->sort" />
                    <button class="a-btn a-btn-primary w-full">Save partner</button>
                </div>
            </x-admin.card>
            @if ($exists)<x-admin.card title="More"><button form="del-form" class="a-btn a-btn-danger a-btn-sm">Move to trash</button></x-admin.card>@endif
        </aside>
    </form>
    @if ($exists)<form id="del-form" method="POST" action="{{ route('admin.partners.destroy', $partner) }}" data-confirm="Move this partner to the trash?">@csrf @method('DELETE')</form>@endif
</x-admin.layout>
