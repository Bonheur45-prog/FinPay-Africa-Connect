@php
    $slides = array_values(array_filter($d['slides'] ?? [], fn ($s) => media($s['image'] ?? null) || has_text($s['title'] ?? null)));
    $count = count($slides);
    $interval = max(4, min(20, (int) ($d['interval'] ?? 7) ?: 7));
@endphp
@if ($count)
    <section class="relative isolate overflow-hidden bg-navy-950 text-white on-dark"
             x-data="heroSlider({{ $count }}, {{ $interval }})" @mouseenter="hover = true" @mouseleave="hover = false"
             @focusin="hover = true" @focusout="hover = false" @keydown.left="prev()" @keydown.right="next()"
             aria-roledescription="carousel" aria-label="{{ __('site.slider.label') }}">

        {{-- Photos --}}
        @foreach ($slides as $i => $s)
            @php $m = media($s['image'] ?? null); @endphp
            <div class="absolute inset-0 -z-10 transition-opacity duration-[1200ms] ease-out {{ $i === 0 ? 'opacity-100' : 'opacity-0' }}"
                 :class="active === {{ $i }} ? 'opacity-100 is-active' : 'opacity-0'" aria-hidden="true">
                @if ($m)
                    <div class="parallax-wrap absolute inset-0 overflow-hidden">
                        <img src="{{ $m->url('md') }}" srcset="{{ $m->srcset() }}" sizes="100vw" alt=""
                             class="parallax-img kenburns absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
                             data-parallax="0.18" @if ($i === 0) fetchpriority="high" @else loading="{{ $i === 1 ? 'eager' : 'lazy' }}" @endif decoding="async">
                    </div>
                @endif
            </div>
        @endforeach
        <div class="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/20" aria-hidden="true"></div>
        <div class="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-navy-950/90 to-transparent" aria-hidden="true"></div>

        <div class="container-site relative flex min-h-[min(860px,calc(100svh-72px))] flex-col justify-center pt-16 pb-36 md:pt-20 md:pb-44">
            <div class="relative max-w-3xl">
                @foreach ($slides as $i => $s)
                    <div @if ($i > 0) x-cloak @endif x-show="active === {{ $i }}"
                         x-transition:enter="transition duration-700 ease-out delay-200" x-transition:enter-start="opacity-0 translate-y-5"
                         x-transition:leave="transition duration-300 ease-in absolute inset-x-0 top-0" x-transition:leave-end="opacity-0 -translate-y-2"
                         role="group" aria-roledescription="slide" aria-label="{{ $i + 1 }} / {{ $count }}">
                        @if (has_text($s['eyebrow'] ?? null))
                            <p class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur">
                                <span class="size-1.5 rounded-full bg-amber-400"></span>{{ tr($s['eyebrow']) }}
                            </p>
                        @endif
                        @php $tag = $i === 0 && $first ? 'h1' : 'h2'; @endphp
                        <{{ $tag }} class="mt-6 text-[2.6rem] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[4.1rem]">
                            {{ tr($s['title'] ?? null) }}
                            @if (has_text($s['highlight'] ?? null)) <span class="text-amber-400">{{ tr($s['highlight']) }}</span> @endif
                        </{{ $tag }}>
                        @if (has_text($s['subtitle'] ?? null))
                            <p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">{{ tr($s['subtitle']) }}</p>
                        @endif
                        @include('blocks._buttons', ['primary' => $s['primary'] ?? [], 'secondary' => $s['secondary'] ?? [], 'dark' => true, 'class' => 'mt-9'])
                    </div>
                @endforeach
            </div>
        </div>

        {{-- Controls --}}
        @if ($count > 1)
            <div class="absolute inset-x-0 bottom-20 md:bottom-32">
                <div class="container-site flex items-center justify-between gap-6">
                    <div class="flex items-center gap-3 sm:gap-5">
                        <span class="font-display text-sm font-semibold tabular-nums text-white/80"><span x-text="String(active + 1).padStart(2, '0')">01</span><span class="mx-1.5 text-white/40">/</span>{{ str_pad($count, 2, '0', STR_PAD_LEFT) }}</span>
                        <div class="flex gap-2">
                            @foreach ($slides as $i => $s)
                                <button type="button" @click="go({{ $i }})" class="relative h-1 w-6 overflow-hidden rounded-full bg-white/25 sm:w-10 md:w-14" aria-label="{{ __('site.slider.goto', ['n' => $i + 1]) }}" :aria-current="active === {{ $i }}">
                                    <span class="absolute inset-y-0 left-0 bg-white" :style="active === {{ $i }} ? `width:${progress}%` : (active > {{ $i }} ? 'width:100%' : 'width:0%')"></span>
                                </button>
                            @endforeach
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" @click="paused = !paused" class="hidden sm:grid size-10 place-items-center rounded-full border border-white/20 text-white/80 hover:border-white/50 hover:text-white" :aria-label="paused ? '{{ __('site.slider.play') }}' : '{{ __('site.slider.pause') }}'">
                            <span x-show="!paused">{!! icon('pause', 'icon size-4', 2) !!}</span><span x-show="paused" x-cloak>{!! icon('play', 'icon size-4', 2) !!}</span>
                        </button>
                        <button type="button" @click="prev()" class="grid size-10 place-items-center rounded-full border border-white/20 text-white/80 hover:border-white/50 hover:text-white" aria-label="{{ __('site.slider.prev') }}">{!! icon('chevron-left', 'icon size-5', 2) !!}</button>
                        <button type="button" @click="next()" class="grid size-10 place-items-center rounded-full border border-white/20 text-white/80 hover:border-white/50 hover:text-white" aria-label="{{ __('site.slider.next') }}">{!! icon('chevron-right', 'icon size-5', 2) !!}</button>
                    </div>
                </div>
            </div>
        @endif

        {{-- Trust bar --}}
        @if (! empty($d['badges']))
            <div class="absolute inset-x-0 bottom-0 border-t border-white/10 bg-navy-950/55 backdrop-blur-md">
                <ul class="container-site flex items-center gap-x-8 overflow-x-auto py-4 whitespace-nowrap [scrollbar-width:none] md:justify-between md:py-5">
                    @foreach ($d['badges'] as $badge)
                        <li class="flex shrink-0 items-center gap-2.5 text-sm font-medium text-white/90">
                            <span class="text-amber-400">{!! icon($badge['icon'] ?: 'circle-check', 'icon size-[18px]', 2) !!}</span>{{ tr($badge['label']) }}
                        </li>
                    @endforeach
                </ul>
            </div>
        @endif
    </section>
@endif
