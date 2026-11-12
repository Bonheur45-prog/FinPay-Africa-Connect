<?php

namespace App\Support;

use App\Models\Media;
use Closure;

/** Per-page SEO data rendered by resources/views/site/partials/seo.blade.php. */
class Seo
{
    public function __construct(
        public string $title,
        public string $description,
        public ?string $image,
        public array $alternates,
        public string $canonical,
        public string $type = 'website',
        public array $jsonLd = [],
        public bool $noindex = false,
    ) {}

    public static function make(string $title, string $description = '', ?Media $image = null, ?Closure $alternates = null,
        bool $isHome = false, string $type = 'website', array $jsonLd = [], bool $noindex = false): self
    {
        $siteName = (string) setting('general.site_name', 'FinPay Africa');
        $suffix = (string) setting('seo.title_suffix', ' — '.$siteName);
        if ($title === '') {
            $title = $siteName;
        } elseif (! $isHome && ! str_contains($title, $siteName)) {
            $title .= $suffix;
        }
        $description = $description !== '' ? $description : tr(setting('seo.description'));
        $imageUrl = $image?->url('md') ?? (($fallback = media(setting('seo.og_image'))) ? $fallback->url('md') : asset('images/brand/og-default.png'));

        $alts = [];
        foreach (Locales::ALL as $l) {
            $alts[$l] = $alternates ? $alternates($l) : url($l);
        }

        return new self(
            title: mb_strimwidth($title, 0, 90, '…'),
            description: mb_strimwidth(trim(strip_tags($description)), 0, 165, '…'),
            image: $imageUrl,
            alternates: $alts,
            canonical: $alts[Locales::current()] ?? url()->current(),
            type: $type,
            jsonLd: $jsonLd,
            noindex: $noindex,
        );
    }
}
