<section class="section bg-dark-section on-dark relative overflow-hidden">
    <div class="bg-grid-dark pointer-events-none absolute inset-0"></div>
    <div class="container-site relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
            @include('blocks._heading', ['d' => $d])
            @if (has_text($d['note'] ?? null))
                <p class="mt-8 max-w-lg border-l-2 border-amber-400/60 pl-4 text-sm leading-relaxed text-slate-400">{{ tr($d['note']) }}</p>
            @endif
        </div>
        @if (! empty($d['items']))
            <ul class="grid gap-4 sm:grid-cols-2">
                @foreach ($d['items'] as $item)
                    <li class="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm" data-reveal style="transition-delay: {{ $loop->index * 70 }}ms">
                        <span class="icon-tile">{!! icon($item['icon'] ?: 'shield-check', 'icon') !!}</span>
                        <h3 class="mt-5 text-[17px] font-semibold text-white">{{ tr($item['label']) }}</h3>
                        @if (has_text($item['sub'] ?? null))<p class="mt-1.5 text-[15px] leading-relaxed text-slate-400">{{ tr($item['sub']) }}</p>@endif
                    </li>
                @endforeach
            </ul>
        @endif
    </div>
</section>
