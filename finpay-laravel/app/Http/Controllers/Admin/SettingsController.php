<?php

namespace App\Http\Controllers\Admin;

use App\Models\AuditLog;
use App\Models\Media;
use App\Models\Setting;
use App\Support\Blocks;
use App\Support\Locales;
use Illuminate\Http\Request;

class SettingsController extends AdminController
{
    public const GROUPS = [
        'general' => 'Company',
        'contact' => 'Contact details',
        'navigation' => 'Header menu',
        'footer' => 'Footer & social',
        'seo' => 'SEO & analytics',
    ];

    public function edit(?string $group = 'general')
    {
        $group ??= 'general';

        return view('admin.settings', [
            'group' => $group,
            'groups' => self::GROUPS,
            's' => Setting::get($group, []) ?? [],
            'social' => Setting::get('social', []) ?? [],
            'ogImage' => Media::find(Setting::get('seo.og_image')),
        ]);
    }

    public function update(Request $request, string $group)
    {
        abort_unless(isset(self::GROUPS[$group]), 404);
        $value = match ($group) {
            'general' => $this->general($request),
            'contact' => $this->contact($request),
            'navigation' => $this->navigation($request),
            'footer' => $this->footer($request),
            'seo' => $this->seo($request),
        };
        Setting::put($group, $value);
        AuditLog::record('updated', null, 'Settings “'.self::GROUPS[$group].'” updated');

        return back()->with('status', self::GROUPS[$group].' saved.');
    }

    private function general(Request $r): array
    {
        $r->validate(['site_name' => 'required|string|max:80', 'legal_name' => 'nullable|string|max:120', 'registration' => 'nullable|string|max:120',
            'announcement_url' => 'nullable|string|max:255'] + $this->tRules('tagline') + $this->tRules('group') + $this->tRules('announcement', false, 200));

        return [
            'site_name' => $r->input('site_name'), 'legal_name' => $r->input('legal_name'), 'registration' => $r->input('registration'),
            'tagline' => $this->tValue($r, 'tagline'), 'group' => $this->tValue($r, 'group'),
            'announcement' => $this->tValue($r, 'announcement'), 'announcement_url' => Blocks::url($r->input('announcement_url')),
        ];
    }

    private function contact(Request $r): array
    {
        $r->validate(['email' => 'nullable|email|max:160', 'notify_email' => 'nullable|email|max:160', 'phone' => 'nullable|string|max:40',
            'phone_secondary' => 'nullable|string|max:40'] + $this->tRules('address') + $this->tRules('hours') + $this->tRules('response_time'));

        return [
            'email' => $r->input('email'), 'notify_email' => $r->input('notify_email'),
            'phone' => $r->input('phone'), 'phone_secondary' => $r->input('phone_secondary'),
            'address' => $this->tValue($r, 'address'), 'hours' => $this->tValue($r, 'hours'), 'response_time' => $this->tValue($r, 'response_time'),
        ];
    }

    private function navigation(Request $r): array
    {
        $r->validate(['items' => 'required|json', 'cta_url' => 'nullable|string|max:255'] + $this->tRules('cta_label', false, 40));
        $items = collect(json_decode($r->input('items'), true) ?: [])->take(10)->map(fn ($i) => [
            'label' => $this->clean($i['label'] ?? []),
            'url' => Blocks::url($i['url'] ?? ''),
            'mega' => (bool) ($i['mega'] ?? false),
        ])->filter(fn ($i) => $i['url'] !== '' && trim($i['label']['fr'].$i['label']['en']) !== '')->values()->all();

        return ['items' => $items, 'cta' => ['label' => $this->tValue($r, 'cta_label'), 'url' => Blocks::url($r->input('cta_url'))]];
    }

    private function footer(Request $r): array
    {
        $r->validate(['columns' => 'required|json'] + $this->tRules('about', false, 600) + $this->tRules('newsletter_title', false, 120)
            + $this->tRules('newsletter_text', false, 300) + $this->tRules('disclaimer', false, 800)
            + ['social' => 'array', 'social.*' => 'nullable|url|max:255']);
        $cols = collect(json_decode($r->input('columns'), true) ?: [])->take(4)->map(fn ($c) => [
            'title' => $this->clean($c['title'] ?? []),
            'links' => collect($c['links'] ?? [])->take(12)->map(fn ($l) => ['label' => $this->clean($l['label'] ?? []), 'url' => Blocks::url($l['url'] ?? '')])
                ->filter(fn ($l) => $l['url'] !== '')->values()->all(),
        ])->values()->all();
        Setting::put('social', collect(['linkedin', 'x', 'facebook', 'instagram', 'youtube'])->mapWithKeys(fn ($k) => [$k => (string) $r->input('social.'.$k)])->all());

        return [
            'about' => $this->tValue($r, 'about'), 'columns' => $cols,
            'newsletter_title' => $this->tValue($r, 'newsletter_title'), 'newsletter_text' => $this->tValue($r, 'newsletter_text'),
            'disclaimer' => $this->tValue($r, 'disclaimer'),
        ];
    }

    private function seo(Request $r): array
    {
        $r->validate(['title_suffix' => 'nullable|string|max:60', 'og_image' => 'nullable|integer|exists:media,id',
            'google_analytics_id' => ['nullable', 'regex:/^G-[A-Z0-9]{4,20}$/'], 'google_site_verification' => 'nullable|string|max:120']
            + $this->tRules('description', false, 300), ['google_analytics_id.regex' => 'The Google Analytics ID looks like G-XXXXXXXXXX.']);

        return [
            'title_suffix' => $r->input('title_suffix'), 'description' => $this->tValue($r, 'description'),
            'og_image' => $r->input('og_image') ? (int) $r->input('og_image') : null,
            'google_analytics_id' => $r->input('google_analytics_id'), 'google_site_verification' => $r->input('google_site_verification'),
        ];
    }

    private function clean(mixed $v): array
    {
        $out = [];
        foreach (Locales::ALL as $l) {
            $out[$l] = is_array($v) ? mb_substr(trim(strip_tags((string) ($v[$l] ?? ''))), 0, 80) : '';
        }

        return $out;
    }
}
