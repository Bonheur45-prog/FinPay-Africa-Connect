@if (setting('seo.google_analytics_id'))
    @php $cookiePage = \App\Models\Page::where('slug', 'cookies')->where('status', 'published')->first(); @endphp
    <div x-data="cookieConsent" x-cloak x-show="open" x-transition.opacity @open-cookie-settings.window="open = true"
         class="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-md" role="dialog" aria-live="polite" aria-label="Cookies">
        <div class="card p-5 shadow-[var(--shadow-float)]">
            <p class="text-sm leading-relaxed text-ink/80">{{ __('site.cookies.text') }}
                @if ($cookiePage) <a href="{{ $cookiePage->publicUrl() }}" class="font-medium text-brand-600 underline underline-offset-2">{{ __('site.cookies.learn') }}</a> @endif
            </p>
            <div class="mt-4 flex gap-2">
                <button type="button" class="btn btn-primary btn-sm flex-1" @click="decide(true)">{{ __('site.cookies.accept') }}</button>
                <button type="button" class="btn btn-outline btn-sm flex-1" @click="decide(false)">{{ __('site.cookies.decline') }}</button>
            </div>
        </div>
    </div>
@endif
