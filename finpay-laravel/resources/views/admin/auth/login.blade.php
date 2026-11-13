<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Sign in · FinPay Africa CMS</title>
    <link rel="icon" href="{{ asset('favicon.png') }}">
    @vite(['resources/css/admin.css'])
</head>
<body class="grid min-h-screen place-items-center bg-navy-950 p-4" style="background-image: radial-gradient(60% 70% at 100% 0%, rgb(140 26 19 / .35), transparent 60%)">
    <div class="w-full max-w-sm">
        <div class="mb-8 text-center">
            <img src="{{ asset('images/brand/logo-light.png') }}" alt="FinPay Africa" class="mx-auto h-12 w-auto">
            <p class="mt-3 text-sm text-slate-400">Content management</p>
        </div>
        <form method="POST" action="{{ route('admin.login.attempt') }}" class="a-card space-y-4 p-7">
            @csrf
            @if (session('status'))<p class="rounded-lg bg-emerald-50 px-3 py-2 text-[13px] text-emerald-800">{{ session('status') }}</p>@endif
            <div>
                <label class="a-label" for="email">Email</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus autocomplete="username" class="a-input @error('email') is-invalid @enderror">
                @error('email')<p class="a-error">{{ $message }}</p>@enderror
            </div>
            <div>
                <label class="a-label" for="password">Password</label>
                <input id="password" type="password" name="password" required autocomplete="current-password" class="a-input">
                @error('password')<p class="a-error">{{ $message }}</p>@enderror
            </div>
            <label class="flex items-center gap-2 text-[13px] text-muted"><input type="checkbox" name="remember" value="1" class="accent-[#8c1a13]"> Keep me signed in</label>
            <button class="a-btn a-btn-primary w-full py-2.5">Sign in</button>
        </form>
        <p class="mt-6 text-center text-xs text-slate-500"><a href="{{ url('/') }}" class="hover:text-slate-300">← Back to the website</a></p>
    </div>
</body>
</html>
