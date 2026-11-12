@php $exists = $member->exists; @endphp
<x-admin.layout :title="$exists ? 'Edit contact' : 'New contact'" :back="route('admin.team.index')" lang-switch>
    <form method="POST" action="{{ $exists ? route('admin.team.update', $member) : route('admin.team.store') }}" class="grid gap-6 xl:grid-cols-[1fr_320px]">
        @csrf @if ($exists) @method('PUT') @endif
        <x-admin.card>
            <div class="grid gap-5 md:grid-cols-2">
                <x-admin.input name="name" label="Full name" :value="$member->name" required />
                <x-admin.input name="role" label="Role" :value="$member->role" t required />
                <x-admin.input name="email" label="Email" type="email" :value="$member->email" />
                <x-admin.input name="phone" label="Phone" :value="$member->phone" placeholder="+250 …" />
                <x-admin.input name="location" label="Location" :value="$member->location" t />
                <x-admin.input name="availability" label="Availability" :value="$member->availability" t placeholder="Mon–Fri, 8:00–17:00 EAT" />
            </div>
        </x-admin.card>
        <aside class="space-y-6">
            <x-admin.card title="Display">
                <div class="space-y-4">
                    <x-admin.select name="status" label="Status" :options="['published' => 'Published', 'draft' => 'Hidden']" :value="$member->status" />
                    <x-admin.toggle name="show_on_contact" label="Show in team contact lists" :checked="$member->show_on_contact" />
                    <x-admin.media name="photo_id" label="Photo (optional)" :media="$member->photo" help="Initials are shown when there is no photo." />
                    <x-admin.input name="sort" label="Order" type="number" :value="$member->sort" />
                    <button class="a-btn a-btn-primary w-full">Save contact</button>
                </div>
            </x-admin.card>
            @if ($exists)<x-admin.card title="More"><button form="del-form" class="a-btn a-btn-danger a-btn-sm">Move to trash</button></x-admin.card>@endif
        </aside>
    </form>
    @if ($exists)<form id="del-form" method="POST" action="{{ route('admin.team.destroy', $member) }}" data-confirm="Move this contact to the trash?">@csrf @method('DELETE')</form>@endif
</x-admin.layout>
