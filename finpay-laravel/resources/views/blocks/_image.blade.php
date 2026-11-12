{{-- Responsive image from the media library. Params: $id, $class, $sizes, $eager --}}
@php $m = media($id ?? null); @endphp
@if ($m && $m->isImage())
    <img src="{{ $m->url('md') }}" @if ($m->srcset()) srcset="{{ $m->srcset() }}" sizes="{{ $sizes ?? '(min-width: 1024px) 50vw, 100vw' }}" @endif
         alt="{{ $m->t('alt') }}" @if ($m->width) width="{{ $m->width }}" height="{{ $m->height }}" @endif
         class="{{ $class ?? '' }}" @if ($eager ?? false) fetchpriority="high" @else loading="lazy" @endif decoding="async">
@endif
