<x-admin.layout title="Users" subtitle="People who can sign in to this CMS.">
    <x-slot:actions><a href="{{ route('admin.users.create') }}" class="a-btn a-btn-primary">+ New user</a></x-slot:actions>
    <x-admin.card :pad="false">
        <table class="a-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last sign-in</th><th></th></tr></thead>
            <tbody>
                @foreach ($users as $u)
                    <tr>
                        <td class="font-semibold">{{ $u->name }} @if ($u->is(auth()->user()))<span class="a-badge a-badge-blue ml-1">You</span>@endif</td>
                        <td class="text-muted">{{ $u->email }}</td>
                        <td>{{ \App\Models\User::ROLES[$u->role] ?? $u->role }}</td>
                        <td>@if ($u->is_active)<span class="a-badge a-badge-green">Active</span>@else<span class="a-badge a-badge-gray">Disabled</span>@endif</td>
                        <td class="text-xs text-muted">{{ $u->last_login_at?->diffForHumans() ?? 'Never' }}</td>
                        <td class="text-right whitespace-nowrap"><a href="{{ route('admin.users.edit', $u) }}" class="a-btn a-btn-outline a-btn-sm">Edit</a>
                            @unless ($u->is(auth()->user()))<form method="POST" action="{{ route('admin.users.destroy', $u) }}" class="inline" data-confirm="Delete this user?">@csrf @method('DELETE')<button class="a-btn a-btn-ghost a-btn-sm text-brand-600">Delete</button></form>@endunless</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </x-admin.card>
    <p class="mt-3 text-xs text-muted"><strong>Administrators</strong> can change settings, users, redirects and the trash. <strong>Editors</strong> manage content, media and messages.</p>
</x-admin.layout>
