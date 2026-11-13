<x-admin.layout :title="$user->exists ? 'Edit user' : 'New user'" :back="route('admin.users.index')">
    <form method="POST" action="{{ $user->exists ? route('admin.users.update', $user) : route('admin.users.store') }}" class="max-w-xl">@csrf @if ($user->exists) @method('PUT') @endif
        <x-admin.card>
            <div class="space-y-4">
                <x-admin.input name="name" label="Name" :value="$user->name" required />
                <x-admin.input name="email" label="Email" type="email" :value="$user->email" required />
                <x-admin.select name="role" label="Role" :options="\App\Models\User::ROLES" :value="$user->role" />
                <x-admin.input name="password" label="{{ $user->exists ? 'New password (optional)' : 'Password' }}" type="password" :required="! $user->exists" help="At least 10 characters with letters and numbers." attrs='autocomplete="new-password"' />
                <x-admin.toggle name="is_active" label="Account active" :checked="$user->is_active" />
                <button class="a-btn a-btn-primary">Save user</button>
            </div>
        </x-admin.card>
    </form>
</x-admin.layout>
