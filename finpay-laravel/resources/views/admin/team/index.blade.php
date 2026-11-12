<x-admin.layout title="Team contacts" subtitle="People shown on the Contact and Investors pages.">
    <x-slot:actions><a href="{{ route('admin.team.create') }}" class="a-btn a-btn-primary">+ New contact</a></x-slot:actions>
    <x-admin.card :pad="false">
        <table class="a-table">
            <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Phone</th><th>Status</th><th></th></tr></thead>
            <tbody>
                @forelse ($members as $m)
                    <tr>
                        <td><a href="{{ route('admin.team.edit', $m) }}" class="font-semibold hover:text-brand-600">{{ $m->name }}</a></td>
                        <td class="text-muted">{{ $m->t('role', 'fr') }}</td>
                        <td class="text-muted">{{ $m->email }}</td>
                        <td class="text-muted">{{ $m->phone }}</td>
                        <td><x-admin.status :status="$m->status" /></td>
                        <td class="text-right"><a href="{{ route('admin.team.edit', $m) }}" class="a-btn a-btn-outline a-btn-sm">Edit</a></td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="text-muted">No contacts yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </x-admin.card>
</x-admin.layout>
