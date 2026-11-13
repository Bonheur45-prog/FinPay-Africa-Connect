@props(['name', 'label' => null, 'options' => [], 'value' => null, 'help' => null, 'placeholder' => null])
@php $dot = str_replace(['[', ']'], ['.', ''], $name); $v = (string) old($dot, $value); @endphp
<div {{ $attributes }}>
    @if ($label)<label class="a-label" for="f_{{ $dot }}">{{ $label }}</label>@endif
    <select id="f_{{ $dot }}" name="{{ $name }}" @class(['a-input', 'is-invalid' => $errors->has($dot)])>
        @if ($placeholder !== null)<option value="">{{ $placeholder }}</option>@endif
        @foreach ($options as $k => $l)<option value="{{ $k }}" @selected($v === (string) $k)>{{ $l }}</option>@endforeach
    </select>
    @error($dot)<p class="a-error">{{ $message }}</p>@enderror
    @if ($help)<p class="a-help">{{ $help }}</p>@endif
</div>
