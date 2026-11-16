<?php

namespace App\Providers;

use App\Support\MediaRegistry;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->scoped(MediaRegistry::class);
    }

    public function boot(): void
    {
        if (str_starts_with((string) config('app.url'), 'https://')) {
            URL::forceScheme('https');
        }

        RateLimiter::for('forms', fn (Request $r) => [
            Limit::perMinute(5)->by('forms:'.$r->ip()),
            Limit::perDay(40)->by('forms-day:'.$r->ip()),
        ]);
        RateLimiter::for('login', fn (Request $r) => Limit::perMinute(5)->by('login:'.$r->ip().'|'.strtolower((string) $r->input('email'))));
    }
}
