<article class="card card-hover group relative flex flex-col overflow-hidden" data-reveal>
    <a href="{{ $post->publicUrl() }}" class="relative block aspect-[16/9] overflow-hidden bg-navy-900" tabindex="-1" aria-hidden="true">
        @if ($post->cover)
            <img src="{{ $post->cover->url('md') }}" alt="" loading="lazy" class="size-full object-cover transition duration-700 group-hover:scale-[1.03]">
        @else
            <span class="grid size-full place-items-center bg-gradient-to-br from-navy-800 to-brand-800"><img src="{{ asset('images/brand/mark.png') }}" alt="" class="size-14 opacity-80"></span>
        @endif
    </a>
    <div class="flex flex-1 flex-col p-6">
        <div class="flex items-center gap-3 text-[13px] text-muted">
            @if ($post->category)<span class="pill-tag">{{ $post->category->t('name') }}</span>@endif
            <time datetime="{{ $post->published_at?->toDateString() }}">{{ $post->published_at?->locale(app()->getLocale())->isoFormat('LL') }}</time>
        </div>
        <h3 class="mt-3 text-lg leading-snug font-semibold">
            <a href="{{ $post->publicUrl() }}" class="after:absolute after:inset-0 hover:text-brand-600">{{ $post->t('title') }}</a>
        </h3>
        @if (has_text($post->excerpt))<p class="mt-2.5 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted">{{ $post->t('excerpt') }}</p>@endif
        <p class="mt-5 text-[13px] font-medium text-muted">{{ __('site.blog.min_read', ['count' => $post->reading_minutes]) }}</p>
    </div>
</article>
