@extends('site.layout')

@section('content')
    <article>
        <header class="relative overflow-hidden border-b border-line bg-surface">
            <div class="bg-grid pointer-events-none absolute inset-0"></div>
            <div class="container-site relative max-w-4xl py-14 md:py-20">
                @include('blocks._breadcrumbs')
                <div class="flex flex-wrap items-center gap-3 text-sm text-muted">
                    @if ($post->category)<a href="{{ href('/blog') }}?category={{ $post->category->slug }}" class="pill-tag">{{ $post->category->t('name') }}</a>@endif
                    <time datetime="{{ $post->published_at?->toDateString() }}">{{ $post->published_at?->locale(app()->getLocale())->isoFormat('LL') }}</time>
                    <span aria-hidden="true">·</span>
                    <span>{{ __('site.blog.min_read', ['count' => $post->reading_minutes]) }}</span>
                </div>
                <h1 class="mt-5 text-4xl leading-[1.1] font-bold md:text-[3.25rem]">{{ $post->t('title') }}</h1>
                @if (has_text($post->excerpt))<p class="lead mt-6 max-w-3xl">{{ $post->t('excerpt') }}</p>@endif
                <div class="mt-8 flex items-center gap-3">
                    <span class="grid size-10 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-line"><img src="{{ asset('images/brand/mark.png') }}" alt="" class="size-7"></span>
                    <span class="text-sm font-semibold">{{ $post->author_name ?: setting('general.site_name', 'FinPay Africa') }}</span>
                </div>
            </div>
        </header>

        @if ($post->cover)
            <div class="container-site -mb-4 max-w-5xl pt-10">
                <img src="{{ $post->cover->url('md') }}" @if ($post->cover->srcset()) srcset="{{ $post->cover->srcset() }}" sizes="(min-width: 1024px) 1000px, 100vw" @endif
                     alt="{{ $post->cover->t('alt') }}" class="w-full rounded-[22px] border border-line shadow-[var(--shadow-lift)]" fetchpriority="high">
            </div>
        @endif

        <div class="container-site grid max-w-5xl gap-12 py-14 md:py-20 lg:grid-cols-[1fr_200px]">
            <div class="prose-fp min-w-0">{!! $post->t('body') !!}</div>
            <aside class="lg:sticky lg:top-28 lg:self-start">
                <p class="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{{ __('site.blog.share') }}</p>
                @php $u = urlencode($post->publicUrl()); $tt = urlencode($post->t('title')); @endphp
                <div class="mt-3 flex gap-2" x-data="copyLink">
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ $u }}" target="_blank" rel="noopener" class="grid size-10 place-items-center rounded-full border border-line hover:border-ink/30" aria-label="LinkedIn">{!! icon('brand-linkedin', 'icon size-4') !!}</a>
                    <a href="https://x.com/intent/post?url={{ $u }}&text={{ $tt }}" target="_blank" rel="noopener" class="grid size-10 place-items-center rounded-full border border-line hover:border-ink/30" aria-label="X">{!! icon('brand-x', 'icon size-4') !!}</a>
                    <button type="button" @click="copy" class="grid size-10 place-items-center rounded-full border border-line hover:border-ink/30" :aria-label="copied ? '{{ __('site.blog.copied') }}' : '{{ __('site.blog.copy_link') }}'">
                        <span x-show="!copied">{!! icon('link-2', 'icon size-4') !!}</span><span x-show="copied" x-cloak class="text-success-600">{!! icon('check', 'icon size-4', 2.5) !!}</span>
                    </button>
                </div>
                <a href="{{ href('/blog') }}" class="link-arrow mt-8 text-sm">← {{ __('site.blog.title') }}</a>
            </aside>
        </div>
    </article>

    @if ($related->isNotEmpty())
        <section class="section border-t border-line bg-surface">
            <div class="container-site">
                <h2 class="h-section">{{ __('site.blog.related') }}</h2>
                <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    @foreach ($related as $r)@include('site.blog._card', ['post' => $r])@endforeach
                </div>
            </div>
        </section>
    @endif
@endsection
