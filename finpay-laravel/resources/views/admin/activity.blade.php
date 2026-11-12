<x-admin.layout title="Activity log" subtitle="Who changed what, and when.">
    <x-admin.card :pad="false">
        <table class="a-table">
            <thead><tr><th>When</th><th>User</th><th>Action</th><th>Details</th><th>IP</th></tr></thead>
            <tbody>
                @forelse ($logs as $log)
                    <tr>
                        <td class="text-xs whitespace-nowrap text-muted">{{ $log->created_at->format('d M Y, H:i') }}</td>
                        <td class="font-medium">{{ $log->user?->name ?? 'System' }}</td>
                        <td><span class="a-badge a-badge-gray">{{ $log->action }}</span></td>
                        <td>{{ $log->summary }}</td>
                        <td class="font-mono text-xs text-muted">{{ $log->ip }}</td>
                    </tr>
                @empty
                    <tr><td colspan="5" class="text-muted">No activity yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </x-admin.card>
    <div class="mt-4">{{ $logs->links() }}</div>
</x-admin.layout>
