@extends('site.layout')

@section('content')
    @foreach ($sections as $block)
        @include('blocks.'.$block['type'], [
            'b' => $block,
            'd' => $block['data'] ?? [],
            'first' => $loop->first,
            'breadcrumbs' => $loop->first ? ($breadcrumbs ?? []) : [],
        ])
    @endforeach
@endsection
