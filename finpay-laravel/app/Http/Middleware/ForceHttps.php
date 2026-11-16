<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/** Redirects to HTTPS only when FORCE_HTTPS is on (set by the deploy once the domain's SSL certificate is valid). */
class ForceHttps
{
    public function handle(Request $request, Closure $next)
    {
        if (config('app.force_https') && ! $request->isSecure() && ! app()->runningUnitTests()) {
            return redirect()->secure($request->getRequestUri(), 301);
        }

        return $next($request);
    }
}
