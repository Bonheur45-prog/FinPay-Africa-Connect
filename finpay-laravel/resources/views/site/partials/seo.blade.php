<title>{{ $seo->title }}</title>
<meta name="description" content="{{ $seo->description }}">
<link rel="canonical" href="{{ $seo->canonical }}">
@if ($seo->noindex)
    <meta name="robots" content="noindex, follow">
@endif
@foreach ($seo->alternates as $l => $u)
    <link rel="alternate" hreflang="{{ $l }}" href="{{ $u }}">
@endforeach
<link rel="alternate" hreflang="x-default" href="{{ $seo->alternates[\App\Support\Locales::DEFAULT] ?? $seo->canonical }}">
<meta property="og:type" content="{{ $seo->type }}">
<meta property="og:site_name" content="{{ setting('general.site_name', 'FinPay Africa') }}">
<meta property="og:title" content="{{ $seo->title }}">
<meta property="og:description" content="{{ $seo->description }}">
<meta property="og:url" content="{{ $seo->canonical }}">
<meta property="og:locale" content="{{ app()->getLocale() === 'fr' ? 'fr_FR' : 'en_GB' }}">
@if ($seo->image)
    <meta property="og:image" content="{{ $seo->image }}">
@endif
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ $seo->title }}">
<meta name="twitter:description" content="{{ $seo->description }}">
@if ($seo->image)
    <meta name="twitter:image" content="{{ $seo->image }}">
@endif
<script type="application/ld+json">{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'FinancialService',
    'name' => setting('general.site_name', 'FinPay Africa'),
    'legalName' => setting('general.legal_name'),
    'url' => url('/'),
    'logo' => asset('images/brand/logo.png'),
    'email' => setting('contact.email'),
    'telephone' => setting('contact.phone'),
    'address' => ['@type' => 'PostalAddress', 'addressLocality' => 'Kigali', 'addressCountry' => 'RW'],
    'sameAs' => array_values(array_filter((array) setting('social', []))),
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}</script>
@if ($seo->jsonLd)
    <script type="application/ld+json">{!! json_encode($seo->jsonLd, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}</script>
@endif
