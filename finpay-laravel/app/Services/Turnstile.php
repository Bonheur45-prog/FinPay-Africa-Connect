<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Throwable;

/** Cloudflare Turnstile check. When no secret is configured the check is skipped (honeypot + rate limit still apply). */
class Turnstile
{
    public static function enabled(): bool
    {
        return filled(config('services.turnstile.secret_key')) && filled(config('services.turnstile.site_key'));
    }

    public function verify(?string $token, ?string $ip): bool
    {
        if (! self::enabled()) {
            return true;
        }
        if (! $token) {
            return false;
        }
        try {
            $res = Http::asForm()->timeout(8)->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
                'secret' => config('services.turnstile.secret_key'),
                'response' => $token,
                'remoteip' => $ip,
            ]);

            return (bool) $res->json('success');
        } catch (Throwable) {
            return false;
        }
    }
}
