@php $dark = \App\Support\Tone::dark($d['tone'] ?? null); @endphp
@if (! empty($d['items']))
    <section class="section {{ \App\Support\Tone::section($d['tone'] ?? null) }}">
        <div class="container-site relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div class="lg:sticky lg:top-28 lg:self-start">@include('blocks._heading', ['d' => $d])</div>
            <ol class="divide-y {{ $dark ? 'divide-white/10' : 'divide-line' }} border-y {{ $dark ? 'border-white/10' : 'border-line' }}">
                @foreach ($d['items'] as $item)
                    <li class="grid grid-cols-[3.5rem_1fr] gap-4 py-8" data-reveal>
                        <span class="font-display text-2xl font-bold {{ $dark ? 'text-amber-400' : 'text-brand-600' }}">{{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}</span>
                        <div>
                            <h3 class="text-xl font-semibold">{{ tr($item['title']) }}</h3>
                            @if (has_text($item['body'] ?? null))
                                <p class="mt-2.5 leading-relaxed {{ $dark ? 'text-slate-400' : 'text-muted' }}">{{ tr($item['body']) }}</p>
                            @endif
                        </div>
                    </li>
                @endforeach
            </ol>
        </div>
    </section>
@endif
