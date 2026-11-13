@php
    $footer = setting('footer', []);
    $footerSolutions = $navSolutions ?? \App\Models\Solution::published()->get(['id', 'slug', 'title']);
    $legalPages = \App\Models\Page::where('show_in_footer', true)->where('status', 'published')->orderBy('id')->get(['id', 'slug', 'title', 'system_key']);
    $social = array_filter((array) setting('social', []));
    $socialIcons = ['linkedin' => 'brand-linkedin', 'x' => 'brand-x', 'facebook' => 'brand-facebook', 'instagram' => 'brand-instagram', 'youtube' => 'brand-youtube'];
@endphp
<footer class="bg-dark-section on-dark relative overflow-hidden text-slate-300">
    <div class="bg-grid-dark pointer-events-none absolute inset-0 opacity-60"></div>
    <div class="container-site relative">
        {{-- Newsletter band --}}
        <div id="newsletter" class="grid gap-8 border-b border-white/10 py-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
                <h2 class="text-2xl font-bold md:text-3xl">{{ tr($footer['newsletter_title'] ?? null) }}</h2>
                <p class="mt-2 max-w-xl text-slate-400">{{ tr($footer['newsletter_text'] ?? null) }}</p>
            </div>
            <div>
                <form method="POST" action="{{ route('forms.newsletter', ['locale' => app()->getLocale()]) }}" class="flex flex-col gap-3 sm:flex-row">
                    @csrf
                    <input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">
                    <label for="nl-email" class="sr-only">{{ __('site.newsletter.placeholder') }}</label>
                    <input id="nl-email" type="email" name="email" required value="{{ old('email') && session('newsletter_error') ? old('email') : '' }}"
                           placeholder="{{ __('site.newsletter.placeholder') }}" autocomplete="email"
                           class="min-h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-white placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 focus:outline-none">
                    <button class="btn btn-light">{{ __('site.actions.subscribe') }}</button>
                </form>
                @if (session('newsletter_success'))
                    <p class="mt-3 flex items-center gap-2 text-sm text-emerald-300" role="status">{!! icon('circle-check', 'icon size-4') !!} {{ session('newsletter_success') }}</p>
                @elseif (session('newsletter_error'))
                    <p class="mt-3 text-sm text-amber-300" role="alert">{{ session('newsletter_error') }}</p>
                @else
                    <p class="mt-3 text-xs text-slate-500">{{ __('site.footer.newsletter_privacy') }}</p>
                @endif
            </div>
        </div>

        <div class="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.85fr_0.85fr_1.45fr]">
            <div>
                <img src="{{ asset('images/brand/logo-light.png') }}" alt="{{ setting('general.site_name', 'FinPay Africa') }}" class="h-11 w-auto" loading="lazy">
                <p class="mt-5 max-w-xs text-[15px] leading-relaxed text-slate-400">{{ tr($footer['about'] ?? null) }}</p>
                @if ($social)
                    <div class="mt-6 flex gap-2">
                        @foreach ($social as $net => $url)
                            <a href="{{ $url }}" target="_blank" rel="noopener" class="grid size-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-white/30 hover:text-white" aria-label="{{ ucfirst($net) }}">
                                {!! icon($socialIcons[$net] ?? 'external-link', 'icon size-4') !!}
                            </a>
                        @endforeach
                    </div>
                @endif
            </div>

            <div>
                <h3 class="text-sm font-semibold tracking-wide text-white">{{ __('site.footer.solutions') }}</h3>
                <ul class="mt-4 space-y-3 text-[15px]">
                    @foreach ($footerSolutions as $s)
                        <li><a href="{{ $s->publicUrl() }}" class="hover:text-white">{{ $s->t('title') }}</a></li>
                    @endforeach
                </ul>
            </div>

            @foreach ($footer['columns'] ?? [] as $col)
                <div>
                    <h3 class="text-sm font-semibold tracking-wide text-white">{{ tr($col['title']) }}</h3>
                    <ul class="mt-4 space-y-3 text-[15px]">
                        @foreach ($col['links'] ?? [] as $l)
                            <li><a href="{{ href($l['url']) }}" class="hover:text-white">{{ tr($l['label']) }}</a></li>
                        @endforeach
                    </ul>
                </div>
            @endforeach

            @if ($legalPages->isNotEmpty())
                <div>
                    <h3 class="text-sm font-semibold tracking-wide text-white">{{ __('site.footer.legal') }}</h3>
                    <ul class="mt-4 space-y-3 text-[15px]">
                        @foreach ($legalPages as $lp)
                            <li><a href="{{ $lp->publicUrl() }}" class="hover:text-white">{{ $lp->t('title') }}</a></li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <div>
                <h3 class="text-sm font-semibold tracking-wide text-white">{{ __('site.footer.contact') }}</h3>
                <ul class="mt-4 space-y-3 text-[15px]">
                    @if ($e = setting('contact.email'))
                        <li><a href="mailto:{{ $e }}" class="flex items-start gap-2.5 break-all hover:text-white">{!! icon('mail', 'icon mt-1 size-4 text-amber-400') !!}{{ $e }}</a></li>
                    @endif
                    @foreach (array_filter([setting('contact.phone'), setting('contact.phone_secondary')]) as $ph)
                        <li><a href="tel:{{ preg_replace('/[^\d+]/', '', $ph) }}" class="flex items-start gap-2.5 hover:text-white">{!! icon('phone', 'icon mt-1 size-4 text-amber-400') !!}{{ $ph }}</a></li>
                    @endforeach
                    @if (has_text(setting('contact.address')))
                        <li class="flex items-start gap-2.5">{!! icon('map-pin', 'icon mt-1 size-4 text-amber-400') !!}{{ tr(setting('contact.address')) }}</li>
                    @endif
                </ul>
            </div>
        </div>

        <div class="border-t border-white/10 py-8 text-[13px] text-slate-500">
            @if (has_text($footer['disclaimer'] ?? null))
                <p class="max-w-4xl leading-relaxed">{{ tr($footer['disclaimer']) }}</p>
            @endif
            <div class="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p>© {{ date('Y') }} {{ setting('general.legal_name', 'FinPay Africa Ltd') }}. {{ __('site.footer.rights') }}
                    @if (has_text(setting('general.group'))) · {{ tr(setting('general.group')) }} @endif
                    @if ($r = setting('general.registration')) · {{ $r }} @endif
                </p>
                @if (setting('seo.google_analytics_id'))
                    <button type="button" class="text-left hover:text-slate-300" x-data @click="window.dispatchEvent(new CustomEvent('open-cookie-settings'))">{{ __('site.cookies.learn') }}</button>
                @endif
            </div>
        </div>
    </div>
</footer>
