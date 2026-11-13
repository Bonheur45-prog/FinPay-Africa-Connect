@php
    $variant = $d['variant'] ?? 'page';
    $hasImage = (bool) media($d['image'] ?? null);
    $bg = media($d['background'] ?? null);
    $overlay = ['strong' => 'from-navy-950/95 via-navy-950/85 to-navy-950/60', 'medium' => 'from-navy-950/90 via-navy-950/70 to-navy-950/35', 'light' => 'from-navy-950/80 via-navy-950/50 to-navy-950/10'][$d['overlay'] ?? 'strong'] ?? 'from-navy-950/95 via-navy-950/85 to-navy-950/60';
    $level = $first ? 'h1' : 'h2';
@endphp

@if ($variant === 'home')
    <section class="relative overflow-hidden bg-white">
        <div class="bg-grid pointer-events-none absolute inset-0"></div>
        <div class="pointer-events-none absolute -top-40 right-[-10%] size-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(232_137_12/0.14),transparent)]"></div>
        <div class="pointer-events-none absolute top-40 left-[-15%] size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(140_26_19/0.08),transparent)]"></div>

        <div class="container-site relative grid items-center gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-[1.08fr_1fr] lg:pb-28">
            <div>
                @if (has_text($d['eyebrow'] ?? null))
                    <p class="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pr-4 pl-1.5 text-[13px] font-medium text-ink/80 shadow-[var(--shadow-card)]">
                        <span class="rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white uppercase">FinPay</span>
                        {{ tr($d['eyebrow']) }}
                    </p>
                @endif
                <{{ $level }} class="h-display mt-6">
                    {{ tr($d['title']) }}
                    @if (has_text($d['highlight'] ?? null)) <span class="text-highlight">{{ tr($d['highlight']) }}</span> @endif
                </{{ $level }}>
                @if (has_text($d['subtitle'] ?? null))
                    <p class="lead mt-6 max-w-xl">{{ tr($d['subtitle']) }}</p>
                @endif
                @include('blocks._buttons', ['primary' => $d['primary'] ?? [], 'secondary' => $d['secondary'] ?? [], 'class' => 'mt-9'])
                @if (! empty($d['badges']))
                    <ul class="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
                        @foreach ($d['badges'] as $badge)
                            <li class="flex items-center gap-2 text-sm font-medium text-ink/75">
                                <span class="text-success-600">{!! icon($badge['icon'] ?: 'circle-check', 'icon size-[18px]', 2) !!}</span>{{ tr($badge['label']) }}
                            </li>
                        @endforeach
                    </ul>
                @endif
            </div>

            <div class="relative mx-auto w-full max-w-[520px]" aria-hidden="{{ $hasImage ? 'false' : 'true' }}">
                <div class="absolute inset-6 rounded-[40px] bg-gradient-to-br from-brand-50 via-white to-amber-50 ring-1 ring-line"></div>
                @if ($hasImage)
                    @include('blocks._image', ['id' => $d['image'], 'class' => 'relative z-10 mx-auto h-auto w-[86%] drop-shadow-[0_24px_32px_rgb(11_18_32/0.16)]', 'eager' => true, 'sizes' => '(min-width: 1024px) 480px, 90vw'])
                @endif
                <div class="absolute top-[14%] -left-2 z-20 hidden items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-[var(--shadow-lift)] backdrop-blur sm:flex">
                    <span class="grid size-9 place-items-center rounded-full bg-success-50 text-success-600">{!! icon('shield-check', 'icon size-5', 2) !!}</span>
                    <span class="leading-tight"><span class="block text-[13px] font-semibold text-ink">{{ __('site.hero.chip_secure') }}</span><span class="text-xs text-muted">{{ __('site.hero.chip_secure_sub') }}</span></span>
                </div>
                <div class="absolute right-0 bottom-[12%] z-20 hidden items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-[var(--shadow-lift)] backdrop-blur sm:flex">
                    <span class="grid size-9 place-items-center rounded-full bg-brand-50 text-brand-600">{!! icon('zap', 'icon size-5', 2) !!}</span>
                    <span class="leading-tight"><span class="block text-[13px] font-semibold text-ink">{{ __('site.hero.chip_fast') }}</span><span class="text-xs text-muted">{{ __('site.hero.chip_fast_sub') }}</span></span>
                </div>
            </div>
        </div>
    </section>

