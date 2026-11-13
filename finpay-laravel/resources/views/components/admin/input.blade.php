@props(['name', 'label' => null, 'value' => null, 'type' => 'text', 't' => false, 'help' => null, 'rows' => 3, 'required' => false, 'placeholder' => null, 'attrs' => ''])
@php
    $dot = str_replace(['[', ']'], ['.', ''], $name);
    $id = 'f_'.str_replace(['.', '[', ']'], '_', $name);
@endphp
<div {{ $attributes }}>
    @if ($label)
        <label class="a-label" for="{{ $id }}{{ $t ? '_fr' : '' }}">{{ $label }}
            @if ($required)<span class="text-brand-600">*</span>@endif
            @if ($t)<span class="lang-pill bg-ink text-white t-fr">FR</span><span class="lang-pill bg-ink text-white t-en">EN</span>@endif
        </label>
    @endif
    @if ($t)
        @foreach (\App\Support\Locales::ALL as $l)
            @php $v = old($dot.'.'.$l, is_array($value) ? ($value[$l] ?? '') : ($l === 'fr' ? $value : '')); @endphp
            @if ($type === 'textarea')
                <textarea id="{{ $id }}_{{ $l }}" name="{{ $name }}[{{ $l }}]" rows="{{ $rows }}" placeholder="{{ $placeholder }}" @class(['a-input t-'.$l, 'is-invalid' => $errors->has($dot.'.'.$l)]) {!! $attrs !!}>{{ $v }}</textarea>
            @else
                <input id="{{ $id }}_{{ $l }}" type="{{ $type }}" name="{{ $name }}[{{ $l }}]" value="{{ $v }}" placeholder="{{ $placeholder }}" @class(['a-input t-'.$l, 'is-invalid' => $errors->has($dot.'.'.$l)]) {!! $attrs !!}>
            @endif
            @error($dot.'.'.$l)<p class="a-error t-{{ $l }}">{{ $message }}</p>@enderror
        @endforeach
    @else
        @php $v = old($dot, $value); @endphp
        @if ($type === 'textarea')
            <textarea id="{{ $id }}" name="{{ $name }}" rows="{{ $rows }}" placeholder="{{ $placeholder }}" @class(['a-input', 'is-invalid' => $errors->has($dot)]) @required($required) {!! $attrs !!}>{{ $v }}</textarea>
        @else
            <input id="{{ $id }}" type="{{ $type }}" name="{{ $name }}" value="{{ $type === 'password' ? '' : $v }}" placeholder="{{ $placeholder }}" @class(['a-input', 'is-invalid' => $errors->has($dot)]) @required($required) {!! $attrs !!}>
        @endif
        @error($dot)<p class="a-error">{{ $message }}</p>@enderror
    @endif
    @if ($help)<p class="a-help">{{ $help }}</p>@endif
</div>
