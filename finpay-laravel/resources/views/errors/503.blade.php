@extends('site.layout', ['seo' => \App\Support\Seo::make(title: __('site.errors.500_title'), noindex: true)])
@section('content')
    <section class="relative overflow-hidden bg-surface">
        <div class="bg-grid pointer-events-none absolute inset-0"></div>
        <div class="container-site relative max-w-2xl py-24 text-center md:py-32">
            <p class="font-display text-7xl font-bold text-brand-600">503</p>
            <h1 class="mt-4 text-3xl font-bold md:text-4xl">{{ __('site.errors.500_title') }}</h1>
            <p class="lead mt-4">{{ __('site.errors.500_text') }}</p>
            <a href="{{ href('/') }}" class="btn btn-primary mt-9">{{ __('site.errors.home') }}</a>
        </div>
    </section>
@endsection
