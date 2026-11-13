@php
    $dark = \App\Support\Tone::dark($d['tone'] ?? null);
    $cols = ['2' => 'md:grid-cols-2', '3' => 'md:grid-cols-2 lg:grid-cols-3', '4' => 'sm:grid-cols-2 lg:grid-cols-4'][$d['columns'] ?? '3'] ?? 'md:grid-cols-3';
    $items = $d['items'] ?? [];
@endphp
@if ($items)
    <section class="section {{ \App\Support\Tone::section($d['tone'] ?? null) }}">
        @if ($dark)<div class="bg-grid-dark pointer-events-none absolute inset-0"></div>@endif
        <div class="container-site relative">
            @include('blocks._heading', ['d' => $d])
            <div class="mt-14 grid gap-5 {{ $cols }}">
                @foreach ($items as $item)
                    <article data-reveal style="transition-delay: {{ ($loop->index % 3) * 70 }}ms"
                             @class(['group relative flex flex-col rounded-[var(--radius-card)] p-7 transition duration-300',
                                     'border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]' => $dark,
                                     'card card-hover' => ! $dark])>
                        @if (! empty($item['icon']))
                            <span class="icon-tile">{!! icon($item['icon'], 'icon') !!}</span>
                        @endif
                        @if (has_text($item['label'] ?? null))
                            <p class="mt-5 text-xs font-semibold tracking-[0.14em] uppercase {{ $dark ? 'text-amber-400' : 'text-brand-600' }}">{{ tr($item['label']) }}</p>
                        @endif
                        <h3 class="h-card {{ has_text($item['label'] ?? null) ? 'mt-2' : 'mt-5' }}">{{ tr($item['title']) }}</h3>
                        @if (has_text($item['body'] ?? null))
                            <p class="mt-3 text-[15px] leading-relaxed {{ $dark ? 'text-slate-400' : 'text-muted' }}">{{ tr($item['body']) }}</p>
                        @endif
                    </article>
                @endforeach
            </div>
        </div>
    </section>
@endif