@elseif ($variant === 'centered')
    <section class="relative overflow-hidden border-b border-line bg-surface">
        <div class="bg-grid pointer-events-none absolute inset-0"></div>
        <div class="container-site relative py-16 text-center md:py-24">
            <div class="flex justify-center">@include('blocks._breadcrumbs')</div>
            @if (has_text($d['eyebrow'] ?? null))<p class="eyebrow justify-center">{{ tr($d['eyebrow']) }}</p>@endif
            <{{ $level }} class="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-[1.1] md:text-[3.25rem]">
                {{ tr($d['title']) }} @if (has_text($d['highlight'] ?? null)) <span class="text-highlight">{{ tr($d['highlight']) }}</span> @endif
            </{{ $level }}>
            @if (has_text($d['subtitle'] ?? null))<p class="lead mx-auto mt-5 max-w-2xl">{{ tr($d['subtitle']) }}</p>@endif
            @include('blocks._buttons', ['primary' => $d['primary'] ?? [], 'secondary' => $d['secondary'] ?? [], 'class' => 'mt-8 justify-center'])
        </div>
    </section>

@else
    <section class="bg-dark-section on-dark relative isolate overflow-hidden">
        @if ($bg)
            <div class="parallax-wrap absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                <img src="{{ $bg->url('md') }}" srcset="{{ $bg->srcset() }}" sizes="100vw" alt="" fetchpriority="high" decoding="async"
                     class="parallax-img hero-zoom absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover" data-parallax="0.22">
            </div>
            <div class="absolute inset-0 -z-10 bg-gradient-to-r {{ $overlay }}" aria-hidden="true"></div>
            <div class="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-navy-950/70 to-transparent" aria-hidden="true"></div>
        @else
            <div class="bg-grid-dark pointer-events-none absolute inset-0"></div>
        @endif
        <div @class(['container-site relative py-16 md:py-24', 'md:py-32 lg:py-36' => $bg && ! $hasImage, 'grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]' => $hasImage])>
            <div @class(['max-w-3xl' => ! $hasImage])>
                @include('blocks._breadcrumbs', ['dark' => true])
                @if (has_text($d['eyebrow'] ?? null))<p class="eyebrow">{{ tr($d['eyebrow']) }}</p>@endif
                <{{ $level }} class="mt-4 text-4xl font-bold leading-[1.08] md:text-[3.4rem]">
                    {{ tr($d['title']) }} @if (has_text($d['highlight'] ?? null)) <span class="text-highlight">{{ tr($d['highlight']) }}</span> @endif
                </{{ $level }}>
                @if (has_text($d['subtitle'] ?? null))<p class="lead mt-6 max-w-2xl">{{ tr($d['subtitle']) }}</p>@endif
                @include('blocks._buttons', ['primary' => $d['primary'] ?? [], 'secondary' => $d['secondary'] ?? [], 'dark' => true, 'class' => 'mt-9'])
                @if (! empty($d['badges']))
                    <ul class="mt-9 flex flex-wrap gap-2.5">
                        @foreach ($d['badges'] as $badge)
                            <li class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-slate-200">
                                <span class="text-amber-400">{!! icon($badge['icon'] ?: 'circle-check', 'icon size-4', 2) !!}</span>{{ tr($badge['label']) }}
                            </li>
                        @endforeach
                    </ul>
                @endif
            </div>
            @if ($hasImage)
                <div class="relative">
                    <div class="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-brand-500/25 to-amber-500/10 blur-2xl"></div>
                    <div class="relative overflow-hidden rounded-[22px] border border-white/10 shadow-[var(--shadow-float)]">
                        @include('blocks._image', ['id' => $d['image'], 'class' => 'h-auto w-full', 'eager' => true])
                    </div>
                </div>
            @endif
        </div>
    </section>
@endif
