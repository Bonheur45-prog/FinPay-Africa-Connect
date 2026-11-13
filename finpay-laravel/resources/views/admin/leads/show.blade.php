<x-admin.layout :title="$lead->fullName()" :subtitle="ucfirst($lead->type).' enquiry · '.$lead->created_at->format('d M Y, H:i')" :back="route('admin.leads.index')">
    <x-slot:actions><a href="mailto:{{ $lead->email }}?subject={{ rawurlencode('Re: your enquiry to FinPay Africa') }}" class="a-btn a-btn-primary">Reply by email</a></x-slot:actions>
    <div class="grid gap-6 xl:grid-cols-[1fr_340px]">
        <x-admin.card title="Message">
            <p class="text-[15px] leading-relaxed whitespace-pre-line">{{ $lead->message }}</p>
        </x-admin.card>
        <aside class="space-y-6">
            <x-admin.card title="Contact">
                <dl class="space-y-3 text-[13.5px]">
                    <div><dt class="text-xs text-muted">Email</dt><dd><a href="mailto:{{ $lead->email }}" class="text-brand-600">{{ $lead->email }}</a></dd></div>
                    @if ($lead->phone)<div><dt class="text-xs text-muted">Phone</dt><dd><a href="tel:{{ preg_replace('/[^\d+]/', '', $lead->phone) }}">{{ $lead->phone }}</a></dd></div>@endif
                    @if ($lead->organization)<div><dt class="text-xs text-muted">Organisation</dt><dd>{{ $lead->organization }}</dd></div>@endif
                    <div><dt class="text-xs text-muted">Website language</dt><dd>{{ strtoupper($lead->locale) }}</dd></div>
                    <div><dt class="text-xs text-muted">Email alert</dt><dd>{{ $lead->email_sent ? 'Sent' : 'Not sent' }}</dd></div>
                    @if ($lead->source_url)<div><dt class="text-xs text-muted">Sent from</dt><dd class="truncate text-xs">{{ $lead->source_url }}</dd></div>@endif
                </dl>
            </x-admin.card>
            <x-admin.card title="Follow-up">
                <form method="POST" action="{{ route('admin.leads.update', $lead) }}" class="space-y-4">@csrf @method('PUT')
                    <x-admin.select name="status" label="Status" :options="collect(\App\Models\Lead::STATUSES)->mapWithKeys(fn ($s) => [$s => ucfirst($s)])->all()" :value="$lead->status" />
                    <x-admin.input name="notes" label="Internal notes" type="textarea" rows="4" :value="$lead->notes" />
                    <button class="a-btn a-btn-dark w-full">Save</button>
                </form>
                <form method="POST" action="{{ route('admin.leads.destroy', $lead) }}" class="mt-3" data-confirm="Move this message to the trash?">@csrf @method('DELETE')<button class="a-btn a-btn-danger a-btn-sm">Move to trash</button></form>
            </x-admin.card>
        </aside>
    </div>
</x-admin.layout>
