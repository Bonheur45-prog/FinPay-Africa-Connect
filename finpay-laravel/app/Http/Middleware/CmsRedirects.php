<?php

namespace App\Http\Middleware;

use App\Models\Redirect;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Throwable;

/** Applies redirects managed in the CMS (cached map, cleared whenever a redirect is saved). */
class CmsRedirects
{
    public const CACHE_KEY = 'cms.redirects';

    public function handle(Request $request, Closure $next)
    {
        if ($request->isMethod('GET') && ! $request->is('admin', 'admin/*', 'media/*', 'build/*')) {
            try {
                $map = Cache::rememberForever(self::CACHE_KEY, fn () => Redirect::where('is_active', true)
                    ->get(['id', 'from_path', 'to_path', 'code'])->keyBy('from_path')->map->only(['id', 'to_path', 'code'])->all());
            } catch (Throwable) {
                $map = []; // database not ready (fresh install)
            }
            $path = Redirect::normalize($request->path());
            if (isset($map[$path])) {
                $r = $map[$path];
                Redirect::whereKey($r['id'])->increment('hits');
                $to = str_starts_with($r['to_path'], 'http') ? $r['to_path'] : url($r['to_path']);
                $qs = $request->getQueryString();

                return redirect($to.($qs && ! str_contains($to, '?') ? '?'.$qs : ''), (int) $r['code']);
            }
        }

        return $next($request);
    }
}
