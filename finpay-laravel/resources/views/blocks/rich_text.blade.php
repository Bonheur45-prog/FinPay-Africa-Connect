<section class="section bg-white">
    <div class="container-site max-w-3xl">
        @if (has_text($d['title'] ?? null))<h2 class="h-section mb-8">{{ tr($d['title']) }}</h2>@endif
        <div class="prose-fp">{!! tr($d['body'] ?? null) !!}</div>
    </div>
</section>
