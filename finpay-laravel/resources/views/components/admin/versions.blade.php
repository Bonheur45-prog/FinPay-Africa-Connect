@props(['model'])
@php $versions = $model->versions()->with('user')->limit(10)->get(); @endphp
<x-admin.card title="Version history">
    @if ($versions->isEmpty())
        <p class="text-[13px] text-muted">No earlier versions yet.</p>
    @else
        <ul class="space-y-2.5">
            @foreach ($versions as $v)
                <li class="flex items-center justify-between gap-3 text-[13px]">
                    <span><span class="font-medium">{{ $v->created_at->diffForHumans() }}</span><span class="block text-xs text-muted">{{ $v->user?->name ?? 'System' }}</span></span>
                    @if (! $loop->first)
                        <form method="POST" action="{{ route('admin.versions.restore', $v) }}" data-confirm="Restore this version? The current content will be saved as a new version first.">@csrf
                            <button class="a-btn a-btn-outline a-btn-sm">Restore</button>
                        </form>
                    @else
                        <span class="a-badge a-badge-green">Current</span>
                    @endif
                </li>
            @endforeach
        </ul>
    @endif
</x-admin.card>
