<?php

namespace App\Http\Controllers\Admin;

use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PartnerController extends AdminController
{
    public function index()
    {
        return view('admin.partners.index', ['partners' => Partner::with('logo')->orderBy('sort')->orderBy('id')->get()]);
    }

    public function create()
    {
        return view('admin.partners.form', ['partner' => new Partner(['status' => 'published', 'category' => 'financial'])]);
    }

    public function store(Request $request)
    {
        $p = new Partner(['sort' => (int) Partner::max('sort') + 1]);
        $this->save($request, $p);

        return redirect()->route('admin.partners.index')->with('status', 'Partner added.');
    }

    public function edit(Partner $partner)
    {
        return view('admin.partners.form', ['partner' => $partner]);
    }

    public function update(Request $request, Partner $partner)
    {
        $this->save($request, $partner);

        return redirect()->route('admin.partners.index')->with('status', 'Partner saved.');
    }

    public function destroy(Partner $partner)
    {
        $partner->delete();

        return back()->with('status', 'Partner moved to the trash.');
    }

    private function save(Request $request, Partner $p): void
    {
        $request->validate($this->tRules('partnership_type', false, 120) + $this->tRules('description', false, 800) + $this->tRules('region', false, 120) + [
            'name' => ['required', 'string', 'max:120'],
            'category' => ['required', Rule::in(Partner::CATEGORIES)],
            'since' => ['nullable', 'string', 'max:10'],
            'website' => ['nullable', 'url', 'max:255'],
            'logo_id' => ['nullable', 'integer', 'exists:media,id'],
            'status' => ['required', 'in:draft,published'],
            'sort' => ['nullable', 'integer', 'min:0'],
        ]);
        $p->fill([
            'name' => $request->input('name'),
            'category' => $request->input('category'),
            'partnership_type' => $this->tValue($request, 'partnership_type'),
            'description' => $this->tValue($request, 'description'),
            'region' => $this->tValue($request, 'region'),
            'since' => $request->input('since'),
            'website' => $request->input('website'),
            'logo_id' => $request->input('logo_id') ?: null,
            'show_in_logo_bar' => $request->boolean('show_in_logo_bar'),
            'status' => $request->input('status'),
            'sort' => $request->input('sort', $p->sort ?? 0),
        ])->save();
    }
}
