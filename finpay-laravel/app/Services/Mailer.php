<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

/**
 * Transactional email. Uses the Brevo HTTP API when BREVO_API_KEY is set
 * (works on OVH shared hosting, where outgoing SMTP ports can be blocked);
 * otherwise falls back to Laravel's configured mailer (MAIL_MAILER).
 * Returns true only when the provider accepted the message.
 */
class Mailer
{
    public function send(string $to, string $subject, string $html, ?string $replyTo = null, ?string $replyName = null): bool
    {
        $fromEmail = (string) config('mail.from.address');
        $fromName = (string) config('mail.from.name');

        try {
            if ($key = config('services.brevo.key')) {
                $payload = [
                    'sender' => ['email' => $fromEmail, 'name' => $fromName],
                    'to' => [['email' => $to]],
                    'subject' => $subject,
                    'htmlContent' => $html,
                ];
                if ($replyTo) {
                    $payload['replyTo'] = array_filter(['email' => $replyTo, 'name' => $replyName]);
                }
                $res = Http::withHeaders(['api-key' => $key, 'accept' => 'application/json'])
                    ->timeout(12)->post('https://api.brevo.com/v3/smtp/email', $payload);
                if (! $res->successful()) {
                    Log::warning('Brevo send failed', ['status' => $res->status(), 'body' => $res->body()]);
                }

                return $res->successful();
            }

            Mail::html($html, function ($m) use ($to, $subject, $replyTo, $replyName) {
                $m->to($to)->subject($subject);
                if ($replyTo) {
                    $m->replyTo($replyTo, $replyName);
                }
            });

            return config('mail.default') !== 'log';
        } catch (Throwable $e) {
            Log::error('Email send failed: '.$e->getMessage());

            return false;
        }
    }
}
