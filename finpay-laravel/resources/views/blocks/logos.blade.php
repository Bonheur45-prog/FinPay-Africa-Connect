@php $logos = \App\Models\Partner::published()->where('show_in_logo_bar', true)->whereNotNull('logo_id')->with('logo')->get(); @endphp
@if ($logos->isNotEmpty())
    <section class="border-y border-line bg-white py-10">
        <div class="container-site">
            @if (has_text($d['title'] ?? null))
                <p class="text-center text-[13px] font-semibold tracking-[0.14em] text-muted uppercase">{{ tr($d['title']) }}</p>
            @endif
            <ul class="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                @foreach ($logos as $p)
                    <li title="{{ $p->name }}">
                        <img src="{{ $p->logo->url() }}" alt="{{ $p->name }}" loading="lazy"
                             class="h-9 w-auto max-w-[130px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-10">
                    </li>
                @endforeach
            </ul>
        </div>
    </section>
@endif
