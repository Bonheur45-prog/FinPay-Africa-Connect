<?php

namespace App\Http\Controllers\Admin;

use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamController extends AdminController
{
    public function index()
    {
        return view('admin.team.index', ['members' => TeamMember::with('photo')->orderBy('sort')->orderBy('id')->get()]);
    }

    public function create()
    {
        return view('admin.team.form', ['member' => new TeamMember(['status' => 'published', 'show_on_contact' => true])]);
    }

    public function store(Request $request)
    {
        $m = new TeamMember(['sort' => (int) TeamMember::max('sort') + 1]);
        $this->save($request, $m);

        return redirect()->route('admin.team.index')->with('status', 'Team member added.');
    }

    public function edit(TeamMember $member)
    {
        return view('admin.team.form', ['member' => $member]);
    }

    public function update(Request $request, TeamMember $member)
    {
        $this->save($request, $member);

        return redirect()->route('admin.team.index')->with('status', 'Team member saved.');
    }

    public function destroy(TeamMember $member)
    {
        $member->delete();

        return back()->with('status', 'Team member moved to the trash.');
    }

    private function save(Request $request, TeamMember $m): void
    {
        $request->validate($this->tRules('role', true, 120) + $this->tRules('location', false, 120) + $this->tRules('availability', false, 120) + [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['nullable', 'email', 'max:160'],
            'phone' => ['nullable', 'string', 'max:40'],
            'photo_id' => ['nullable', 'integer', 'exists:media,id'],
            'status' => ['required', 'in:draft,published'],
            'sort' => ['nullable', 'integer', 'min:0'],
        ]);
        $m->fill([
            'name' => $request->input('name'),
            'role' => $this->tValue($request, 'role'),
            'location' => $this->tValue($request, 'location'),
            'availability' => $this->tValue($request, 'availability'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'photo_id' => $request->input('photo_id') ?: null,
            'show_on_contact' => $request->boolean('show_on_contact'),
            'status' => $request->input('status'),
            'sort' => $request->input('sort', $m->sort ?? 0),
        ])->save();
    }
}
