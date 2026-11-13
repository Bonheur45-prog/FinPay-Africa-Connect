@props(['name', 'label', 'checked' => false, 'help' => null])
<div {{ $attributes }}>
    <input type="hidden" name="{{ $name }}" value="0">
    <label class="flex items-start gap-2.5 text-[13.5px] font-medium">
        <input type="checkbox" name="{{ $name }}" value="1" @checked(old($name, $checked)) class="mt-0.5 size-4 accent-[#8c1a13]">
        <span>{{ $label }} @if ($help)<span class="block text-xs font-normal text-muted">{{ $help }}</span>@endif</span>
    </label>
</div>
