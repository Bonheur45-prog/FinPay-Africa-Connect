@extends('site.layout')
@section('content')
    <section class="section bg-surface">
        <div class="container-site max-w-xl text-center">
            <span class="icon-tile mx-auto">{!! icon($found ? 'mail' : 'info', 'icon') !!}</span>
            <h1 class="mt-6 text-3xl font-bold">{{ $found ? __('site.newsletter.unsubscribed_title') : __('site.newsletter.not_found') }}</h1>
            @if ($found)<p class="mt-3 text-muted">{{ __('site.newsletter.unsubscribed_text') }}</p>@endif
            <a href="{{ href('/') }}" class="btn btn-primary mt-8">{{ __('site.errors.home') }}</a>
        </div>
    </section>
@endsection
