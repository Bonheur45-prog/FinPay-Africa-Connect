@props(['title' => 'Dashboard', 'subtitle' => null, 'actions' => null, 'langSwitch' => false, 'back' => null])
@php
    $u = auth()->user();
    $newLeads = \App\Models\Lead::where('status', 'new')->count();
    $nav = [
        ['Dashboard', 'admin.dashboard', 'layout-dashboard', 'admin.dashboard'],
        ['__Content'],
        ['Pages', 'admin.pages.index', 'file-text', 'admin.pages.*'],
        ['Solutions', 'admin.solutions.index', 'layers', 'admin.solutions.*'],
        ['Insights (blog)', 'admin.posts.index', 'newspaper', 'admin.posts.*|admin.categories.*'],
        ['Partners', 'admin.partners.index', 'handshake', 'admin.partners.*'],
        ['Team contacts', 'admin.team.index', 'users', 'admin.team.*'],
        ['Media library', 'admin.media.index', 'image', 'admin.media.*'],
        ['__Audience'],
        ['Messages', 'admin.leads.index', 'inbox', 'admin.leads.*', $newLeads],
        ['Subscribers', 'admin.subscribers.index', 'mail-plus', 'admin.subscribers.*'],
    ];
    if ($u->isAdmin()) {
        $nav = array_merge($nav, [
            ['__Site'],
            ['Settings', 'admin.settings', 'settings', 'admin.settings*'],
            ['Redirects', 'admin.redirects.index', 'repeat', 'admin.redirects.*'],
            ['Users', 'admin.users.index', 'user-check', 'admin.users.*'],
            ['Activity log', 'admin.activity', 'history', 'admin.activity'],
            ['Trash', 'admin.trash', 'trash-2', 'admin.trash*'],
        ]);
    }
@endphp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="noindex, nofollow">
    <title>{{ $title }} · FinPay Africa CMS</title>
    <link rel="icon" href="{{ asset('favicon.png') }}">
    @vite(['resources/css/admin.css', 'resources/js/admin.js'])
</head>
<body x-data="{ side: false }" data-lang="fr">
<div class="flex min-h-screen">
    <aside :class="side ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
           class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy-950 text-white transition-transform lg:sticky lg:top-0 lg:h-screen">
        <div class="flex h-16 items-center gap-3 border-b border-white/10 px-5">
            <img src="{{ asset('images/brand/mark.png') }}" alt="" class="size-8">
            <div class="leading-tight">
                <p class="text-sm font-semibold">FinPay Africa</p>
                <p class="text-[11px] text-slate-400">Content management</p>
            </div>
        </div>
        <nav class="flex-1 space-y-0.5 overflow-y-auto p-3">
            @foreach ($nav as $item)
                @if (str_starts_with($item[0], '__'))
                    <p class="px-3 pt-5 pb-1.5 text-[10.5px] font-semibold tracking-[0.12em] text-slate-500 uppercase">{{ substr($item[0], 2) }}</p>
                @else
                    @php $active = collect(explode('|', $item[3]))->contains(fn ($p) => request()->routeIs($p)); @endphp
                    <a href="{{ route($item[1]) }}" @class(['a-nav', 'is-active' => $active])>
                        {!! icon($item[2], 'icon') !!}<span class="flex-1">{{ $item[0] }}</span>
                        @if (! empty($item[4]))<span class="rounded-full bg-brand-500 px-1.5 text-[11px] font-bold">{{ $item[4] }}</span>@endif
                    </a>
                @endif
            @endforeach
        </nav>
        <div class="border-t border-white/10 p-3">
            <a href="{{ url('/') }}" target="_blank" class="a-nav">{!! icon('external-link', 'icon') !!} View website</a>
            <a href="{{ route('admin.account') }}" class="a-nav {{ request()->routeIs('admin.account') ? 'is-active' : '' }}">
                <span class="grid size-[18px] place-items-center rounded-full bg-brand-600 text-[10px] font-bold">{{ mb_substr($u->name, 0, 1) }}</span>
                <span class="min-w-0 flex-1 truncate">{{ $u->name }}</span>
            </a>
            <form method="POST" action="{{ route('admin.logout') }}">@csrf
                <button class="a-nav w-full">{!! icon('log-out', 'icon') !!} Sign out</button>
            </form>
        </div>
    </aside>
    <div x-show="side" x-cloak @click="side = false" class="fixed inset-0 z-30 bg-ink/40 lg:hidden"></div>

    <div class="min-w-0 flex-1">
        <header class="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
            <div class="flex min-h-16 flex-wrap items-center gap-3 px-5 py-2 lg:px-8">
                <button type="button" class="a-btn a-btn-outline lg:hidden" @click="side = true">{!! icon('menu', 'icon size-4') !!}</button>
                <div class="min-w-0 flex-1">
                    @if ($back)<a href="{{ $back }}" class="text-xs font-medium text-muted hover:text-ink">← Back</a>@endif
                    <h1 class="truncate text-lg font-semibold">{{ $title }}</h1>
                    @if ($subtitle)<p class="truncate text-xs text-muted">{{ $subtitle }}</p>@endif
                </div>
                @if ($langSwitch)
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-muted">Editing</span>
                        <div data-lang-switch class="flex rounded-full border border-line p-0.5">
                            <button type="button" data-l="fr">Français</button><button type="button" data-l="en">English</button>
                        </div>
                    </div>
                @endif
                {{ $actions }}
            </div>
        </header>

        <main class="px-5 py-6 lg:px-8">
            @if (session('status'))
                <div class="mb-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13.5px] font-medium text-emerald-800" role="status">
                    {!! icon('circle-check', 'icon size-4') !!} {{ session('status') }}
                </div>
            @endif
            @if (session('error'))
                <div class="mb-5 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-[13.5px] font-medium text-brand-700" role="alert">{{ session('error') }}</div>
            @endif
            @if ($errors->any())
                <div class="mb-5 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-[13.5px] text-brand-700" role="alert">
                    <p class="font-semibold">Please fix the following:</p>
                    <ul class="mt-1 list-disc pl-5">@foreach ($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul>
                </div>
            @endif
            {{ $slot }}
        </main>
    </div>
</div>
</body>
</html>
