@php $list = \App\Models\Solution::published()->with('image')->get(); @endphp
@if ($list->isNotEmpty())
    <section class="section bg-white">
        <div class="container-site">
            <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                @include('blocks._heading', ['d' => $d])
                @if (! empty($d['cta']['url']) && has_text($d['cta']['label'] ?? null))
                    <a href="{{ href($d['cta']['url']) }}" class="link-arrow shrink-0">{{ tr($d['cta']['label']) }} {!! icon('arrow-right') !!}</a>
                @endif
            </div>

            <div class="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
                @foreach ($list as $s)
                    @php $wide = $loop->index < 2; @endphp
                    <a href="{{ $s->publicUrl() }}" data-reveal
                       class="card card-hover group flex flex-col overflow-hidden {{ $wide ? 'lg:col-span-3' : 'lg:col-span-2' }}">
                        @if ($wide && $s->image)
                            <div class="relative aspect-[16/8] overflow-hidden bg-navy-900">
                                <img src="{{ $s->image->url('md') }}" alt="" loading="lazy" class="size-full object-cover transition duration-700 group-hover:scale-[1.03]">
                                <div class="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent"></div>
                            </div>
                        @endif
                        <div class="flex flex-1 flex-col p-7">
                            <div class="flex items-center justify-between gap-3">
                                <span class="icon-tile">{!! icon($s->icon, 'icon') !!}</span>
                                @if (has_text($s->tag))<span class="pill-tag">{{ $s->t('tag') }}</span>@endif
                            </div>
                            <h3 class="mt-5 text-xl font-semibold">{{ $s->t('title') }}</h3>
                            <p class="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">{{ $s->t('summary') }}</p>
                            <span class="link-arrow mt-6 text-[15px]">{{ __('site.actions.learn_more') }} {!! icon('arrow-right') !!}</span>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
    </section>
@endif
