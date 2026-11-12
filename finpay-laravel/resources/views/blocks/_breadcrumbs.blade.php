@if (! empty($breadcrumbs))
    <nav aria-label="{{ __('site.nav.breadcrumb') }}" class="mb-8 text-sm">
        <ol class="flex flex-wrap items-center gap-1.5 {{ $dark ?? false ? 'text-slate-400' : 'text-muted' }}">
            <li><a href="{{ href('/') }}" class="hover:text-brand-600">{{ __('site.nav.home') }}</a></li>
            @foreach ($breadcrumbs as [$label, $url])
                <li aria-hidden="true">{!! icon('chevron-right', 'icon size-3.5 opacity-60') !!}</li>
                <li>
                    @if ($url)
                        <a href="{{ $url }}" class="hover:text-brand-600">{{ $label }}</a>
                    @else
                        <span aria-current="page" class="font-medium {{ $dark ?? false ? 'text-white' : 'text-ink' }}">{{ \Illuminate\Support\Str::limit($label, 60) }}</span>
                    @endif
                </li>
            @endforeach
        </ol>
    </nav>
@endif
