<section class="section-sm bg-white">
    <div class="container-site">
        <div class="bg-dark-section on-dark relative overflow-hidden rounded-[28px] px-7 py-14 md:px-16 md:py-20" data-reveal>
            <div class="bg-grid-dark pointer-events-none absolute inset-0"></div>
            <img src="{{ asset('images/brand/mark.png') }}" alt="" class="pointer-events-none absolute -right-16 -bottom-20 size-[360px] opacity-[0.07]" loading="lazy">
            <div class="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
                <div>
                    @if (has_text($d['eyebrow'] ?? null))<p class="eyebrow">{{ tr($d['eyebrow']) }}</p>@endif
                    <h2 class="h-section mt-4 max-w-2xl">{{ tr($d['title']) }}</h2>
                    @if (has_text($d['subtitle'] ?? null))<p class="lead mt-5 max-w-2xl">{{ tr($d['subtitle']) }}</p>@endif
                </div>
                <div class="lg:justify-self-end">
                    @include('blocks._buttons', ['primary' => $d['primary'] ?? [], 'secondary' => $d['secondary'] ?? [], 'dark' => true])
                </div>
            </div>
            @if (! empty($d['points']))
                <ul class="relative mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-7 text-sm text-slate-300">
                    @foreach ($d['points'] as $p)
                        <li class="flex items-center gap-2">{!! icon('circle-check', 'icon size-4 text-amber-400', 2) !!}{{ tr($p['text']) }}</li>
                    @endforeach
                </ul>
            @endif
        </div>
    </div>
</section>
