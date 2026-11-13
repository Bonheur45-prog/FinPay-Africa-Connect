<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PostController extends AdminController
{
    public function index(Request $request)
    {
        $posts = Post::with('category', 'cover')
            ->when($request->filled('q'), fn ($q) => $q->where(fn ($w) => $w->where('title', 'like', '%'.$request->q.'%')->orWhere('slug', 'like', '%'.$request->q.'%')))
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->status))
            ->orderByDesc('published_at')->orderByDesc('id')->paginate(20)->withQueryString();

        return view('admin.posts.index', ['posts' => $posts, 'categories' => Category::orderBy('sort')->withCount('posts')->get()]);
    }

    public function create()
    {
        return view('admin.posts.form', [
            'post' => new Post(['status' => 'draft', 'published_at' => now(), 'author_name' => 'FinPay Africa']),
            'categories' => Category::orderBy('sort')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $post = new Post(['author_id' => $request->user()->id]);
        $this->save($request, $post);

        return redirect()->route('admin.posts.edit', $post)->with('status', 'Article created.');
    }

    public function edit(Post $post)
    {
        return view('admin.posts.form', ['post' => $post, 'categories' => Category::orderBy('sort')->get()]);
    }

    public function update(Request $request, Post $post)
    {
        $this->save($request, $post);

        return back()->with('status', 'Article saved.');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('admin.posts.index')->with('status', 'Article moved to the trash.');
    }

    private function save(Request $request, Post $post): void
    {
        $request->validate($this->tRules('title', true, 200) + $this->tRules('excerpt', false, 500)
            + $this->tRules('meta_title', false, 160) + $this->tRules('meta_description', false, 300) + [
                'body' => ['nullable', 'array'],
                'body.fr' => ['nullable', 'string', 'max:200000'],
                'body.en' => ['nullable', 'string', 'max:200000'],
                'slug' => ['required', 'string', 'max:120', 'regex:/^[a-z0-9\-]+$/', Rule::unique('posts', 'slug')->ignore($post->id)],
                'category_id' => ['nullable', 'integer', 'exists:categories,id'],
                'cover_id' => ['nullable', 'integer', 'exists:media,id'],
                'status' => ['required', 'in:draft,published'],
                'published_at' => ['nullable', 'date'],
                'author_name' => ['nullable', 'string', 'max:120'],
            ], ['slug.regex' => 'The URL may only contain lowercase letters, numbers and dashes.']);

        $body = $this->tValue($request, 'body', true);
        $post->fill([
            'slug' => $request->input('slug'),
            'title' => $this->tValue($request, 'title'),
            'excerpt' => $this->tValue($request, 'excerpt'),
            'body' => $body,
            'meta_title' => $this->tValue($request, 'meta_title'),
            'meta_description' => $this->tValue($request, 'meta_description'),
            'category_id' => $request->input('category_id') ?: null,
            'cover_id' => $request->input('cover_id') ?: null,
            'status' => $request->input('status'),
            'published_at' => $request->input('published_at') ?: ($request->input('status') === 'published' ? now() : null),
            'featured' => $request->boolean('featured'),
            'author_name' => $request->input('author_name'),
            'reading_minutes' => Post::estimateMinutes($body),
        ])->save();
    }
}
