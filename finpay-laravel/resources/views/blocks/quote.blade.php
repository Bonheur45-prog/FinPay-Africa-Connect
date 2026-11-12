@if (has_text($d['text'] ?? null))
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
