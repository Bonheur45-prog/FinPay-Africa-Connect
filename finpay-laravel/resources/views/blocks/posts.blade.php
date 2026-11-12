@php $latest = \App\Models\Post::live()->with('cover', 'category')->orderByDesc('featured')->orderByDesc('published_at')->limit(max(1, min(12, (int) ($d['count'] ?? 3))))->get(); @endphp
@if ($latest->isNotEmpty())
    <section class="section bg-white">
        <div class="container-site">
            <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                @include('blocks._heading', ['d' => $d])
                @if (! empty($d['cta']['url']) && has_text($d['cta']['label'] ?? null))
                    <a href="{{ href($d['cta']['url']) }}" class="link-arrow shrink-0">{{ tr($d['cta']['label']) }} {!! icon('arrow-right') !!}</a>
                @endif
            </div>
            <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                @foreach ($latest as $post)
                    @include('site.blog._card', ['post' => $post])
                @endforeach
            </div>
        </div>
    </section>
@endif
