@extends('site.layout')

@section('content')
    @foreach ($sections as $block)
        @include('blocks.'.$block['type'], ['b' => $block, 'd' => $block['data'] ?? [], 'first' => $loop->first, 'breadcrumbs' => $loop->first ? $breadcrumbs : []])
    @endforeach

    <section class="section bg-white">
        <div class="container-site">
            @if ($categories->isNotEmpty())
                <nav class="mb-12 flex flex-wrap gap-2" aria-label="Categories">
                    <a href="{{ href('/blog') }}" @class(['rounded-full border px-4 py-2 text-sm font-semibold transition',
                        'border-ink bg-ink text-white' => ! $activeCategory, 'border-line hover:border-ink/30' => $activeCategory])>{{ __('site.blog.all') }}</a>
                    @foreach ($categories as $c)
                        <a href="{{ href('/blog') }}?category={{ $c->slug }}" @class(['rounded-full border px-4 py-2 text-sm font-semibold transition',
                            'border-ink bg-ink text-white' => $activeCategory?->id === $c->id, 'border-line hover:border-ink/30' => $activeCategory?->id !== $c->id])>{{ $c->t('name') }}</a>
                    @endforeach
                </nav>
            @endif

            @if ($posts->isEmpty())
                <div class="card mx-auto max-w-xl p-12 text-center">
                    <span class="icon-tile mx-auto">{!! icon('newspaper', 'icon') !!}</span>
                    <p class="mt-5 text-muted">{{ __('site.blog.empty') }}</p>
                </div>
            @else
                @php $lead = $posts->onFirstPage() && ! $activeCategory ? $posts->first() : null; @endphp
                @if ($lead)
                    <article class="card card-hover group relative mb-10 grid overflow-hidden lg:grid-cols-2">
                        <div class="aspect-[16/10] overflow-hidden bg-navy-900 lg:aspect-auto">
                            @if ($lead->cover)<img src="{{ $lead->cover->url('md') }}" alt="" class="size-full object-cover transition duration-700 group-hover:scale-[1.03]">@endif
                        </div>
                        <div class="flex flex-col justify-center p-8 md:p-12">
                            <div class="flex items-center gap-3 text-[13px] text-muted">
                                <span class="pill-tag">{{ $lead->featured ? __('site.blog.featured') : ($lead->category?->t('name') ?? __('site.blog.title')) }}</span>
                                <time datetime="{{ $lead->published_at?->toDateString() }}">{{ $lead->published_at?->locale(app()->getLocale())->isoFormat('LL') }}</time>
                            </div>
                            <h2 class="mt-4 text-2xl leading-tight font-bold md:text-3xl">
                                <a href="{{ $lead->publicUrl() }}" class="after:absolute after:inset-0 hover:text-brand-600">{{ $lead->t('title') }}</a>
                            </h2>
                            <p class="mt-4 leading-relaxed text-muted">{{ $lead->t('excerpt') }}</p>
                            <span class="link-arrow mt-7">{{ __('site.actions.read_more') }} {!! icon('arrow-right') !!}</span>
                        </div>
                    </article>
                @endif
                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    @foreach ($posts as $post)
                        @continue($lead && $post->is($lead))
                        @include('site.blog._card', ['post' => $post])
                    @endforeach
                </div>
                <div class="mt-12">{{ $posts->links('site.partials.pagination') }}</div>
            @endif
        </div>
    </section>
@endsection
