@if (! empty($d['items']))
    <section class="section bg-white">
        <div class="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            @include('blocks._heading', ['d' => $d])
            <div class="divide-y divide-line border-y border-line">
                @foreach ($d['items'] as $item)
                    <details class="group py-5" @if ($loop->first) open @endif>
                        <summary class="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                            {{ tr($item['q']) }}
                            <span class="grid size-8 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45">{!! icon('plus', 'icon size-4', 2) !!}</span>
                        </summary>
                        <p class="mt-3 pr-12 leading-relaxed text-muted">{!! nl2br(e(tr($item['a']))) !!}</p>
                    </details>
                @endforeach
            </div>
        </div>
    </section>
    @push('head')
        <script type="application/ld+json">{!! json_encode(['@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => collect($d['items'])->map(fn ($i) => ['@type' => 'Question', 'name' => tr($i['q']), 'acceptedAnswer' => ['@type' => 'Answer', 'text' => tr($i['a'])]])->all()], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) !!}</script>
    @endpush
@endif
