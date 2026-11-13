{!! '<'.'?xml version="1.0" encoding="UTF-8"?>' !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
@foreach ($urls as $u)
    <url>
        <loc>{{ $u['loc'] }}</loc>
        @if ($u['lastmod'])<lastmod>{{ $u['lastmod']->toAtomString() }}</lastmod>@endif
        @foreach ($u['alternates'] as $l => $alt)
        <xhtml:link rel="alternate" hreflang="{{ $l }}" href="{{ $alt }}"/>
        @endforeach
    </url>
@endforeach
</urlset>
