<x-admin.layout title="Redirects" subtitle="Send old or short addresses to the right page (for example after renaming a page).">
    <x-admin.card title="Add a redirect" class="mb-6">
        <form method="POST" action="{{ route('admin.redirects.store') }}" class="grid gap-3 md:grid-cols-[1fr_1fr_140px_auto] md:items-end">@csrf
            <x-admin.input name="from_path" label="From" placeholder="/fr/old-page" />
            <x-admin.input name="to_path" label="To" placeholder="/fr/new-page or https://…" />
            <x-admin.select name="code" label="Type" :options="['301' => 'Permanent (301)', '302' => 'Temporary (302)']" value="301" />
            <button class="a-btn a-btn-primary">Add</button>
        </form>
    </x-admin.card>
    <x-admin.card :pad="false">
        <table class="a-table">
            <thead><tr><th>From</th><th>To</th><th>Type</th><th>Hits</th><th>Active</th><th></th></tr></thead>
            <tbody>
                @forelse ($redirects as $r)
                    <tr>
                        <td class="font-mono text-xs">{{ $r->from_path }}</td><td class="font-mono text-xs">{{ $r->to_path }}</td><td>{{ $r->code }}</td><td>{{ $r->hits }}</td>
                        <td><form method="POST" action="{{ route('admin.redirects.update', $r) }}">@csrf @method('PUT')<input type="hidden" name="is_active" value="{{ $r->is_active ? 0 : 1 }}">
                            <button class="a-badge {{ $r->is_active ? 'a-badge-green' : 'a-badge-gray' }}">{{ $r->is_active ? 'On' : 'Off' }}</button></form></td>
                        <td class="text-right"><form method="POST" action="{{ route('admin.redirects.destroy', $r) }}" data-confirm="Delete this redirect?">@csrf @method('DELETE')<button class="a-btn a-btn-ghost a-btn-sm text-brand-600">Delete</button></form></td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="text-muted">No redirects.</td></tr>
                @endforelse
            </tbody>
        </table>
    </x-admin.card>
</x-admin.layout>
