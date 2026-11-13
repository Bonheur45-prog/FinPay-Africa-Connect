@php
    $dark = \App\Support\Tone::dark($d['tone'] ?? null);
    $left = ($d['image_side'] ?? 'right') === 'left';
    $hasImage = (bool) media($d['image'] ?? null);
    $hasFacts = ! $hasImage && ! empty($d['facts']);
    $hasAside = $hasImage || $hasFacts;
@endphp
<section class="section {{ \App\Support\Tone::section($d['tone'] ?? null) }}">
    <div class="container-site relative grid items-center gap-14 {{ $hasAside ? 'lg:grid-cols-2' : '' }}">
        <div @class(['lg:order-2' => $left && $hasAside, 'max-w-3xl' => ! $hasAside])>
            @include('blocks._heading', ['d' => $d])
            @if (has_text($d['body'] ?? null))
                <div class="prose-fp mt-6 {{ $dark ? 'text-slate-300' : '' }}" data-reveal>{!! tr($d['body']) !!}</div>
            @endif
            @if (! empty($d['bullets']))
                <ul class="mt-8 grid gap-3 sm:grid-cols-2" data-reveal>
                    @foreach ($d['bullets'] as $bl)
                        <li class="flex items-start gap-3 text-[15px] font-medium">
                            <span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-success-50 text-success-600">{!! icon('check', 'icon size-3.5', 2.5) !!}</span>
                            {{ tr($bl['text']) }}
                        </li>
                    @endforeach
                </ul>
            @endif
            @if (! empty($d['tags']))
                <ul class="mt-8 flex flex-wrap gap-2">
                    @foreach ($d['tags'] as $tag)<li class="chip">{{ tr($tag['text']) }}</li>@endforeach
                </ul>
            @endif
            @if (! empty($d['cta']['url']) && has_text($d['cta']['label'] ?? null))
                <a href="{{ href($d['cta']['url']) }}" class="link-arrow mt-9">{{ tr($d['cta']['label']) }} {!! icon('arrow-right') !!}</a>
            @endif
        </div>
        @if ($hasImage)
            <div @class(['relative', 'lg:order-1' => $left]) data-reveal>
                <div class="absolute -inset-3 -z-0 rotate-[-2deg] rounded-[28px] bg-gradient-to-br from-brand-100 to-amber-50"></div>
                <div class="relative overflow-hidden rounded-[22px] border border-line bg-white shadow-[var(--shadow-lift)]">
                    @include('blocks._image', ['id' => $d['image'], 'class' => 'aspect-[4/3] size-full object-cover'])
                </div>
            </div>
        @elseif ($hasFacts)
            <div @class(['relative', 'lg:order-1' => $left]) data-reveal>
                <div class="absolute -inset-3 rotate-[-2deg] rounded-[28px] bg-gradient-to-br from-brand-100 to-amber-50"></div>
                <div class="relative overflow-hidden rounded-[22px] border border-line bg-white shadow-[var(--shadow-lift)]">
                    <div class="bg-dark-section on-dark relative flex items-center gap-4 px-7 py-6">
                        <span class="grid size-12 place-items-center rounded-xl bg-white/95"><img src="{{ asset('images/brand/mark.png') }}" alt="" class="size-8"></span>
                        <div>
                            <p class="font-display text-lg font-bold text-white">{{ setting('general.legal_name', 'FinPay Africa Ltd') }}</p>
                            <p class="text-sm text-slate-400">{{ tr($d['facts_title'] ?? null) ?: tr(setting('general.tagline')) }}</p>
                        </div>
                    </div>
                    <dl class="divide-y divide-line px-7">
                        @foreach ($d['facts'] as $f)
                            <div class="flex items-baseline justify-between gap-6 py-4 text-[15px]">
                                <dt class="text-muted">{{ tr($f['label']) }}</dt>
                                <dd class="text-right font-semibold text-ink">{{ tr($f['value']) }}</dd>
                            </div>
                        @endforeach
                    </dl>
                    <div class="flex items-center gap-2 border-t border-line bg-surface px-7 py-4 text-[13px] font-medium text-success-600">
                        {!! icon('shield-check', 'icon size-4', 2) !!} {{ __('site.verified_entity') }}
                    </div>
                </div>
            </div>
        @endif
    </div>
</section>
