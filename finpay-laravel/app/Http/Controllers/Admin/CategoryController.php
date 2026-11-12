<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends AdminController
{
    public function index()
    {
        return redirect()->route('admin.posts.index');
    }

    public function store(Request $request)
    {
        $request->validate($this->tRules('name', true, 60));
        Category::create([
            'name' => $this->tValue($request, 'name'),
            'slug' => $this->slugFor($request->input('name.fr')),
            'sort' => (int) Category::max('sort') + 1,
        ]);

        return back()->with('status', 'Category added.');
    }

    public function update(Request $request, Category $category)
    {
        $request->validate($this->tRules('name', true, 60) + ['slug' => ['required', 'regex:/^[a-z0-9\-]+$/', Rule::unique('categories', 'slug')->ignore($category->id)]]);
        $category->update(['name' => $this->tValue($request, 'name'), 'slug' => $request->input('slug')]);

        return back()->with('status', 'Category saved.');
    }

    public function destroy(Category $category)
    {
        $category->delete(); // posts keep existing with no category (nullOnDelete)

        return back()->with('status', 'Category deleted. Its articles are now uncategorised.');
    }

    private function slugFor(string $name): string
    {
        $base = \Illuminate\Support\Str::slug($name) ?: 'category';
        $slug = $base;
        $i = 2;
        while (Category::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }
}
