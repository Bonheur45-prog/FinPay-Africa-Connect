{{-- Params: $primary, $secondary (link arrays), $dark (bool), $class --}}
@php
    $hasP = ! empty($primary['url']) && has_text($primary['label'] ?? null);
    $hasS = ! empty($secondary['url']) && has_text($secondary['label'] ?? null);
@endphp
@if ($hasP || $hasS)
    <div class="flex flex-wrap items-center gap-3 {{ $class ?? '' }}">
        @if ($hasP)
            <a href="{{ href($primary['url']) }}" class="btn {{ ($dark ?? false) ? 'btn-light' : 'btn-primary' }}">
                {{ tr($primary['label']) }} {!! icon('arrow-right', 'icon icon-arrow', 2) !!}
            </a>
        @endif
        @if ($hasS)
            <a href="{{ href($secondary['url']) }}" class="btn {{ ($dark ?? false) ? 'btn-ghost-light' : 'btn-outline' }}">{{ tr($secondary['label']) }}</a>
        @endif
    </div>
@endif
