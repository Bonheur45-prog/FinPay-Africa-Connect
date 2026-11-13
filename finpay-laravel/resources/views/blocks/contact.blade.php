@php
    $types = \App\Models\Lead::TYPES;
    $initial = old('type', in_array(request('type'), $types, true) ? request('type') : 'general');
    $privacy = \App\Models\Page::where('slug', 'privacy-policy')->where('status', 'published')->first();
    $turnstile = \App\Services\Turnstile::enabled();
    $err = fn ($f) => $errors->has($f) ? 'is-invalid' : '';
    $bgs = array_values(array_filter(array_map(fn ($r) => media($r['image'] ?? null), $d['backgrounds'] ?? [])));
    $nb = count($bgs);
@endphp
<section id="contact-form" class="on-dark relative isolate overflow-hidden bg-navy-950 py-20 md:py-28"
         x-data="bgSlideshow({{ max(1, $nb) }}, 6)">
    {{-- Background slideshow (as on the previous FinPay site) --}}
    @foreach ($bgs as $i => $m)
        <div class="absolute inset-0 -z-20 transition-opacity duration-[1400ms] {{ $i === 0 ? 'opacity-100' : 'opacity-0' }}" :class="active === {{ $i }} ? 'opacity-100 is-active' : 'opacity-0'" aria-hidden="true">
            <img src="{{ $m->url('md') }}" srcset="{{ $m->srcset() }}" sizes="100vw" alt="" loading="{{ $i === 0 ? 'eager' : 'lazy' }}" decoding="async" class="kenburns size-full object-cover">
        </div>
    @endforeach
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950/95 via-navy-950/80 to-brand-800/60" aria-hidden="true"></div>
    @if (! $nb)<div class="bg-grid-dark pointer-events-none absolute inset-0 -z-10"></div>@endif

    <div class="container-site grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {{-- Left: heading + direct channels --}}
        <div class="lg:sticky lg:top-28">
            @include('blocks._heading', ['d' => ['eyebrow' => $d['eyebrow'] ?? null, 'title' => $d['title'] ?? null, 'subtitle' => $d['subtitle'] ?? null]])
            <ul class="mt-10 space-y-4 text-[15px]">
                @if ($e = setting('contact.email'))
                    <li><a href="mailto:{{ $e }}" class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition hover:border-white/25 hover:bg-white/10">
                        <span class="icon-tile size-11">{!! icon('mail', 'icon size-5') !!}</span>
                        <span class="min-w-0"><span class="block text-xs tracking-wider text-slate-400 uppercase">{{ __('site.contact.email') }}</span><span class="block truncate font-medium text-white">{{ $e }}</span></span></a></li>
                @endif
                @if ($p = setting('contact.phone'))
                    <li><a href="tel:{{ preg_replace('/[^\d+]/', '', $p) }}" class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition hover:border-white/25 hover:bg-white/10">
                        <span class="icon-tile size-11">{!! icon('phone', 'icon size-5') !!}</span>
                        <span><span class="block text-xs tracking-wider text-slate-400 uppercase">{{ __('site.contact.phone') }}</span><span class="block font-medium text-white">{{ $p }}@if ($p2 = setting('contact.phone_secondary')) · {{ $p2 }}@endif</span></span></a></li>
                @endif
                @if (has_text(setting('contact.address')))
                    <li class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                        <span class="icon-tile size-11">{!! icon('map-pin', 'icon size-5') !!}</span>
                        <span><span class="block text-xs tracking-wider text-slate-400 uppercase">{{ __('site.contact.office') }}</span><span class="block font-medium text-white">{{ tr(setting('contact.address')) }}@if (has_text(setting('contact.hours'))) <span class="text-slate-400">· {{ tr(setting('contact.hours')) }}</span>@endif</span></span></li>
                @endif
            </ul>
            @if (has_text(setting('contact.response_time')))
                <p class="mt-6 inline-flex items-center gap-2 rounded-full bg-success-600/20 px-4 py-2 text-sm font-medium text-emerald-200 ring-1 ring-emerald-400/30">
                    {!! icon('circle-check', 'icon size-4', 2) !!} {{ tr(setting('contact.response_time')) }}
                </p>
            @endif
        </div>

        {{-- Right: frosted form panel --}}
        <div class="rounded-[24px] border border-white/40 bg-white/[0.94] p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur-xl sm:p-10" x-data="contactForm('{{ $initial }}')">
            @if (session('contact_success'))
                <div class="py-10 text-center" role="status">
                    <span class="mx-auto grid size-16 place-items-center rounded-full bg-success-50 text-success-600">{!! icon('circle-check', 'icon size-8', 2) !!}</span>
                    <h2 class="mt-6 text-2xl font-bold text-ink">{{ __('site.form.success_title') }}</h2>
                    <p class="mx-auto mt-3 max-w-md text-muted">{{ __('site.form.success_text') }}</p>
                    <a href="{{ href('/contact-us') }}#contact-form" class="btn btn-outline mt-8">{{ __('site.form.success_again') }}</a>
                </div>
            @else
                @if (has_text($d['form_title'] ?? null))<h2 class="text-2xl font-bold text-ink">{{ tr($d['form_title']) }}</h2>@endif

                @if (session('contact_error'))
                    <div class="mt-5 flex gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800" role="alert">{!! icon('info', 'icon size-5 shrink-0') !!}{{ session('contact_error') }}</div>
                @elseif ($errors->any())
                    <div class="mt-5 flex gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800" role="alert">{!! icon('info', 'icon size-5 shrink-0') !!}{{ __('site.form.error_fields') }}</div>
                @endif

                <form method="POST" action="{{ route('forms.contact', ['locale' => app()->getLocale()]) }}" class="mt-6 space-y-5" @submit="submit" novalidate>
                    @csrf
                    <input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">

                    <fieldset>
                        <legend class="sr-only">{{ __('site.form.type') }}</legend>
                        <div class="grid grid-cols-3 gap-1 rounded-xl bg-surface p-1 ring-1 ring-line" role="radiogroup">
                            @foreach ($types as $t)
                                <label class="relative cursor-pointer rounded-lg px-2 py-2.5 text-center text-[13px] font-semibold transition sm:text-sm"
                                       :class="type === '{{ $t }}' ? 'bg-white text-brand-700 shadow-[0_1px_3px_rgb(16_24_40/0.12)]' : 'text-ink/60 hover:text-ink'">
                                    <input type="radio" name="type" value="{{ $t }}" x-model="type" class="sr-only" @checked($initial === $t)>
                                    {{ __('site.form.types.'.$t) }}
                                </label>
                            @endforeach
                        </div>
                        @foreach ($types as $t)
                            <p x-show="type === '{{ $t }}'" @if ($initial !== $t) x-cloak @endif class="mt-2.5 flex items-center gap-2 text-[13px] text-muted">{!! icon('info', 'icon size-3.5') !!}{{ __('site.form.type_hints.'.$t) }}</p>
                        @endforeach
                    </fieldset>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label for="cf-first" class="field-label">{{ __('site.form.first_name') }}</label>
                            <input id="cf-first" name="first_name" value="{{ old('first_name') }}" required maxlength="80" autocomplete="given-name" class="field {{ $err('first_name') }}" @error('first_name') aria-invalid="true" @enderror>
                            @error('first_name')<p class="field-error">{{ $message }}</p>@enderror
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

                    <div class="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p class="flex items-start gap-2 text-[13px] text-muted">{!! icon('lock', 'icon mt-0.5 size-3.5') !!}{{ has_text($d['note'] ?? null) ? tr($d['note']) : __('site.form.required_note') }}</p>
                        <button type="submit" class="btn btn-primary shrink-0" :disabled="sending">
                            <span x-show="!sending">{{ __('site.actions.send') }}</span>
                            <span x-show="sending" x-cloak>{{ __('site.actions.sending') }}</span>
                            {!! icon('send', 'icon', 2) !!}
                        </button>
                    </div>
                </form>
            @endif
        </div>
    </div>

    @if ($nb > 1)
        <div class="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
            @foreach ($bgs as $i => $m)
                <span class="h-1.5 rounded-full transition-all duration-500" :class="active === {{ $i }} ? 'w-6 bg-white' : 'w-1.5 bg-white/40'"></span>
            @endforeach
        </div>
    @endif
</section>
