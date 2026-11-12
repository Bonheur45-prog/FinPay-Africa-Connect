@php
    $list = \App\Models\Partner::published()->with('logo')->get()->filter(fn ($p) => has_text($p->description));
    $cats = $list->pluck('category')->unique()->values();
@endphp
<section class="section bg-white" x-data="partnerFilter">
    <div class="container-site">
        @include('blocks._heading', ['d' => $d])
        @if (! empty($d['filters']) && $cats->count() > 1)
            <div class="mt-10 flex flex-wrap gap-2" role="tablist">
                <button type="button" role="tab" @click="active = 'all'" :aria-selected="active === 'all'"
                        :class="active === 'all' ? 'bg-ink text-white border-ink' : 'bg-white text-ink/80 border-line hover:border-ink/30'"
                        class="rounded-full border px-4 py-2 text-sm font-semibold transition">{{ __('site.partners.all') }}</button>
                @foreach ($cats as $c)
                    <button type="button" role="tab" @click="active = '{{ $c }}'" :aria-selected="active === '{{ $c }}'"
                            :class="active === '{{ $c }}' ? 'bg-ink text-white border-ink' : 'bg-white text-ink/80 border-line hover:border-ink/30'"
                            class="rounded-full border px-4 py-2 text-sm font-semibold transition">{{ __('site.partners.categories.'.$c) }}</button>
                @endforeach
            </div>
        @endif
        <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            @foreach ($list as $p)
                <article x-show="show('{{ $p->category }}')" x-transition.opacity class="card card-hover flex flex-col p-7">
                    <div class="flex items-center gap-4">
                        @if ($p->logo)
                            <img src="{{ $p->logo->url() }}" alt="" class="size-12 rounded-xl border border-line object-contain p-1.5" loading="lazy">
                        @else
                            <span class="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 font-display text-[15px] font-bold text-white">{{ $p->initials() }}</span>
                        @endif
                        <div class="min-w-0">
                            <h3 class="truncate text-[17px] font-semibold">{{ $p->name }}</h3>
                            <p class="text-[13px] font-medium text-brand-600">{{ __('site.partners.categories.'.$p->category) }}</p>
                        </div>
                    </div>
                    @if (has_text($p->partnership_type))
                        <p class="mt-5 text-sm font-semibold text-ink">{{ $p->t('partnership_type') }}</p>
                    @endif
                    <p class="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{{ $p->t('description') }}</p>
                    <dl class="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-[13px]">
                        @if ($p->since)
                            <div><dt class="text-muted">{{ __('site.partners.since') }}</dt><dd class="mt-0.5 font-semibold">{{ $p->since }}</dd></div>
                        @endif
                        @if (has_text($p->region))
                            <div><dt class="text-muted">{{ __('site.partners.region') }}</dt><dd class="mt-0.5 font-semibold">{{ $p->t('region') }}</dd></div>
                        @endif
                    </dl>
                </article>
            @endforeach
        </div>
    </div>
</section>
