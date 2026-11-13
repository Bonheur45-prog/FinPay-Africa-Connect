@php
    $countries = collect($d['countries'] ?? []);
    $groups = $countries->groupBy(fn ($c) => $c['status'] ?: 'active');
    $dot = ['active' => 'bg-success-600', 'expanding' => 'bg-amber-500', 'planned' => 'bg-slate-400'];
@endphp
<section class="section bg-surface">
    <div class="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
            @include('blocks._heading', ['d' => $d])
            @if (! empty($d['points']))
                <ul class="mt-9 space-y-4">
                    @foreach ($d['points'] as $p)
                        <li class="flex items-start gap-3 text-[15px] font-medium" data-reveal>
                            <span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">{!! icon('check', 'icon size-3.5', 2.5) !!}</span>{{ tr($p['text']) }}
                        </li>
                    @endforeach
                </ul>
            @endif
        </div>
        @if ($countries->isNotEmpty())
            <div class="card p-7 md:p-9" data-reveal>
                <div class="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
                    <p class="font-semibold">{{ __('site.presence.legend') }}</p>
                    <div class="flex flex-wrap gap-4 text-[13px] text-muted">
                        @foreach (['active', 'expanding', 'planned'] as $st)
                            @if ($groups->has($st))
                                <span class="inline-flex items-center gap-2"><span class="size-2.5 rounded-full {{ $dot[$st] }}"></span>{{ __('site.presence.'.$st) }} ({{ $groups[$st]->count() }})</span>
                            @endif
                        @endforeach
                    </div>
                </div>
                @foreach (['active', 'expanding', 'planned'] as $st)
                    @if ($groups->has($st))
                        <div class="mt-6">
                            <p class="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{{ __('site.presence.'.$st) }}</p>
                            <ul class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                                @foreach ($groups[$st] as $c)
                                    <li class="flex min-w-0 items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-2.5 text-[13.5px] leading-tight font-medium sm:gap-2.5 sm:px-3 sm:text-[14px]">
                                        <span class="grid h-6 w-8 shrink-0 place-items-center rounded-md bg-surface font-mono text-[11px] font-semibold text-ink/70">{{ $c['code'] }}</span>
                                        <span class="min-w-0 break-words">{{ tr($c['name']) }}</span>
                                        <span class="ml-auto hidden size-2 shrink-0 rounded-full sm:block {{ $dot[$st] }}"></span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                @endforeach
            </div>
        @endif
    </div>
</section>
