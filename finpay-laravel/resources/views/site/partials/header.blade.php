@php
    $nav = setting('navigation', []);
    $navSolutions = \App\Models\Solution::published()->get(['id', 'slug', 'icon', 'title', 'summary']);
    $current ??= null;
    $alts = $seo->alternates ?? [];
    $announcement = tr(setting('general.announcement'));
    $isActive = fn ($url) => $current && trim((string) $url, '/') === ($current === 'contact' ? 'contact-us' : $current);
@endphp

@if ($announcement)
    <div class="bg-ink text-white">
        <div class="container-site flex items-center justify-center gap-2 py-2 text-center text-[13px]">
            <span class="size-1.5 rounded-full bg-amber-400"></span>
            @if ($u = setting('general.announcement_url'))
                <a href="{{ href($u) }}" class="font-medium hover:underline">{{ $announcement }} →</a>
            @else
                <span class="font-medium">{{ $announcement }}</span>
            @endif
        </div>
    </div>
@endif

<header x-data="siteHeader" @keydown.escape.window="close()"
        :class="scrolled ? 'border-line bg-white/90 shadow-[0_1px_0_rgb(16_24_40/0.04)]' : 'border-transparent bg-white/70'"
        class="sticky top-0 z-40 border-b border-transparent bg-white/80 backdrop-blur-xl transition-colors duration-300">
    <div class="container-site flex h-[72px] items-center justify-between gap-6">
        <a href="{{ href('/') }}" class="shrink-0" aria-label="{{ setting('general.site_name', 'FinPay Africa') }} — {{ __('site.nav.home') }}">
            <img src="{{ asset('images/brand/logo.png') }}" alt="{{ setting('general.site_name', 'FinPay Africa') }}" width="160" height="58" class="h-10 w-auto md:h-11">
        </a>

        <nav class="hidden items-center gap-1 lg:flex" aria-label="Main">
            @foreach ($nav['items'] ?? [] as $i => $item)
                @if (! empty($item['mega']) && $navSolutions->isNotEmpty())
                    <div class="relative" @mouseenter="openMenu({{ $i }})" @mouseleave="closeSoon()">
                        <button type="button" @click="toggleMenu({{ $i }})" :aria-expanded="menu === {{ $i }}"
                                class="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition hover:text-brand-600 {{ $isActive($item['url']) ? 'text-brand-600' : 'text-ink/80' }}">
                            {{ tr($item['label']) }}
                            {!! icon('chevron-down', 'icon size-4 transition-transform', 2) !!}
                        </button>
                        <div x-cloak x-show="menu === {{ $i }}" x-transition.opacity.duration.150ms @mouseenter="cancelClose()"
                             class="absolute top-full left-1/2 w-[720px] -translate-x-1/2 pt-3">
                            <div class="card overflow-hidden p-0 shadow-[var(--shadow-float)]">
                                <div class="grid grid-cols-2 gap-1 p-3">
                                    @foreach ($navSolutions as $s)
                                        <a href="{{ $s->publicUrl() }}" class="group flex gap-3.5 rounded-xl p-3 transition hover:bg-surface">
                                            <span class="icon-tile size-10">{!! icon($s->icon, 'icon size-5') !!}</span>
                                            <span>
                                                <span class="block text-[15px] font-semibold text-ink group-hover:text-brand-600">{{ $s->t('title') }}</span>
                                                <span class="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-muted">{{ $s->t('summary') }}</span>
                                            </span>
                                        </a>
                                    @endforeach
                                </div>
                                <a href="{{ href($item['url']) }}" class="flex items-center justify-between border-t border-line bg-surface px-6 py-4 text-sm hover:bg-brand-50">
                                    <span><span class="font-semibold text-ink">{{ __('site.nav.all_solutions') }}</span> <span class="text-muted">— {{ __('site.nav.all_solutions_text') }}</span></span>
                                    {!! icon('arrow-right', 'icon size-4 text-brand-600') !!}
                                </a>
                            </div>
                        </div>
                    </div>
                @else
                    <a href="{{ href($item['url']) }}" @if ($isActive($item['url'])) aria-current="page" @endif
                       class="rounded-full px-3.5 py-2 text-[15px] font-medium transition hover:text-brand-600 {{ $isActive($item['url']) ? 'text-brand-600' : 'text-ink/80' }}">
                        {{ tr($item['label']) }}
                    </a>
                @endif
            @endforeach
        </nav>

        <div class="flex items-center gap-2">
            <div class="hidden items-center rounded-full border border-line p-0.5 text-[13px] font-semibold sm:flex" role="group" aria-label="{{ __('site.nav.language') }}">
                @foreach (\App\Support\Locales::ALL as $l)
                    <a href="{{ $alts[$l] ?? url($l) }}" hreflang="{{ $l }}" lang="{{ $l }}" @if ($l === app()->getLocale()) aria-current="true" @endif
                       class="rounded-full px-2.5 py-1 uppercase transition {{ $l === app()->getLocale() ? 'bg-ink text-white' : 'text-muted hover:text-ink' }}">{{ $l }}</a>
                @endforeach
            </div>
            @if (! empty($nav['cta']['url']))
                <a href="{{ href($nav['cta']['url']) }}" class="btn btn-primary btn-sm hidden md:inline-flex">{{ tr($nav['cta']['label']) }}</a>
            @endif
            <button type="button" class="grid size-11 place-items-center rounded-full border border-line lg:hidden" @click="mobile = true"
                    aria-controls="mobile-nav" :aria-expanded="mobile">
                <span class="sr-only">{{ __('site.nav.menu') }}</span>
                {!! icon('menu', 'icon size-5', 2) !!}
            </button>
        </div>
    </div>

    {{-- Mobile navigation (teleported to <body>: the header's backdrop blur would otherwise clip fixed children) --}}
    <template x-teleport="body">
    <div x-cloak x-show="mobile" class="fixed inset-0 z-50 lg:hidden" id="mobile-nav" role="dialog" aria-modal="true">
        <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" x-show="mobile" x-transition.opacity @click="mobile = false"></div>
        <div x-show="mobile" x-transition:enter="transition duration-300 ease-out" x-transition:enter-start="translate-x-full" x-transition:leave="transition duration-200" x-transition:leave-end="translate-x-full"
             class="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div class="flex h-[72px] items-center justify-between border-b border-line px-5">
                <img src="{{ asset('images/brand/logo.png') }}" alt="" class="h-9 w-auto">
                <button type="button" class="grid size-11 place-items-center rounded-full border border-line" @click="mobile = false">
                    <span class="sr-only">{{ __('site.nav.close') }}</span>{!! icon('x', 'icon size-5', 2) !!}
                </button>
            </div>
            <nav class="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobile">
                @foreach ($nav['items'] ?? [] as $item)
                    @if (! empty($item['mega']) && $navSolutions->isNotEmpty())
                        <div x-data="{ open: false }" class="border-b border-line">
                            <button type="button" class="flex w-full items-center justify-between py-4 text-lg font-semibold" @click="open = !open" :aria-expanded="open">
                                {{ tr($item['label']) }} <span :class="open && 'rotate-180'" class="transition">{!! icon('chevron-down', 'icon size-5') !!}</span>
                            </button>
                            <div x-show="open" x-collapse class="space-y-1 pb-4">
                                @foreach ($navSolutions as $s)
                                    <a href="{{ $s->publicUrl() }}" class="flex items-center gap-3 rounded-lg p-2 text-[15px] hover:bg-surface">
                                        <span class="icon-tile size-9">{!! icon($s->icon, 'icon size-[18px]') !!}</span>{{ $s->t('title') }}
                                    </a>
                                @endforeach
                                <a href="{{ href($item['url']) }}" class="link-arrow mt-2 p-2 text-sm">{{ __('site.nav.all_solutions') }} {!! icon('arrow-right') !!}</a>
                            </div>
                        </div>
                    @else
                        <a href="{{ href($item['url']) }}" class="block border-b border-line py-4 text-lg font-semibold">{{ tr($item['label']) }}</a>
                    @endif
                @endforeach
            </nav>
            <div class="space-y-4 border-t border-line p-5">
                <div class="flex gap-2">
                    @foreach (\App\Support\Locales::labels() as $l => $label)
                        <a href="{{ $alts[$l] ?? url($l) }}" class="flex-1 rounded-full border px-3 py-2 text-center text-sm font-semibold {{ $l === app()->getLocale() ? 'border-ink bg-ink text-white' : 'border-line' }}">{{ $label }}</a>
                    @endforeach
                </div>
                @if (! empty($nav['cta']['url']))
                    <a href="{{ href($nav['cta']['url']) }}" class="btn btn-primary w-full">{{ tr($nav['cta']['label']) }}</a>
                @endif
            </div>
        </div>
    </div>
    </template>
</header>
