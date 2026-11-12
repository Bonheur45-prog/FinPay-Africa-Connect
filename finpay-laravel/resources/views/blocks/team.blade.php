@php $members = \App\Models\TeamMember::published()->where('show_on_contact', true)->with('photo')->get(); @endphp
@if ($members->isNotEmpty())
    <section class="section bg-surface">
        <div class="container-site">
            @include('blocks._heading', ['d' => $d])
            <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                @foreach ($members as $m)
                    <article class="card flex flex-col p-7" data-reveal>
                        <div class="flex items-center gap-4">
                            @if ($m->photo)
                                <img src="{{ $m->photo->url('sm') }}" alt="{{ $m->name }}" class="size-14 rounded-full object-cover" loading="lazy">
                            @else
                                <span class="grid size-14 place-items-center rounded-full bg-gradient-to-br from-navy-800 to-navy-950 font-display text-lg font-bold text-white ring-4 ring-brand-50">{{ $m->initials() }}</span>
                            @endif
                            <div>
                                <h3 class="text-[17px] font-semibold">{{ $m->name }}</h3>
                                <p class="text-sm text-brand-600">{{ $m->t('role') }}</p>
                            </div>
                        </div>
                        <ul class="mt-6 space-y-3 border-t border-line pt-5 text-[14.5px]">
                            @if (has_text($m->location))
                                <li class="flex items-center gap-3 text-muted">{!! icon('map-pin', 'icon size-4 text-ink/50') !!}{{ $m->t('location') }}</li>
                            @endif
                            @if ($m->email)
                                <li><a href="mailto:{{ $m->email }}" class="flex items-center gap-3 break-all text-ink hover:text-brand-600">{!! icon('mail', 'icon size-4 text-ink/50') !!}{{ $m->email }}</a></li>
                            @endif
                            @if ($m->phone)
                                <li><a href="{{ $m->telHref() }}" class="flex items-center gap-3 text-ink hover:text-brand-600">{!! icon('phone', 'icon size-4 text-ink/50') !!}{{ $m->phone }}</a></li>
                            @endif
                            @if (has_text($m->availability))
                                <li class="flex items-center gap-3 text-muted">{!! icon('clock', 'icon size-4 text-ink/50') !!}{{ $m->t('availability') }}</li>
                            @endif
                        </ul>
                    </article>
                @endforeach
            </div>
        </div>
    </section>
@endif
