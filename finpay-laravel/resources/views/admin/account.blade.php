<x-admin.layout title="My account">
    <form method="POST" action="{{ route('admin.account.update') }}" class="max-w-xl">@csrf @method('PUT')
        <x-admin.card>
            <div class="space-y-4">
                <x-admin.input name="name" label="Name" :value="$user->name" required />
                <x-admin.input name="email" label="Email" type="email" :value="$user->email" required />
                <x-admin.input name="password" label="New password" type="password" help="Leave empty to keep your password. At least 10 characters with letters and numbers." attrs='autocomplete="new-password"' />
                <x-admin.input name="password_confirmation" label="Repeat new password" type="password" attrs='autocomplete="new-password"' />
                <x-admin.input name="current_password" label="Current password (required to save)" type="password" required attrs='autocomplete="current-password"' />
                <button class="a-btn a-btn-primary">Save changes</button>
            </div>
        </x-admin.card>
    </form>
</x-admin.layout>
