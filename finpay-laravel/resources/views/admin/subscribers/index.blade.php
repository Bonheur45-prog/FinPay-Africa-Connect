<x-admin.layout title="Subscribers" :subtitle="$active.' active newsletter subscriber(s)'">
    <x-slot:actions><a href="{{ route('admin.subscribers.export') }}" class="a-btn a-btn-outline">Export active (CSV)</a></x-slot:actions>
    <form class="mb-4 flex gap-2"><input name="q" value="{{ request('q') }}" placeholder="Search email…" class="a-input max-w-xs">
        <select name="status" class="a-input w-40"><option value="">All</option><option value="active" @selected(request('status') === 'active')>Active</option><option value="unsubscribed" @selected(request('status') === 'unsubscribed')>Unsubscribed</option></select>
        <button class="a-btn a-btn-outline">Filter</button></form>
    <x-admin.card :pad="false">
        <table class="a-table">
            <thead><tr><th>Email</th><th>Language</th><th>Status</th><th>Since</th><th></th></tr></thead>
            <tbody>
                @forelse ($subscribers as $s)
                    <tr>
                        <td class="font-medium">{{ $s->email }}</td><td>{{ strtoupper($s->locale) }}</td><td><x-admin.status :status="$s->status" /></td>
                        <td class="text-xs text-muted">{{ $s->created_at->format('d M Y') }}</td>
                        <td class="text-right"><form method="POST" action="{{ route('admin.subscribers.destroy', $s) }}" data-confirm="Remove this subscriber permanently?">@csrf @method('DELETE')<button class="a-btn a-btn-ghost a-btn-sm text-brand-600">Remove</button></form></td>
                    </tr>
                @empty
                    <tr><td colspan="5" class="py-8 text-center text-muted">No subscribers yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </x-admin.card>
    <div class="mt-4">{{ $subscribers->links() }}</div>
    <p class="mt-3 text-xs text-muted">The export includes each subscriber's personal unsubscribe link, to paste into your newsletter tool.</p>
</x-admin.layout>
