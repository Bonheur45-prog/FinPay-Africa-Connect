<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Subscriber;
use App\Services\Mailer;
use App\Services\Turnstile;
use App\Support\Locales;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Throwable;

class FormController extends Controller
{
    public function contact(Request $request, string $locale, Turnstile $turnstile, Mailer $mailer)
    {
        $back = href('/contact-us').'#contact-form';

        // Honeypot: bots fill the hidden "website" field. Treat as a failed submission, never as success.
        if (filled($request->input('website'))) {
            return redirect($back)->withInput()->with('contact_error', __('site.form.error_generic'));
        }

        $data = $request->validate([
            'type' => ['required', 'in:'.implode(',', Lead::TYPES)],
            'first_name' => ['required', 'string', 'max:80'],
            'last_name' => ['required', 'string', 'max:80'],
            'email' => ['required', 'email:rfc', 'max:160'],
            'phone' => ['nullable', 'string', 'max:40', 'regex:/^[0-9+()\-\s.]{6,40}$/'],
            'organization' => ['nullable', 'required_if:type,partnership', 'string', 'max:160'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
            'consent' => ['accepted'],
        ], [], [
            'first_name' => __('site.form.first_name'), 'last_name' => __('site.form.last_name'),
            'email' => __('site.form.email'), 'phone' => __('site.form.phone'),
            'organization' => __('site.form.organization'), 'message' => __('site.form.message'),
            'consent' => __('site.form.consent_short'),
        ]);

        if (! $turnstile->verify($request->input('cf-turnstile-response'), $request->ip())) {
            return redirect($back)->withInput()->with('contact_error', __('site.form.error_captcha'));
        }

        try {
            $lead = Lead::create(collect($data)->except('consent')->all() + [
                'locale' => Locales::current(),
                'status' => 'new',
                'source_url' => mb_substr((string) $request->headers->get('referer'), 0, 250),
                'ip' => $request->ip(),
                'user_agent' => mb_substr((string) $request->userAgent(), 0, 250),
            ]);
        } catch (Throwable $e) {
            report($e);

            return redirect($back)->withInput()->with('contact_error', __('site.form.error_generic'));
        }

        $to = setting('contact.notify_email') ?: config('services.brevo.notify_to') ?: setting('contact.email');
        if ($to) {
            $sent = $mailer->send(
                $to,
                '[FinPay Africa] '.__('site.form.types.'.$lead->type, [], 'en').' — '.$lead->fullName(),
                view('emails.lead', ['lead' => $lead])->render(),
                $lead->email,
                $lead->fullName(),
            );
            $lead->forceFill(['email_sent' => $sent])->saveQuietly();
        }

        // The enquiry is stored in the CMS inbox, so the team will see it even if the notification email failed.
        return redirect($back)->with('contact_success', true);
    }

    public function newsletter(Request $request, string $locale)
    {
        $back = url()->previous().'#newsletter';
        if (filled($request->input('website'))) {
            return redirect($back)->with('newsletter_error', __('site.form.error_generic'));
        }
        $validator = validator($request->all(), ['email' => ['required', 'email:rfc', 'max:160']]);
        if ($validator->fails()) {
            return redirect($back)->with('newsletter_error', __('site.newsletter.invalid'))->withInput();
        }

        try {
            $email = Str::lower(trim($request->string('email')));
            $sub = Subscriber::firstOrNew(['email' => $email]);
            $already = $sub->exists && $sub->status === 'active';
            $sub->fill([
                'locale' => Locales::current(),
                'status' => 'active',
                'unsubscribed_at' => null,
                'ip' => $request->ip(),
            ]);
            $sub->token ??= Str::random(48);
            $sub->save();
        } catch (Throwable $e) {
            report($e);

            return redirect($back)->with('newsletter_error', __('site.form.error_generic'));
        }

        return redirect($back)->with('newsletter_success', $already ? __('site.newsletter.already') : __('site.newsletter.success'));
    }

    public function unsubscribe(string $token)
    {
        $sub = Subscriber::where('token', $token)->first();
        app()->setLocale($sub?->locale ?: Locales::DEFAULT);
        if ($sub && $sub->status !== 'unsubscribed') {
            $sub->update(['status' => 'unsubscribed', 'unsubscribed_at' => now()]);
        }

        return response()->view('site.unsubscribed', ['found' => (bool) $sub], $sub ? 200 : 404);
    }
}
