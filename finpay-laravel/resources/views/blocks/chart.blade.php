@php
    $items = $d['items'] ?? [];
    $max = max(1, ...array_map(fn ($i) => (float) ($i['value'] ?? 0), $items ?: [['value' => 1]]));
    $unit = $d['unit'] ?? '';
@endphp
<section class="section bg-white">
    <div class="container-site grid items-start gap-14 lg:grid-cols-2">
        <div>
            @include('blocks._heading', ['d' => $d])
            @if (! empty($d['points']))
                <ul class="mt-10 space-y-6">
                    @foreach ($d['points'] as $p)
                        <li class="flex gap-4" data-reveal>
                            <span class="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-brand-600 text-white">{!! icon('check', 'icon size-4', 2.5) !!}</span>
                            <div>
                                <h3 class="font-semibold">{{ tr($p['title']) }}</h3>
                                @if (has_text($p['body'] ?? null))<p class="mt-1 text-[15px] leading-relaxed text-muted">{{ tr($p['body']) }}</p>@endif
                            </div>
                        </li>
                    @endforeach
                </ul>
            @endif
        </div>
        @if ($items)
            <figure class="card p-7 md:p-9 lg:sticky lg:top-28" data-reveal>
                <div class="space-y-6">
                    @foreach ($items as $item)
                        @php $v = (float) ($item['value'] ?? 0); @endphp
                        <div>
                            <div class="flex items-baseline justify-between gap-4 text-[15px]">
                                <span class="font-medium {{ ! empty($item['highlight']) ? 'text-brand-600' : 'text-ink' }}">{{ tr($item['label']) }}</span>
                                <span class="font-display text-lg font-bold {{ ! empty($item['highlight']) ? 'text-brand-600' : 'text-ink' }}">{{ rtrim(rtrim(number_format($v, 1), '0'), '.') }}{{ $unit }}</span>
                            </div>
                            <div class="mt-2 h-3 overflow-hidden rounded-full bg-surface" role="img" aria-label="{{ tr($item['label']) }}: {{ $v }}{{ $unit }}">
                                <div class="h-full rounded-full {{ ! empty($item['highlight']) ? 'bg-gradient-to-r from-brand-600 to-amber-500' : 'bg-navy-700/70' }}" style="width: {{ round($v / $max * 100, 1) }}%"></div>
                            </div>
                        </div>
                    @endforeach
                </div>
                @if (has_text($d['caption'] ?? null))
                    <figcaption class="mt-7 border-t border-line pt-5 text-sm leading-relaxed text-muted">{{ tr($d['caption']) }}</figcaption>
                @endif
            </figure>
        @endif
    </div>
</section>
