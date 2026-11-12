<x-admin.layout title="Solutions" subtitle="Products shown in the menu, on the home page and on their own detail pages.">
    <x-slot:actions><a href="{{ route('admin.solutions.create') }}" class="a-btn a-btn-primary">+ New solution</a></x-slot:actions>
    <form method="POST" action="{{ route('admin.solutions.reorder') }}" x-data>
        @csrf
        <x-admin.card :pad="false">
            <table class="a-table">
                <thead><tr><th class="w-24">Order</th><th>Solution</th><th>Address</th><th>Status</th><th></th></tr></thead>
                <tbody>
                    @foreach ($solutions as $s)
                        <tr>
                            <td class="whitespace-nowrap"><input type="hidden" name="ids[]" value="{{ $s->id }}">
                                <button type="button" class="a-btn a-btn-ghost a-btn-sm" @click="const r = $el.closest('tr'); r.previousElementSibling?.before(r)">↑</button>
                                <button type="button" class="a-btn a-btn-ghost a-btn-sm" @click="const r = $el.closest('tr'); r.nextElementSibling?.after(r)">↓</button></td>
                            <td><a href="{{ route('admin.solutions.edit', $s) }}" class="flex items-center gap-3 font-semibold hover:text-brand-600"><span class="grid size-8 place-items-center rounded-lg bg-brand-50 text-brand-600">{!! icon($s->icon, 'icon size-4') !!}</span>{{ $s->t('title') }}</a></td>
                            <td class="font-mono text-xs text-muted">/fr/solutions/{{ $s->slug }}</td>
                            <td><x-admin.status :status="$s->status" /></td>
                            <td class="text-right whitespace-nowrap"><a href="{{ $s->publicUrl('fr') }}" target="_blank" class="a-btn a-btn-ghost a-btn-sm">View</a> <a href="{{ route('admin.solutions.edit', $s) }}" class="a-btn a-btn-outline a-btn-sm">Edit</a></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </x-admin.card>
        <button class="a-btn a-btn-dark mt-4">Save order</button>
    </form>
</x-admin.layout>
