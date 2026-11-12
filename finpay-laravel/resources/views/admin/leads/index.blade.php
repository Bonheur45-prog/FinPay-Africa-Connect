<x-admin.layout title="Messages" subtitle="Enquiries sent from the website contact form.">
    <x-slot:actions><a href="{{ route('admin.leads.export', request()->query()) }}" class="a-btn a-btn-outline">Export CSV</a></x-slot:actions>
    <div class="mb-4 flex flex-wrap gap-2 text-[13px]">
        <a href="{{ route('admin.leads.index') }}" @class(['a-btn a-btn-sm', 'a-btn-dark' => ! request('status'), 'a-btn-outline' => request('status')])>All</a>
        @foreach (\App\Models\Lead::STATUSES as $st)
            <a href="{{ route('admin.leads.index', ['status' => $st]) }}" @class(['a-btn a-btn-sm', 'a-btn-dark' => request('status') === $st, 'a-btn-outline' => request('status') !== $st])>{{ ucfirst($st) }} ({{ $counts[$st] ?? 0 }})</a>
        @endforeach
        <form class="ml-auto flex gap-2"><input type="hidden" name="status" value="{{ request('status') }}">
            <select name="type" class="a-input w-40"><option value="">All types</option>@foreach (\App\Models\Lead::TYPES as $t)<option value="{{ $t }}" @selected(request('type') === $t)>{{ ucfirst($t) }}</option>@endforeach</select>
            <input name="q" value="{{ request('q') }}" placeholder="Name, email, organisation…" class="a-input w-56"><button class="a-btn a-btn-outline">Search</button></form>
    </div>
    <x-admin.card :pad="false">
        <table class="a-table">
            <thead><tr><th>From</th><th>Type</th><th>Message</th><th>Status</th><th>Received</th></tr></thead>
            <tbody>
                @forelse ($leads as $l)
                    <tr class="{{ $l->status === 'new' ? 'font-semibold' : '' }}">
                        <td><a href="{{ route('admin.leads.show', $l) }}" class="hover:text-brand-600">{{ $l->fullName() }}</a><span class="block text-xs font-normal text-muted">{{ $l->email }}@if ($l->organization) · {{ $l->organization }}@endif</span></td>
                        <td><span class="a-badge a-badge-gray">{{ ucfirst($l->type) }}</span></td>
                        <td class="max-w-md truncate font-normal text-muted">{{ \Illuminate\Support\Str::limit($l->message, 90) }}</td>
                        <td><x-admin.status :status="$l->status" />@unless ($l->email_sent)<span class="a-badge a-badge-amber ml-1" title="The email alert was not sent; the message is safe here.">No email alert</span>@endunless</td>
                        <td class="text-xs font-normal whitespace-nowrap text-muted">{{ $l->created_at->format('d M Y, H:i') }}</td>
                    </tr>
                @empty
                    <tr><td colspan="5" class="py-10 text-center text-muted">No messages found.</td></tr>
                @endforelse
            </tbody>
        </table>
    </x-admin.card>
    <div class="mt-4">{{ $leads->links() }}</div>
</x-admin.layout>
