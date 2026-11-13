@if ($paginator->hasPages())
    <nav class="flex items-center justify-center gap-2" aria-label="Pagination">
        @if ($paginator->onFirstPage())
            <span class="btn btn-outline btn-sm opacity-40">←</span>
        @else
            <a href="{{ $paginator->previousPageUrl() }}" rel="prev" class="btn btn-outline btn-sm">←</a>
        @endif
        @foreach ($elements as $element)
            @if (is_string($element))<span class="px-2 text-muted">{{ $element }}</span>@endif
            @if (is_array($element))
                @foreach ($element as $page => $url)
                    <a href="{{ $url }}" @if ($page == $paginator->currentPage()) aria-current="page" @endif
                       class="grid size-10 place-items-center rounded-full text-sm font-semibold {{ $page == $paginator->currentPage() ? 'bg-ink text-white' : 'hover:bg-surface' }}">{{ $page }}</a>
                @endforeach
            @endif
        @endforeach
        @if ($paginator->hasMorePages())
            <a href="{{ $paginator->nextPageUrl() }}" rel="next" class="btn btn-outline btn-sm">→</a>
        @else
            <span class="btn btn-outline btn-sm opacity-40">→</span>
        @endif
    </nav>
@endif
