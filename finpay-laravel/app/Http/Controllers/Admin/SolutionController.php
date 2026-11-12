<?php

namespace App\Http\Controllers\Admin;

use App\Models\Solution;
use App\Support\Blocks;
use App\Support\Icons;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SolutionController extends AdminController
{
    public function index()
    {
        return view('admin.solutions.index', ['solutions' => Solution::orderBy('sort')->orderBy('id')->get()]);
    }

    public function create()
    {
        $sections = [Blocks::blank('hero'), Blocks::blank('stats'), Blocks::blank('features'), Blocks::blank('cta')];

        return view('admin.solutions.form', ['solution' => new Solution(['status' => 'draft', 'icon' => 'layers']), 'icons' => Icons::names()] + $this->editorPayload($sections));
    }

    public function store(Request $request)
    {
        $s = new Solution(['sort' => (int) Solution::max('sort') + 1]);
        $this->save($request, $s);

        return redirect()->route('admin.solutions.edit', $s)->with('status', 'Solution created.');
    }

    public function edit(Solution $solution)
    {
        return view('admin.solutions.form', ['solution' => $solution, 'icons' => Icons::names()] + $this->editorPayload($solution->sections ?? []));
    }

    public function update(Request $request, Solution $solution)
    {
        $this->save($request, $solution);

        return back()->with('status', 'Solution saved.');
    }

    public function reorder(Request $request)
    {
        $ids = $request->validate(['ids' => ['required', 'array'], 'ids.*' => ['integer']])['ids'];
        foreach ($ids as $i => $id) {
            Solution::whereKey($id)->update(['sort' => $i]);
        }

        return back()->with('status', 'Order saved.');
    }

    public function destroy(Solution $solution)
    {
        $solution->delete();

        return redirect()->route('admin.solutions.index')->with('status', 'Solution moved to the trash.');
    }

    private function save(Request $request, Solution $s): void
    {
        $request->validate($this->tRules('title', true, 120) + $this->tRules('tag', false, 40) + $this->tRules('summary', false, 400)
            + $this->tRules('meta_title', false, 160) + $this->tRules('meta_description', false, 300) + [
                'slug' => ['required', 'string', 'max:80', 'regex:/^[a-z0-9\-]+$/', Rule::unique('solutions', 'slug')->ignore($s->id)],
                'icon' => ['required', Rule::in(Icons::names())],
                'status' => ['required', 'in:draft,published'],
                'image_id' => ['nullable', 'integer', 'exists:media,id'],
                'sections' => ['required', 'json'],
            ]);

        $s->fill([
            'slug' => $request->input('slug'),
            'icon' => $request->input('icon'),
            'tag' => $this->tValue($request, 'tag'),
            'title' => $this->tValue($request, 'title'),
            'summary' => $this->tValue($request, 'summary'),
            'meta_title' => $this->tValue($request, 'meta_title'),
            'meta_description' => $this->tValue($request, 'meta_description'),
            'image_id' => $request->input('image_id') ?: null,
            'status' => $request->input('status'),
            'sections' => Blocks::sanitize($request->input('sections')),
            'updated_by' => $request->user()->id,
        ])->save();
    }
}
