@php
    $dark = \App\Support\Tone::dark($d['tone'] ?? null);
    $items = $d['items'] ?? [];
    $hasHeading = has_text($d['title'] ?? null) || has_text($d['eyebrow'] ?? null);
    $n = count($items);
@endphp
@if ($items)
    <section class="{{ $hasHeading ? 'section' : 'section-sm' }} {{ \App\Support\Tone::section($d['tone'] ?? null) }}">
        @if ($dark)<div class="bg-grid-dark pointer-events-none absolute inset-0"></div>@endif
        <div class="container-site relative">
            @include('blocks._heading', ['d' => $d])
            <dl @class(['grid gap-px overflow-hidden rounded-[var(--radius-card)]',
                        'mt-12' => $hasHeading,
                        'border border-white/10 bg-white/10' => $dark,
                        'border border-line bg-line shadow-[var(--shadow-card)]' => ! $dark,
                        'sm:grid-cols-2 lg:grid-cols-4' => $n >= 4,
                        'sm:grid-cols-3' => $n === 3,
                        'sm:grid-cols-2' => $n === 2])>
                @foreach ($items as $item)
                    <div class="flex flex-col p-7 md:p-8 {{ $dark ? 'bg-navy-950/80' : 'bg-white' }}" data-reveal>
                        <dt class="order-2 mt-2 text-[15px] font-semibold {{ $dark ? 'text-white' : 'text-ink' }}">{{ tr($item['label']) }}</dt>
                        <dd class="order-1 font-display text-4xl font-bold tracking-tight md:text-[2.75rem] {{ $dark ? 'text-white' : 'text-brand-600' }}" data-count data-value="{{ tr($item['value']) }}">{{ tr($item['value']) }}</dd>
                        @if (has_text($item['note'] ?? null))
                            <dd class="order-3 mt-1.5 text-sm leading-snug {{ $dark ? 'text-slate-400' : 'text-muted' }}">{{ tr($item['note']) }}</dd>
                        @endif
                    </div>
                @endforeach
            </dl>
            @if (has_text($d['source'] ?? null))
                <p class="mt-4 text-xs {{ $dark ? 'text-slate-500' : 'text-muted' }}">{{ tr($d['source']) }}</p>
            @endif
        </div>
    </section>
@endif
