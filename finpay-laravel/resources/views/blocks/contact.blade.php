@php
    $types = \App\Models\Lead::TYPES;
    $initial = old('type', in_array(request('type'), $types, true) ? request('type') : 'general');
    $privacy = \App\Models\Page::where('slug', 'privacy-policy')->where('status', 'published')->first();
    $turnstile = \App\Services\Turnstile::enabled();
    $err = fn ($f) => $errors->has($f) ? 'is-invalid' : '';
@endphp
<section class="section bg-surface" id="contact-form">
    <div class="container-site grid gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:gap-14">
        <div class="card p-6 sm:p-10" x-data="contactForm('{{ $initial }}')">
            @if (session('contact_success'))
                <div class="py-10 text-center" role="status">
                    <span class="mx-auto grid size-16 place-items-center rounded-full bg-success-50 text-success-600">{!! icon('circle-check', 'icon size-8', 2) !!}</span>
                    <h2 class="mt-6 text-2xl font-bold">{{ __('site.form.success_title') }}</h2>
                    <p class="mx-auto mt-3 max-w-md text-muted">{{ __('site.form.success_text') }}</p>
                    <a href="{{ href('/contact-us') }}#contact-form" class="btn btn-outline mt-8">{{ __('site.form.success_again') }}</a>
                </div>
            @else
                @include('blocks._heading', ['d' => ['eyebrow' => $d['eyebrow'] ?? null, 'title' => $d['form_title'] ?? $d['title'] ?? null, 'subtitle' => $d['subtitle'] ?? null]])

                @if (session('contact_error'))
                    <div class="mt-6 flex gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800" role="alert">{!! icon('info', 'icon size-5 shrink-0') !!}{{ session('contact_error') }}</div>
                @elseif ($errors->any())
                    <div class="mt-6 flex gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800" role="alert">{!! icon('info', 'icon size-5 shrink-0') !!}{{ __('site.form.error_fields') }}</div>
                @endif

                <form method="POST" action="{{ route('forms.contact', ['locale' => app()->getLocale()]) }}" class="mt-8 space-y-6" @submit="submit" novalidate>
                    @csrf
                    <input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">

                    <fieldset>
                        <legend class="field-label">{{ __('site.form.type') }}</legend>
                        <div class="grid gap-3 sm:grid-cols-3">
                            @foreach ($types as $t)
                                <label class="relative flex cursor-pointer flex-col rounded-xl border p-4 transition"
                                       :class="type === '{{ $t }}' ? 'border-brand-500 bg-brand-50/60 ring-4 ring-brand-100' : 'border-line bg-white hover:border-ink/25'">
                                    <input type="radio" name="type" value="{{ $t }}" x-model="type" class="sr-only" @checked($initial === $t)>
                                    <span class="text-[15px] font-semibold">{{ __('site.form.types.'.$t) }}</span>
                                    <span class="mt-1 text-[13px] leading-snug text-muted">{{ __('site.form.type_hints.'.$t) }}</span>
                                </label>
                            @endforeach
                        </div>
                    </fieldset>

                    <div class="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label for="cf-first" class="field-label">{{ __('site.form.first_name') }}</label>
                            <input id="cf-first" name="first_name" value="{{ old('first_name') }}" required maxlength="80" autocomplete="given-name" class="field {{ $err('first_name') }}" @error('first_name') aria-invalid="true" aria-describedby="cf-first-err" @enderror>
                            @error('first_name')<p id="cf-first-err" class="field-error">{{ $message }}</p>@enderror
                        </div>
                        <div>
                            <label for="cf-last" class="field-label">{{ __('site.form.last_name') }}</label>
                            <input id="cf-last" name="last_name" value="{{ old('last_name') }}" required maxlength="80" autocomplete="family-name" class="field {{ $err('last_name') }}" @error('last_name') aria-invalid="true" @enderror>
                            @error('last_name')<p class="field-error">{{ $message }}</p>@enderror
                        </div>
                        <div>
                            <label for="cf-email" class="field-label">{{ __('site.form.email') }}</label>
                            <input id="cf-email" type="email" name="email" value="{{ old('email') }}" required maxlength="160" autocomplete="email" class="field {{ $err('email') }}" @error('email') aria-invalid="true" @enderror>
                            @error('email')<p class="field-error">{{ $message }}</p>@enderror
                        </div>
                        <div>
                            <label for="cf-phone" class="field-label">{{ __('site.form.phone') }} <span class="font-normal text-muted">({{ __('site.form.optional') }})</span></label>
                            <input id="cf-phone" type="tel" name="phone" value="{{ old('phone') }}" maxlength="40" autocomplete="tel" class="field {{ $err('phone') }}">
                            @error('phone')<p class="field-error">{{ $message }}</p>@enderror
                        </div>
                        <div class="sm:col-span-2">
                            <label for="cf-org" class="field-label">{{ __('site.form.organization') }}
                                <span class="font-normal text-muted" x-show="type !== 'partnership'">({{ __('site.form.optional') }})</span></label>
                            <input id="cf-org" name="organization" value="{{ old('organization') }}" maxlength="160" autocomplete="organization" class="field {{ $err('organization') }}" :required="type === 'partnership'">
                            @error('organization')<p class="field-error">{{ $message }}</p>@enderror
                        </div>
                        <div class="sm:col-span-2">
                            <label for="cf-msg" class="field-label">{{ __('site.form.message') }}</label>
                            <textarea id="cf-msg" name="message" rows="5" required minlength="10" maxlength="5000" placeholder="{{ __('site.form.message_placeholder') }}" class="field {{ $err('message') }}">{{ old('message') }}</textarea>
                            @error('message')<p class="field-error">{{ $message }}</p>@enderror
                        </div>
                    </div>

                    <div>
                        <label class="flex items-start gap-3 text-sm leading-relaxed text-muted">
                            <input type="checkbox" name="consent" value="1" required @checked(old('consent')) class="mt-1 size-4 shrink-0 rounded border-line accent-brand-600">
                            <span>{!! __('site.form.consent', ['privacy' => $privacy ? '<a href="'.e($privacy->publicUrl()).'" class="font-medium text-brand-600 underline underline-offset-2">'.e(__('site.form.privacy')).'</a>' : e(__('site.form.privacy'))]) !!}</span>
                        </label>
                        @error('consent')<p class="field-error">{{ $message }}</p>@enderror
                    </div>

                    @if ($turnstile)
                        <div class="cf-turnstile" data-sitekey="{{ config('services.turnstile.site_key') }}" data-language="{{ app()->getLocale() }}"></div>
                        @push('scripts')<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>@endpush
                    @endif

                    <div class="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p class="text-[13px] text-muted">{{ __('site.form.required_note') }}</p>
                        <button type="submit" class="btn btn-primary" :disabled="sending">
                            <span x-show="!sending">{{ __('site.actions.send') }}</span>
                            <span x-show="sending" x-cloak>{{ __('site.actions.sending') }}</span>
                            {!! icon('send', 'icon', 2) !!}
                        </button>
                    </div>
                    @if (has_text($d['note'] ?? null))
                        <p class="flex items-start gap-2 text-[13px] text-muted">{!! icon('lock', 'icon mt-0.5 size-3.5') !!}{{ tr($d['note']) }}</p>
                    @endif
                </form>
            @endif
        </div>

        <aside class="space-y-5">
            <div class="bg-dark-section on-dark relative overflow-hidden rounded-[var(--radius-card)] p-8">
                <h2 class="text-xl font-semibold">{{ setting('general.site_name', 'FinPay Africa') }}</h2>
                @if (has_text(setting('general.tagline')))<p class="mt-1 text-sm text-slate-400">{{ tr(setting('general.tagline')) }}</p>@endif
                <ul class="mt-7 space-y-5 text-[15px]">
                    @if ($e = setting('contact.email'))
                        <li class="flex gap-4"><span class="icon-tile size-10">{!! icon('mail', 'icon size-5') !!}</span>
                            <span><span class="block text-xs text-slate-400 uppercase tracking-wider">{{ __('site.contact.email') }}</span><a href="mailto:{{ $e }}" class="break-all text-white hover:underline">{{ $e }}</a></span></li>
                    @endif
                    @if ($p = setting('contact.phone'))
                        <li class="flex gap-4"><span class="icon-tile size-10">{!! icon('phone', 'icon size-5') !!}</span>
                            <span><span class="block text-xs text-slate-400 uppercase tracking-wider">{{ __('site.contact.phone') }}</span>
                                <a href="tel:{{ preg_replace('/[^\d+]/', '', $p) }}" class="text-white hover:underline">{{ $p }}</a>
                                @if ($p2 = setting('contact.phone_secondary'))<br><a href="tel:{{ preg_replace('/[^\d+]/', '', $p2) }}" class="text-white hover:underline">{{ $p2 }}</a>@endif
                            </span></li>
                    @endif
                    @if (has_text(setting('contact.address')))
                        <li class="flex gap-4"><span class="icon-tile size-10">{!! icon('map-pin', 'icon size-5') !!}</span>
                            <span><span class="block text-xs text-slate-400 uppercase tracking-wider">{{ __('site.contact.office') }}</span><span class="text-white">{{ tr(setting('contact.address')) }}</span></span></li>
                    @endif
                    @if (has_text(setting('contact.hours')))
                        <li class="flex gap-4"><span class="icon-tile size-10">{!! icon('clock', 'icon size-5') !!}</span>
                            <span><span class="block text-xs text-slate-400 uppercase tracking-wider">{{ __('site.contact.hours') }}</span><span class="text-white">{{ tr(setting('contact.hours')) }}</span></span></li>
                    @endif
                </ul>
            </div>
            @if (has_text(setting('contact.response_time')))
                <div class="card flex items-center gap-4 p-6">
                    <span class="grid size-11 place-items-center rounded-full bg-success-50 text-success-600">{!! icon('circle-check', 'icon size-5', 2) !!}</span>
                    <p class="font-semibold">{{ tr(setting('contact.response_time')) }}</p>
                </div>
            @endif
        </aside>
    </div>
</section>
