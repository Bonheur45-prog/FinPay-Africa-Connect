@php $bg = media($d['background'] ?? null); @endphp
@if (has_text($d['text'] ?? null))
    @if ($bg)
        <section class="on-dark relative isolate overflow-hidden bg-navy-950 py-28 md:py-40">
            <div class="parallax-wrap absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                <img src="{{ $bg->url('md') }}" srcset="{{ $bg->srcset() }}" sizes="100vw" alt="" loading="lazy" decoding="async"
                     class="parallax-img absolute inset-x-0 -top-[20%] h-[140%] w-full object-cover" data-parallax="0.3">
            </div>
            <div class="absolute inset-0 -z-10 bg-navy-950/70" aria-hidden="true"></div>
            <figure class="container-site max-w-4xl text-center" data-reveal>
                <span class="mx-auto block font-display text-7xl leading-none text-amber-400/70" aria-hidden="true">“</span>
                <blockquote class="mt-2 font-display text-2xl leading-snug font-semibold text-white md:text-[2.2rem]">{{ tr($d['text']) }}</blockquote>
                @if (has_text($d['attribution'] ?? null))
                    <figcaption class="mt-7 text-[15px] font-medium text-slate-300">— {{ ltrim(tr($d['attribution']), '—– ') }}</figcaption>
                @endif
            </figure>
        </section>
    @else

    <section class="section-sm bg-white">
        <figure class="container-site max-w-4xl text-center" data-reveal>
            <span class="mx-auto block font-display text-6xl leading-none text-brand-200" aria-hidden="true">“</span>
            <blockquote class="mt-2 font-display text-2xl leading-snug font-semibold text-ink md:text-[2rem]">{{ tr($d['text']) }}</blockquote>
            @if (has_text($d['attribution'] ?? null))
                <figcaption class="mt-6 text-[15px] font-medium text-muted">— {{ ltrim(tr($d['attribution']), '—– ') }}</figcaption>
            @endif
        </figure>
    </section>
    @endif
@endif
