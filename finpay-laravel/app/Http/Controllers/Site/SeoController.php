<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Post;
use App\Models\Solution;
use App\Support\Locales;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    public function sitemap()
    {
        $urls = [];
        $add = function (callable $urlFor, $lastmod) use (&$urls) {
            $alts = [];
            foreach (Locales::ALL as $l) {
                $alts[$l] = $urlFor($l);
            }
            foreach ($alts as $l => $u) {
                $urls[] = ['loc' => $u, 'lastmod' => $lastmod, 'alternates' => $alts];
            }
        };

        foreach (Page::where('status', 'published')->get() as $p) {
            $add(fn ($l) => $p->publicUrl($l), $p->updated_at);
        }
        foreach (Solution::published()->get() as $s) {
            $add(fn ($l) => $s->publicUrl($l), $s->updated_at);
        }
        foreach (Post::live()->get() as $p) {
            $add(fn ($l) => $p->publicUrl($l), $p->updated_at);
        }

        return response()->view('site.sitemap', ['urls' => $urls])->header('Content-Type', 'application/xml');
    }

    public function robots()
    {
        $body = "User-agent: *\nDisallow: /admin\nAllow: /\n\nSitemap: ".route('sitemap')."\n";

        return response($body, 200, ['Content-Type' => 'text/plain']);
    }

    public function fallback(Request $request)
    {
        $first = $request->segment(1);
        app()->setLocale(in_array($first, Locales::ALL, true) ? $first : Locales::DEFAULT);

        abort(404);
    }
}
