<x-admin.layout title="Partners" subtitle="Partner directory and the logo bar on the home page.">
    <x-slot:actions><a href="{{ route('admin.partners.create') }}" class="a-btn a-btn-primary">+ New partner</a></x-slot:actions>
    <x-admin.card :pad="false">
        <table class="a-table">
            <thead><tr><th>Partner</th><th>Category</th><th>Shown in</th><th>Status</th><th>Order</th><th></th></tr></thead>
            <tbody>
                @foreach ($partners as $p)
                    <tr>
                        <td><a href="{{ route('admin.partners.edit', $p) }}" class="flex items-center gap-3 font-semibold hover:text-brand-600">
                            @if ($p->logo)<img src="{{ $p->logo->url() }}" alt="" class="size-9 rounded border border-line object-contain p-0.5">@else<span class="grid size-9 place-items-center rounded bg-brand-600 text-xs font-bold text-white">{{ $p->initials() }}</span>@endif
                            {{ $p->name }}</a></td>
                        <td class="text-muted">{{ __('site.partners.categories.'.$p->category, [], 'en') }}</td>
                        <td class="space-x-1">@if ($p->show_in_logo_bar)<span class="a-badge a-badge-blue">Logo bar</span>@endif @if (has_text($p->description))<span class="a-badge a-badge-gray">Directory</span>@endif</td>
                        <td><x-admin.status :status="$p->status" /></td>
                        <td class="text-muted">{{ $p->sort }}</td>
                        <td class="text-right"><a href="{{ route('admin.partners.edit', $p) }}" class="a-btn a-btn-outline a-btn-sm">Edit</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </x-admin.card>
    <p class="mt-3 text-xs text-muted">Partners appear in the directory on the Partners page when they have a description. Partners with a logo and “Show in logo bar” appear on the home page.</p>
</x-admin.layout>
