@if (! empty($d['items']))
    <section class="section bg-surface">
        <div class="container-site">
            @include('blocks._heading', ['d' => $d, 'center' => true])
            <ol class="relative mx-auto mt-16 max-w-4xl">
                <span class="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-1/2" aria-hidden="true"></span>
                @foreach ($d['items'] as $item)
                    @php $right = $loop->odd; @endphp
                    <li class="relative mb-10 pl-10 last:mb-0 md:grid md:grid-cols-2 md:gap-14 md:pl-0" data-reveal>
                        <span class="absolute top-2 left-0 size-[15px] rounded-full border-[3px] border-white bg-brand-600 ring-1 ring-brand-200 md:left-1/2 md:-translate-x-1/2" aria-hidden="true"></span>
                        <div @class(['md:text-right' => $right, 'md:col-start-2' => ! $right])>
                            <div class="card p-6 {{ $right ? 'md:ml-auto' : '' }} max-w-md">
                                <div class="flex items-center gap-3 {{ $right ? 'md:justify-end' : '' }}">
                                    <span class="font-display text-2xl font-bold text-brand-600">{{ $item['year'] }}</span>
                                    @if (has_text($item['tag'] ?? null))<span class="pill-tag">{{ tr($item['tag']) }}</span>@endif
                                </div>
                                <h3 class="mt-2 text-lg font-semibold">{{ tr($item['title']) }}</h3>
                                @if (has_text($item['body'] ?? null))<p class="mt-2 text-[15px] leading-relaxed text-muted">{{ tr($item['body']) }}</p>@endif
                            </div>
                        </div>
                    </li>
                @endforeach
            </ol>
        </div>
    </section>
@endif
