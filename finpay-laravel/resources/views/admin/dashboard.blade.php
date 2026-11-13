<x-admin.layout title="Dashboard" :subtitle="'Welcome back, '.auth()->user()->name">
    @unless ($mailConfigured)
        <div class="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
            <strong>Email notifications are not configured.</strong> Contact-form messages are still saved in Messages, but no email alert is sent until <code>BREVO_API_KEY</code> is set on the server.
        </div>
    @endunless
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        @foreach ($stats as [$label, $value, $url, $icon])
            <a href="{{ $url }}" class="a-card flex items-center gap-4 p-5 hover:border-brand-200">
                <span class="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">{!! icon($icon, 'icon size-5') !!}</span>
                <span><span class="block text-2xl font-bold">{{ $value }}</span><span class="text-[13px] text-muted">{{ $label }}</span></span>
            </a>
        @endforeach
    </div>

    <div class="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <x-admin.card title="Latest messages" :pad="false">
            <x-slot:actions><a href="{{ route('admin.leads.index') }}" class="text-[13px] font-semibold text-brand-600">View all</a></x-slot:actions>
            @if ($leads->isEmpty())
                <p class="p-5 text-[13px] text-muted">No messages yet. Contact-form submissions will appear here.</p>
            @else
                <table class="a-table"><tbody>
                    @foreach ($leads as $l)
                        <tr>
                            <td><a href="{{ route('admin.leads.show', $l) }}" class="font-semibold hover:text-brand-600">{{ $l->fullName() }}</a><span class="block text-xs text-muted">{{ $l->email }}</span></td>
                            <td><span class="a-badge a-badge-gray">{{ ucfirst($l->type) }}</span></td>
                            <td><x-admin.status :status="$l->status" /></td>
                            <td class="text-right text-xs text-muted">{{ $l->created_at->diffForHumans() }}</td>
                        </tr>
                    @endforeach
                </tbody></table>
            @endif
        </x-admin.card>

        <div class="space-y-6">
            @if ($todo->isNotEmpty())
                <x-admin.card title="Content to review before launch">
                    <p class="mb-3 text-[13px] text-muted">These items still contain <code>TODO</code> placeholder text.</p>
                    <ul class="space-y-2 text-[13px]">
                        @foreach ($todo as [$kind, $name, $url])
                            <li class="flex items-center justify-between gap-3"><a href="{{ $url }}" class="font-medium hover:text-brand-600">{{ $name }}</a><span class="a-badge a-badge-amber">{{ $kind }}</span></li>
                        @endforeach
                    </ul>
                </x-admin.card>
            @endif
            <x-admin.card title="Content">
                <div class="grid grid-cols-2 gap-3">
                    @foreach ($counts as $label => [$n, $url])
                        <a href="{{ $url }}" class="rounded-lg border border-line p-3 hover:bg-surface"><span class="block text-xl font-bold">{{ $n }}</span><span class="text-xs text-muted">{{ $label }}</span></a>
                    @endforeach
                </div>
            </x-admin.card>
            <x-admin.card title="Recent activity">
                <ul class="space-y-2.5 text-[13px]">
                    @forelse ($activity as $a)
                        <li><span class="font-medium">{{ $a->user?->name ?? 'System' }}</span> <span class="text-muted">— {{ $a->summary }}</span><span class="block text-xs text-muted">{{ $a->created_at->diffForHumans() }}</span></li>
                    @empty
                        <li class="text-muted">Nothing yet.</li>
                    @endforelse
                </ul>
            </x-admin.card>
        </div>
    </div>
</x-admin.layout>
