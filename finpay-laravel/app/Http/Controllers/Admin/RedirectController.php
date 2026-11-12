<?php

namespace App\Http\Controllers\Admin;

use App\Models\Redirect;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RedirectController extends AdminController
{
    public function index()
    {
        return view('admin.redirects', ['redirects' => Redirect::orderBy('from_path')->get()]);
    }

    public function store(Request $request)
    {
        $request->merge(['from_path' => Redirect::normalize((string) $request->input('from_path'))]);
        $data = $request->validate([
            'from_path' => ['required', 'max:255', 'unique:redirects,from_path', Rule::notIn(['/', '/admin'])],
            'to_path' => ['required', 'max:500', 'regex:#^(/|https?://)#'],
            'code' => ['required', 'in:301,302'],
        ], ['to_path.regex' => 'The destination must start with / or https://']);
        Redirect::create($data + ['is_active' => true]);

        return back()->with('status', 'Redirect added.');
    }

    public function update(Request $request, Redirect $redirect)
    {
        $redirect->update(['is_active' => $request->boolean('is_active')]);

        return back()->with('status', 'Redirect updated.');
    }

    public function destroy(Redirect $redirect)
    {
        $redirect->delete();

        return back()->with('status', 'Redirect deleted.');
    }
}
