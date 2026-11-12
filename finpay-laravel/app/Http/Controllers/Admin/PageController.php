<?php

namespace App\Http\Controllers\Admin;

use App\Models\Page;
use App\Support\Blocks;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PageController extends AdminController
{
    public function index()
    {
        return view('admin.pages.index', [
            'system' => Page::whereNotNull('system_key')->orderBy('id')->get(),
            'custom' => Page::whereNull('system_key')->orderBy('slug')->get(),
        ]);
    }

    public function create()
    {
        $hero = Blocks::blank('hero');
        $hero['data']['variant'] = 'centered';
        $sections = [$hero, Blocks::blank('rich_text')];

        return view('admin.pages.form', ['page' => new Page(['status' => 'draft'])] + $this->editorPayload($sections));
    }

    public function store(Request $request)
    {
        $page = new Page;
        $this->save($request, $page);

        return redirect()->route('admin.pages.edit', $page)->with('status', 'Page created.');
    }

    public function edit(Page $page)
    {
        return view('admin.pages.form', ['page' => $page] + $this->editorPayload($page->sections ?? []));
    }

    public function update(Request $request, Page $page)
    {
        $this->save($request, $page);

        return back()->with('status', 'Page saved.');
    }

    public function duplicate(Page $page)
    {
        $copy = $page->replicate(['system_key']);
        $copy->slug = $this->uniqueSlug(Page::class, $page->slug.'-copy');
        $copy->status = 'draft';
        $copy->title = collect($page->title)->map(fn ($t) => $t ? $t.' (copy)' : $t)->all();
        $copy->save();

        return redirect()->route('admin.pages.edit', $copy)->with('status', 'Page duplicated as a draft.');
    }

    public function destroy(Page $page)
    {
        abort_if($page->isSystem(), 403, 'Core pages cannot be deleted. Set them to draft instead.');
        $page->delete();

        return redirect()->route('admin.pages.index')->with('status', 'Page moved to the trash.');
    }

    private function save(Request $request, Page $page): void
    {
        $request->validate($this->tRules('title', true, 160) + $this->tRules('meta_title', false, 160) + $this->tRules('meta_description', false, 300) + [
            'slug' => [$page->isSystem() ? 'nullable' : 'required', 'string', 'max:80', 'regex:/^[a-z0-9\-]+$/',
                Rule::notIn(['admin', 'blog', 'solutions', 'about', 'partners', 'investors', 'contact-us', 'contact', 'newsletter', 'media', 'build']),
                Rule::unique('pages', 'slug')->ignore($page->id)],
            'status' => ['required', 'in:draft,published'],
            'sections' => ['required', 'json'],
            'og_image_id' => ['nullable', 'integer', 'exists:media,id'],
        ], ['slug.regex' => 'The URL may only contain lowercase letters, numbers and dashes.', 'slug.not_in' => 'This URL is reserved by the website.']);

        if ($page->isSystem() && $page->system_key === 'home' && $request->input('status') === 'draft') {
            $request->merge(['status' => 'published']);
        }

        $page->fill([
            'title' => $this->tValue($request, 'title'),
            'meta_title' => $this->tValue($request, 'meta_title'),
            'meta_description' => $this->tValue($request, 'meta_description'),
            'og_image_id' => $request->input('og_image_id') ?: null,
            'status' => $request->input('status'),
            'show_in_footer' => $request->boolean('show_in_footer'),
            'sections' => Blocks::sanitize($request->input('sections')),
            'updated_by' => $request->user()->id,
        ]);
        if (! $page->isSystem()) {
            $page->slug = $request->input('slug');
        }
        $page->save();
    }
}
