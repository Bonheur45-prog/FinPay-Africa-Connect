@props(['name', 'label' => null, 'media' => null, 'help' => null, 'any' => false])
<div {{ $attributes }}>
    @if ($label)<p class="a-label">{{ $label }}</p>@endif
    <div data-media-input data-name="{{ $name }}" data-value="{{ old($name, $media?->id) }}" data-url="{{ $media?->url('sm') }}" @if ($any) data-any="1" @endif></div>
    @error($name)<p class="a-error">{{ $message }}</p>@enderror
    @if ($help)<p class="a-help">{{ $help }}</p>@endif
</div>
