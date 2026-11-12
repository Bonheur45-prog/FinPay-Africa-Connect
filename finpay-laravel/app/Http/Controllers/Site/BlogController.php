<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Page;
use App\Models\Post;
use App\Support\Blocks;
use App\Support\MediaRegistry;
use App\Support\Seo;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request, string $locale)
    {
        $page = Page::where('system_key', 'blog')->first();
        $category = $request->filled('category') ? Category::where('slug', $request->string('category'))->first() : null;

        $posts = Post::live()->with(['category', 'cover'])
            ->when($category, fn ($q) => $q->where('category_id', $category->id))
            ->orderByDesc('featured')->orderByDesc('published_at')
            ->paginate(9)->withQueryString();

        $sections = array_values(array_filter($page?->sections ?? [], fn ($b) => $b['visible'] ?? true));
        app(MediaRegistry::class)->preload(Blocks::mediaIds($sections));

        return view('site.blog.index', [
            'sections' => $sections,
            'posts' => $posts,
            'categories' => Category::whereHas('posts', fn ($q) => $q->live())->orderBy('sort')->get(),
            'activeCategory' => $category,
            'seo' => Seo::make(
                title: tr($page?->meta_title) ?: __('site.blog.title'),
                description: tr($page?->meta_description),
                alternates: fn ($l) => url($l.'/blog'),
                noindex: $posts->currentPage() > 1 || $category !== null,
            ),
            'breadcrumbs' => [[tr($page?->title) ?: __('site.blog.title'), null]],
            'current' => 'blog',
            'editUrl' => auth()->check() && $page ? route('admin.pages.edit', $page) : null,
        ]);
    }

    public function show(string $locale, string $slug)
    {
        $post = Post::with(['category', 'cover'])->where('slug', $slug)->first();
        if (! $post || (! $post->isLive() && ! auth()->check())) {
            abort(404);
        }
        if ($post->isLive() && ! auth()->check()) {
            Post::whereKey($post->id)->increment('views');
        }

        $related = Post::live()->with('cover', 'category')->whereKeyNot($post->id)
            ->when($post->category_id, fn ($q) => $q->orderByRaw('category_id = ? desc', [$post->category_id]))
            ->orderByDesc('published_at')->limit(3)->get();

        $seo = Seo::make(
            title: tr($post->meta_title) ?: tr($post->title),
            description: tr($post->meta_description) ?: tr($post->excerpt),
            image: $post->cover,
            alternates: fn ($l) => $post->publicUrl($l),
            type: 'article',
            jsonLd: [
                '@context' => 'https://schema.org',
                '@type' => 'Article',
                'headline' => tr($post->title),
                'description' => tr($post->excerpt),
                'image' => $post->cover?->url('md'),
                'datePublished' => $post->published_at?->toIso8601String(),
                'dateModified' => $post->updated_at?->toIso8601String(),
                'author' => ['@type' => 'Organization', 'name' => $post->author_name ?: 'FinPay Africa'],
                'publisher' => ['@type' => 'Organization', 'name' => 'FinPay Africa', 'logo' => ['@type' => 'ImageObject', 'url' => asset('images/brand/logo.png')]],
                'mainEntityOfPage' => $post->publicUrl(),
            ],
            noindex: ! $post->isLive(),
        );

        return view('site.blog.show', [
            'post' => $post,
            'related' => $related,
            'seo' => $seo,
            'breadcrumbs' => [[__('site.blog.title'), href('/blog')], [tr($post->title), null]],
            'current' => 'blog',
            'editUrl' => auth()->check() ? route('admin.posts.edit', $post) : null,
        ]);
    }
}
