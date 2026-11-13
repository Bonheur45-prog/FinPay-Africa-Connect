{{-- Shared section heading. Params: $d (data), $center (bool), $dark (bool) --}}
@php $center ??= false; @endphp
@if (has_text($d['eyebrow'] ?? null) || has_text($d['title'] ?? null) || has_text($d['subtitle'] ?? null))
    <div @class(['max-w-3xl', 'mx-auto text-center' => $center]) data-reveal>
        @if (has_text($d['eyebrow'] ?? null))
            <p @class(['eyebrow', 'justify-center' => $center])>{{ tr($d['eyebrow']) }}</p>
        @endif
        @if (has_text($d['title'] ?? null))
            <h2 class="h-section mt-4">{{ tr($d['title']) }}</h2>
        @endif
        @if (has_text($d['subtitle'] ?? null))
            <p class="lead mt-5">{{ tr($d['subtitle']) }}</p>
        @endif
    </div>
@endif
