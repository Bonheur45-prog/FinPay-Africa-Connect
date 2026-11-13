<x-admin.layout title="Pages" subtitle="Every page is built from blocks you can edit, reorder and hide.">
    <x-slot:actions><a href="{{ route('admin.pages.create') }}" class="a-btn a-btn-primary">+ New page</a></x-slot:actions>
    @foreach (['Main pages' => $system, 'Other pages (legal, campaigns…)' => $custom] as $title => $list)
        <x-admin.card :title="$title" :pad="false" class="mb-6">
            <table class="a-table">
                <thead><tr><th>Title</th><th>Address</th><th>Status</th><th>Updated</th><th></th></tr></thead>
                <tbody>
                    @forelse ($list as $p)
                        <tr>
                            <td><a href="{{ route('admin.pages.edit', $p) }}" class="font-semibold hover:text-brand-600">{{ $p->t('title') }}</a>
                                @if ($p->isSystem())<span class="a-badge a-badge-blue ml-1">Core</span>@endif</td>
                            <td class="font-mono text-xs text-muted">{{ parse_url($p->publicUrl('fr'), PHP_URL_PATH) }}</td>
                            <td><x-admin.status :status="$p->status" /></td>
                            <td class="text-xs text-muted">{{ $p->updated_at->diffForHumans() }}</td>
                            <td class="text-right whitespace-nowrap">
                                <a href="{{ $p->publicUrl('fr') }}" target="_blank" class="a-btn a-btn-ghost a-btn-sm">View</a>
                                <a href="{{ route('admin.pages.edit', $p) }}" class="a-btn a-btn-outline a-btn-sm">Edit</a>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="5" class="text-muted">No pages yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </x-admin.card>
    @endforeach
</x-admin.layout>
