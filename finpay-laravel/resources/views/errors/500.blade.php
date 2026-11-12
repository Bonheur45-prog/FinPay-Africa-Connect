{{-- Standalone on purpose: must render even when the database is unavailable. --}}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>FinPay Africa</title>
    <link rel="icon" href="/favicon.png">
    @vite(['resources/css/app.css'])
</head>
<body class="grid min-h-screen place-items-center bg-surface p-6">
    <main class="max-w-lg text-center">
        <img src="/images/brand/logo.png" alt="FinPay Africa" class="mx-auto h-12 w-auto">
        <p class="mt-10 font-display text-6xl font-bold text-brand-600">500</p>
        @if (500 === 503)
            <h1 class="mt-4 text-2xl font-bold">Maintenance en cours · Maintenance in progress</h1>
            <p class="mt-3 text-muted">Le site revient dans quelques instants. The website will be back in a moment.</p>
        @else
            <h1 class="mt-4 text-2xl font-bold">Une erreur est survenue · Something went wrong</h1>
            <p class="mt-3 text-muted">Veuillez réessayer dans un instant. Please try again in a moment.</p>
        @endif
        <a href="/" class="btn btn-primary mt-8">FinPay Africa</a>
    </main>
</body>
</html>
