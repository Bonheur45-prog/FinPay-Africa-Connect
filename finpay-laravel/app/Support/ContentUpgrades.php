<?php

namespace App\Support;

use App\Models\Media;
use App\Models\Page;
use App\Models\Setting;
use App\Models\Solution;
use App\Services\MediaService;

/**
 * One-time content updates applied to an existing site (and to fresh installs after seeding).
 * Each upgrade runs once (tracked in the "upgrades" setting) so later edits made in the CMS are never overwritten.
 */
class ContentUpgrades
{
    public static function run(): void
    {
        if (! Page::query()->exists()) {
            return; // empty database: the seeder calls us after it has created the content
        }
        $done = Setting::get('upgrades', []) ?: [];
        if (empty($done['2026_11_photos_slider'])) {
            self::photosAndSlider();
            $done['2026_11_photos_slider'] = now()->toIso8601String();
            Setting::put('upgrades', $done);
        }
    }

    private static function t(string $fr, string $en): array
    {
        return ['fr' => $fr, 'en' => $en];
    }

    private static function link(string $fr, string $en, string $url): array
    {
        return ['label' => self::t($fr, $en), 'url' => $url];
    }

    /** Import a bundled photo once (matched by file name) and return its media id. */
    private static function photo(string $file, array $alt): ?int
    {
        $existing = Media::where('filename', $file)->first();
        if ($existing) {
            return $existing->id;
        }
        $path = database_path('seeders/assets/photos/'.$file);
        if (! is_file($path)) {
            return null;
        }
        $m = app(MediaService::class)->storePath($path, $file);
        $m->update(['alt' => $alt]);

        return $m->id;
    }

