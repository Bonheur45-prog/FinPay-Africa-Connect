@props(['name', 'label' => null, 'value' => [], 'tall' => false, 'help' => null])
<div {{ $attributes }}>
    @if ($label)
        <p class="a-label">{{ $label }} <span class="lang-pill bg-ink text-white t-fr">FR</span><span class="lang-pill bg-ink text-white t-en">EN</span></p>
    @endif
    @foreach (\App\Support\Locales::ALL as $l)
        @php $id = 'rte_'.str_replace(['[', ']', '.'], '_', $name).'_'.$l; @endphp
        <div class="t-{{ $l }}">
            <textarea id="{{ $id }}" name="{{ $name }}[{{ $l }}]" class="hidden">{{ old($name.'.'.$l, $value[$l] ?? '') }}</textarea>
            <div data-rte data-target="#{{ $id }}" @if ($tall) data-tall @endif></div>
            @error($name.'.'.$l)<p class="a-error">{{ $message }}</p>@enderror
        </div>
    @endforeach
    @if ($help)<p class="a-help">{{ $help }}</p>@endif
</div>
