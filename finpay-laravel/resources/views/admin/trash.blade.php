<x-admin.layout title="Trash" subtitle="Deleted items can be restored, or removed permanently.">
    <x-admin.card :pad="false">
        <table class="a-table">
            <thead><tr><th>Item</th><th>Type</th><th>Deleted</th><th></th></tr></thead>
            <tbody>
                @forelse ($items as $it)
                    <tr>
                        <td class="font-medium">{{ $it['name'] }}</td>
                        <td><span class="a-badge a-badge-gray">{{ $it['label'] }}</span></td>
                        <td class="text-xs text-muted">{{ $it['deleted_at']->diffForHumans() }}</td>
                        <td class="text-right whitespace-nowrap">
                            <form method="POST" action="{{ route('admin.trash.restore', [$it['type'], $it['id']]) }}" class="inline">@csrf<button class="a-btn a-btn-outline a-btn-sm">Restore</button></form>
                            <form method="POST" action="{{ route('admin.trash.destroy', [$it['type'], $it['id']]) }}" class="inline" data-confirm="Delete permanently? This cannot be undone.">@csrf @method('DELETE')<button class="a-btn a-btn-ghost a-btn-sm text-brand-600">Delete forever</button></form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="py-10 text-center text-muted">The trash is empty.</td></tr>
                @endforelse
            </tbody>
        </table>
    </x-admin.card>
</x-admin.layout>