    private static function photosAndSlider(): void
    {
        $p = [
            'lagos' => self::photo('slide-lagos.webp', self::t('Vue aérienne de Lagos', 'Aerial view of Lagos')),
            'mobile' => self::photo('slide-mobile.webp', self::t('Paiement sur smartphone', 'Paying with a smartphone')),
            'call' => self::photo('slide-call.webp', self::t('Homme au téléphone', 'Man on a phone call')),
            'nairobi' => self::photo('slide-nairobi.webp', self::t('Vue de Nairobi', 'View of Nairobi')),
            'about' => self::photo('hero-about.webp', self::t('Équipe au travail', 'Team at work')),
            'solutions' => self::photo('hero-solutions.webp', self::t('Paiement par carte en ligne', 'Online card payment')),
            'partners' => self::photo('hero-partners.webp', self::t('Poignée de main', 'Handshake')),
            'investors' => self::photo('hero-investors.webp', self::t('Tours de bureaux', 'Office towers')),
            'blog' => self::photo('hero-blog.webp', self::t('Collègues au travail', 'Colleagues at work')),
            'crossborder' => self::photo('hero-crossborder.webp', self::t('Lagos de nuit', 'Lagos at night')),
            'api' => self::photo('hero-api.webp', self::t('Tableau de bord analytique', 'Analytics dashboard')),
            'cards' => self::photo('hero-cards.webp', self::t('Terminal de paiement', 'Payment terminal')),
            'kyc' => self::photo('hero-kyc.webp', self::t('Ingénieures dans un centre de données', 'Engineers in a data centre')),
            'sunrise' => self::photo('band-sunrise.webp', self::t('Lever de soleil près de Kigali', 'Sunrise near Kigali')),
        ];

        // 1. "Home" first in the header menu
        $nav = Setting::get('navigation', []) ?: [];
        $items = $nav['items'] ?? [];
        if (! collect($items)->contains(fn ($i) => trim((string) ($i['url'] ?? ''), '/') === '')) {
            array_unshift($items, ['label' => self::t('Accueil', 'Home'), 'url' => '/', 'mega' => false]);
            $nav['items'] = $items;
            Setting::put('navigation', $nav);
        }

        // 2. Home: photo slideshow replaces the first hero
        $home = Page::where('system_key', 'home')->first();
        if ($home) {
            $sections = $home->sections ?? [];
            $hasSlider = collect($sections)->contains(fn ($b) => ($b['type'] ?? '') === 'slider');
            if (! $hasSlider) {
                $hero = collect($sections)->first(fn ($b) => ($b['type'] ?? '') === 'hero');
                $h = $hero['data'] ?? [];
                $diaspora = Solution::where('slug', 'diaspora')->first();
                $api = Solution::where('slug', 'api')->first();
                $slider = Blocks::blank('slider');
                $slider['data']['interval'] = 7;
                $slider['data']['badges'] = $h['badges'] ?? [];
                $slider['data']['slides'] = [
                    ['image' => $p['lagos'], 'eyebrow' => $h['eyebrow'] ?? self::t('', ''), 'title' => $h['title'] ?? self::t('', ''),
                        'highlight' => $h['highlight'] ?? self::t('', ''), 'subtitle' => $h['subtitle'] ?? self::t('', ''),
                        'primary' => $h['primary'] ?? self::link('Découvrir nos solutions', 'Explore our solutions', '/solutions'),
                        'secondary' => $h['secondary'] ?? self::link('Parler à notre équipe', 'Talk to our team', '/contact-us')],
                    ['image' => $p['mobile'], 'eyebrow' => self::t('Transferts diaspora', 'Diaspora transfers'),
                        'title' => self::t('Envoyez de l’argent à vos proches,', 'Send money to your loved ones,'),
                        'highlight' => self::t('en quelques secondes', 'in seconds'),
                        'subtitle' => $diaspora?->summary ?? self::t('', ''),
                        'primary' => self::link('Découvrir les transferts diaspora', 'Explore diaspora transfers', '/solutions/diaspora'),
                        'secondary' => self::link('Parler à notre équipe', 'Talk to our team', '/contact-us')],
                    ['image' => $p['call'], 'eyebrow' => self::t('Partenariats', 'Partnerships'),
                        'title' => self::t('Construisons ensemble', 'Let’s build'),
                        'highlight' => self::t('l’avenir des paiements en Afrique', 'the future of payments in Africa'),
                        'subtitle' => self::t('Banques, opérateurs de mobile money et fintechs : rejoignez un réseau de partenaires de confiance à travers le continent.',
                            'Banks, mobile money operators and fintechs: join a trusted partner network across the continent.'),
                        'primary' => self::link('Devenir partenaire', 'Become a partner', '/contact-us?type=partnership'),
                        'secondary' => self::link('Nos partenaires', 'Our partners', '/partners')],
                    ['image' => $p['nairobi'], 'eyebrow' => self::t('Infrastructure panafricaine', 'Pan-African infrastructure'),
                        'title' => self::t('Une seule plateforme pour', 'One platform for'),
                        'highlight' => self::t('les paiements à travers l’Afrique', 'payments across Africa'),
                        'subtitle' => $api?->summary ?? self::t('', ''),
                        'primary' => self::link('Voir l’API de paiement', 'See the payment API', '/solutions/api'),
                        'secondary' => self::link('Toutes les solutions', 'All solutions', '/solutions')],
                ];
                $idx = collect($sections)->search(fn ($b) => ($b['type'] ?? '') === 'hero');
                if ($idx === false) {
                    array_unshift($sections, $slider);
                } else {
                    $sections[$idx] = $slider;
                }
            }
            $home->sections = Blocks::sanitize($sections);
            $home->save();
        }

        // 3. Photo backgrounds on page heroes
        $bg = ['about' => 'about', 'solutions' => 'solutions', 'partners' => 'partners', 'investors' => 'investors', 'blog' => 'blog'];
        foreach ($bg as $key => $photo) {
            $page = Page::where('system_key', $key)->first();
            if (! $page) {
                continue;
            }
            $sections = $page->sections ?? [];
            foreach ($sections as $i => $b) {
                if (($b['type'] ?? '') !== 'hero') {
                    continue;
                }
                if (empty($b['data']['background'])) {
                    $sections[$i]['data']['background'] = $p[$photo];
                    $sections[$i]['data']['overlay'] = 'strong';
                    if (($b['data']['variant'] ?? '') === 'centered') {
                        $sections[$i]['data']['variant'] = 'page';
                    }
                }
                break;
            }
            // About: sunrise photo behind the quote
            if ($key === 'about') {
                foreach ($sections as $i => $b) {
                    if (($b['type'] ?? '') === 'quote' && empty($b['data']['background'])) {
                        $sections[$i]['data']['background'] = $p['sunrise'];
                    }
                }
            }
            $page->sections = Blocks::sanitize($sections);
            $page->save();
        }

        // 4. Contact: light page header + photo slideshow behind the form (as on the previous site)
        $contact = Page::where('system_key', 'contact')->first();
        if ($contact) {
            $sections = $contact->sections ?? [];
            foreach ($sections as $i => $b) {
                if (($b['type'] ?? '') === 'hero' && ($b['data']['variant'] ?? '') === 'page' && empty($b['data']['background'])) {
                    $sections[$i]['data']['variant'] = 'centered';
                }
                if (($b['type'] ?? '') === 'contact' && ($b['data']['title'] ?? null) == ($b['data']['form_title'] ?? null)) {
                    $sections[$i]['data']['title'] = self::t('Parlons de votre projet', 'Let’s talk about your project');
                }
                if (($b['type'] ?? '') === 'contact' && empty($b['data']['backgrounds'])) {
                    $sections[$i]['data']['backgrounds'] = array_map(fn ($id) => ['image' => $id],
                        array_values(array_filter([$p['crossborder'], $p['call'], $p['nairobi'], $p['mobile']])));
                }
            }
            $contact->sections = Blocks::sanitize($sections);
            $contact->save();
        }

        // 5. Solution pages: photo background behind the hero
        $solBg = ['cross-border' => 'crossborder', 'diaspora' => 'mobile', 'api' => 'api', 'cards' => 'cards', 'kyc' => 'kyc'];
        foreach ($solBg as $slug => $photo) {
            $s = Solution::where('slug', $slug)->first();
            if (! $s) {
                continue;
            }
            $sections = $s->sections ?? [];
            foreach ($sections as $i => $b) {
                if (($b['type'] ?? '') === 'hero') {
                    if (empty($b['data']['background'])) {
                        $sections[$i]['data']['background'] = $p[$photo];
                        $sections[$i]['data']['overlay'] = 'strong';
                    }
                    break;
                }
            }
            $s->sections = Blocks::sanitize($sections);
            $s->save();
        }
    }
}
