@php
    $seo ??= \App\Support\Seo::make(title: '');
    $locale = app()->getLocale();
    $ga = setting('seo.google_analytics_id');
@endphp
<!DOCTYPE html>
<html lang="{{ $locale }}" class="scroll-pt-24">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>document.documentElement.classList.add('js')</script>
    @include('site.partials.seo', ['seo' => $seo])
    <link rel="icon" href="{{ asset('favicon.png') }}" type="image/png">
    <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">
    <meta name="theme-color" content="#0a1322">
    @if ($v = setting('seo.google_site_verification'))
        <meta name="google-site-verification" content="{{ $v }}">
    @endif
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @if ($ga)
        <script>window.FP_GA_ID = @json($ga);</script>
    @endif
    @stack('head')
</head>
<body class="flex min-h-screen flex-col">
    <a href="#main" class="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">{{ __('site.skip') }}</a>

    @if (isset($page) && $page->status !== 'published' || isset($post) && ! $post->isLive())
        <div class="bg-amber-50 py-2 text-center text-sm font-medium text-amber-900">{{ __('site.draft_banner') }}</div>
    @endif

    @include('site.partials.header')

    <main id="main" class="flex-1">
        @yield('content')
    </main>

    @include('site.partials.footer')
    @include('site.partials.cookie-consent')

    <button type="button" id="back-to-top" class="fixed bottom-5 left-5 z-40 grid size-11 place-items-center rounded-full bg-ink text-white shadow-[var(--shadow-float)] hover:bg-brand-600" aria-label="{{ __('site.back_to_top') }}">
        {!! icon('arrow-up', 'icon size-5', 2) !!}
    </button>

    @auth
        @if (! empty($editUrl))
            <a href="{{ $editUrl }}" class="fixed right-5 bottom-5 z-50 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-float)] hover:bg-navy-800">
                {!! icon('pencil', 'icon size-4') !!} {{ __('site.actions.edit_page') }}
            </a>
        @endif
    @endauth
    @stack('scripts')
</body>
</html>
