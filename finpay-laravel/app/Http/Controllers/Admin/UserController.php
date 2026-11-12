<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends AdminController
{
    public function index()
    {
        return view('admin.users.index', ['users' => User::orderBy('name')->get()]);
    }

    public function create()
    {
        return view('admin.users.form', ['user' => new User(['role' => 'editor', 'is_active' => true])]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request, new User);
        User::create($data);

        return redirect()->route('admin.users.index')->with('status', 'User created. Share the password with them securely.');
    }

    public function edit(User $user)
    {
        return view('admin.users.form', ['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        $data = $this->validated($request, $user);
        if ($user->is($request->user())) {
            $data['role'] = 'admin';       // you cannot demote or disable yourself
            $data['is_active'] = true;
        }
        if ($user->isAdmin() && ($data['role'] !== 'admin' || ! $data['is_active']) && User::where('role', 'admin')->where('is_active', true)->count() <= 1) {
            return back()->with('error', 'At least one active administrator is required.');
        }
        if (empty($data['password'])) {
            unset($data['password']);
        }
        $user->update($data);

        return redirect()->route('admin.users.index')->with('status', 'User saved.');
    }

    public function destroy(Request $request, User $user)
    {
        if ($user->is($request->user())) {
            return back()->with('error', 'You cannot delete your own account.');
        }
        if ($user->isAdmin() && User::where('role', 'admin')->count() <= 1) {
            return back()->with('error', 'At least one administrator is required.');
        }
        $user->delete();

        return back()->with('status', 'User deleted.');
    }

    private function validated(Request $request, User $user): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160', Rule::unique('users', 'email')->ignore($user->id)],
            'role' => ['required', Rule::in(array_keys(User::ROLES))],
            'password' => [$user->exists ? 'nullable' : 'required', Password::min(10)->letters()->numbers()],
        ]);
        $data['is_active'] = $request->boolean('is_active');

        return $data;
    }
}
