<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Solution;
use App\Support\Blocks;
use App\Support\MediaRegistry;
use App\Support\Seo;

class PageController extends Controller
{
    public function home(string $locale)
    {
        return $this->renderPage($this->findSystem('home'), $locale);
    }

    public function system(string $locale, string $key)
    {
        return $this->renderPage($this->findSystem($key), $locale);
    }

    public function custom(string $locale, string $slug)
    {
        $page = Page::where('slug', $slug)->whereNull('system_key')->where('status', 'published')->first()
            ?? $this->preview(Page::where('slug', $slug)->whereNull('system_key')->first());

        return $this->renderPage($page ?? abort(404), $locale);
    }

    public function solution(string $locale, string $slug)
    {
        $solution = Solution::where('slug', $slug)->first();
        if (! $solution || ($solution->status !== 'published' && ! $this->canPreview())) {
            abort(404);
        }
        $sections = $this->visible($solution->sections);
        app(MediaRegistry::class)->preload([...Blocks::mediaIds($sections), $solution->image_id]);

        $seo = Seo::make(
            title: tr($solution->meta_title) ?: tr($solution->title),
            description: tr($solution->meta_description) ?: tr($solution->summary),
            image: media($solution->image_id),
            alternates: fn ($l) => $solution->publicUrl($l),
        );

        return view('site.page', [
            'sections' => $sections,
            'seo' => $seo,
            'breadcrumbs' => [[__('site.nav.solutions'), href('/solutions')], [tr($solution->title), null]],
            'current' => 'solutions',
            'editUrl' => auth()->check() ? route('admin.solutions.edit', $solution) : null,
        ]);
    }

    private function findSystem(string $key): Page
    {
        $page = Page::where('system_key', $key)->first();
        if (! $page || ($page->status !== 'published' && ! $this->canPreview())) {
            abort(404);
        }

        return $page;
    }

    private function renderPage(Page $page, string $locale)
    {
        $sections = $this->visible($page->sections);
        app(MediaRegistry::class)->preload([...Blocks::mediaIds($sections), $page->og_image_id]);

        $seo = Seo::make(
            title: tr($page->meta_title) ?: tr($page->title),
            description: tr($page->meta_description),
            image: media($page->og_image_id),
            alternates: fn ($l) => $page->publicUrl($l),
            isHome: $page->system_key === 'home',
        );

        return view('site.page', [
            'sections' => $sections,
            'seo' => $seo,
            'page' => $page,
            'breadcrumbs' => in_array($page->system_key, ['home', null], true) && $page->system_key === 'home' ? [] : [[tr($page->title), null]],
            'current' => $page->system_key ?? $page->slug,
            'editUrl' => auth()->check() ? route('admin.pages.edit', $page) : null,
        ]);
    }

    private function visible(?array $sections): array
    {
        return array_values(array_filter($sections ?? [], fn ($b) => ($b['visible'] ?? true)
            && view()->exists('blocks.'.($b['type'] ?? ''))));
    }

    private function canPreview(): bool
    {
        return auth()->check();
    }

    private function preview(?Page $page): ?Page
    {
        return $page && $this->canPreview() ? $page : null;
    }
}
