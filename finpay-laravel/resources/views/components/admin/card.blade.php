@props(['title' => null, 'actions' => null, 'pad' => true])
<section {{ $attributes->merge(['class' => 'a-card']) }}>
    @if ($title)
        <div class="a-card-h"><h2 class="a-card-t">{{ $title }}</h2>{{ $actions }}</div>
    @endif
    <div class="{{ $pad ? 'p-5' : '' }}">{{ $slot }}</div>
</section>
