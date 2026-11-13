<x-admin.layout title="Settings" :subtitle="$groups[$group]" lang-switch>
    <div class="mb-6 flex flex-wrap gap-2">
        @foreach ($groups as $k => $label)
            <a href="{{ route('admin.settings', $k) }}" @class(['a-btn a-btn-sm', 'a-btn-dark' => $group === $k, 'a-btn-outline' => $group !== $k])>{{ $label }}</a>
        @endforeach
    </div>

    <form method="POST" action="{{ route('admin.settings.update', $group) }}" class="max-w-4xl">@csrf @method('PUT')
        @if ($group === 'general')
            <x-admin.card>
                <div class="grid gap-5 md:grid-cols-2">
                    <x-admin.input name="site_name" label="Website name" :value="$s['site_name'] ?? ''" required />
                    <x-admin.input name="legal_name" label="Legal company name" :value="$s['legal_name'] ?? ''" />
                    <x-admin.input name="tagline" label="Tagline" :value="$s['tagline'] ?? []" t />
                    <x-admin.input name="registration" label="Registration (shown in the footer)" :value="$s['registration'] ?? ''" />
                    <x-admin.input class="md:col-span-2" name="group" label="Group line (footer)" :value="$s['group'] ?? []" t />
                    <x-admin.input name="announcement" label="Announcement bar (optional)" :value="$s['announcement'] ?? []" t help="A thin bar above the header. Leave empty to hide it." />
                    <x-admin.input name="announcement_url" label="Announcement link" :value="$s['announcement_url'] ?? ''" placeholder="/blog/… or https://…" />
                </div>
            </x-admin.card>
        @elseif ($group === 'contact')
            <x-admin.card>
                <div class="grid gap-5 md:grid-cols-2">
                    <x-admin.input name="email" label="Public email" type="email" :value="$s['email'] ?? ''" />
                    <x-admin.input name="notify_email" label="Send contact-form alerts to" type="email" :value="$s['notify_email'] ?? ''" help="Defaults to the public email when empty." />
                    <x-admin.input name="phone" label="Main phone" :value="$s['phone'] ?? ''" />
                    <x-admin.input name="phone_secondary" label="Second phone" :value="$s['phone_secondary'] ?? ''" />
                    <x-admin.input name="address" label="Office / address" :value="$s['address'] ?? []" t />
                    <x-admin.input name="hours" label="Business hours" :value="$s['hours'] ?? []" t />
                    <x-admin.input name="response_time" label="Response-time promise" :value="$s['response_time'] ?? []" t />
                </div>
            </x-admin.card>
        @elseif ($group === 'navigation')
            <x-admin.card title="Header menu">
                <div x-data="jsonList(@js($s['items'] ?? []), { label: { fr: '', en: '' }, url: '/', mega: false })">
                    <input type="hidden" name="items" :value="json">
                    <div class="space-y-2">
                        <template x-for="(item, i) in items" :key="i">
                            <div class="flex flex-wrap items-center gap-2 rounded-lg border border-line p-3">
                                <input class="a-input t-fr w-48" placeholder="Libellé (FR)" x-model="item.label.fr">
                                <input class="a-input t-en w-48" placeholder="Label (EN)" x-model="item.label.en">
                                <input class="a-input w-48 font-mono text-xs" placeholder="/about" x-model="item.url">
                                <label class="flex items-center gap-1.5 text-xs"><input type="checkbox" x-model="item.mega" class="accent-[#8c1a13]"> Solutions dropdown</label>
                                <span class="ml-auto flex gap-1"><button type="button" class="a-btn a-btn-ghost a-btn-sm" @click="up(i)">↑</button><button type="button" class="a-btn a-btn-ghost a-btn-sm" @click="down(i)">↓</button><button type="button" class="a-btn a-btn-ghost a-btn-sm text-brand-600" @click="remove(i)">✕</button></span>
                            </div>
                        </template>
                    </div>
                    <button type="button" class="a-btn a-btn-outline a-btn-sm mt-3" @click="add()">+ Add menu item</button>
                </div>
            </x-admin.card>
            <x-admin.card title="Header button" class="mt-6">
                <div class="grid gap-5 md:grid-cols-2">
                    <x-admin.input name="cta_label" label="Button text" :value="$s['cta']['label'] ?? []" t />
                    <x-admin.input name="cta_url" label="Button link" :value="$s['cta']['url'] ?? ''" />
                </div>
            </x-admin.card>
        @elseif ($group === 'footer')
            <x-admin.card>
                <div class="grid gap-5 md:grid-cols-2">
                    <x-admin.input class="md:col-span-2" name="about" label="Short company description" :value="$s['about'] ?? []" t type="textarea" rows="2" />
                    <x-admin.input name="newsletter_title" label="Newsletter title" :value="$s['newsletter_title'] ?? []" t />
                    <x-admin.input name="newsletter_text" label="Newsletter text" :value="$s['newsletter_text'] ?? []" t />
                    <x-admin.input class="md:col-span-2" name="disclaimer" label="Regulatory disclaimer (small print)" :value="$s['disclaimer'] ?? []" t type="textarea" rows="2" />
                </div>
            </x-admin.card>
            <x-admin.card title="Link columns" class="mt-6">
                <p class="mb-3 text-xs text-muted">The Solutions and Legal columns are filled automatically.</p>
                <div x-data="jsonList(@js($s['columns'] ?? []), { title: { fr: '', en: '' }, links: [] })">
                    <input type="hidden" name="columns" :value="json">
                    <template x-for="(col, i) in items" :key="i">
                        <div class="mb-3 rounded-lg border border-line p-3">
                            <div class="flex gap-2"><input class="a-input t-fr" placeholder="Titre (FR)" x-model="col.title.fr"><input class="a-input t-en" placeholder="Title (EN)" x-model="col.title.en">
                                <button type="button" class="a-btn a-btn-ghost a-btn-sm text-brand-600" @click="remove(i)">Remove column</button></div>
                            <template x-for="(l, j) in col.links" :key="j">
                                <div class="mt-2 flex gap-2 pl-4"><input class="a-input t-fr" placeholder="Libellé (FR)" x-model="l.label.fr"><input class="a-input t-en" placeholder="Label (EN)" x-model="l.label.en">
                                    <input class="a-input font-mono text-xs" placeholder="/about" x-model="l.url"><button type="button" class="a-btn a-btn-ghost a-btn-sm" @click="col.links.splice(j, 1)">✕</button></div>
                            </template>
                            <button type="button" class="a-btn a-btn-outline a-btn-sm mt-2 ml-4" @click="col.links.push({ label: { fr: '', en: '' }, url: '/' })">+ Link</button>
                        </div>
                    </template>
                    <button type="button" class="a-btn a-btn-outline a-btn-sm" @click="add()">+ Add column</button>
                </div>
            </x-admin.card>
            <x-admin.card title="Social profiles" class="mt-6">
                <div class="grid gap-5 md:grid-cols-2">
                    @foreach (['linkedin' => 'LinkedIn', 'x' => 'X (Twitter)', 'facebook' => 'Facebook', 'instagram' => 'Instagram', 'youtube' => 'YouTube'] as $k => $label)
                        <x-admin.input :name="'social['.$k.']'" :label="$label" type="url" :value="$social[$k] ?? ''" placeholder="https://" />
                    @endforeach
                </div>
            </x-admin.card>
        @elseif ($group === 'seo')
            <x-admin.card>
                <div class="grid gap-5 md:grid-cols-2">
                    <x-admin.input name="title_suffix" label="Title suffix" :value="$s['title_suffix'] ?? ''" help="Added after page titles, e.g. “ — FinPay Africa”." />
                    <x-admin.input name="google_analytics_id" label="Google Analytics ID" :value="$s['google_analytics_id'] ?? ''" placeholder="G-XXXXXXXXXX" help="Analytics only load after the visitor accepts cookies." />
                    <x-admin.input class="md:col-span-2" name="description" label="Default description" :value="$s['description'] ?? []" t type="textarea" rows="2" />
                    <x-admin.input name="google_site_verification" label="Google Search Console verification code" :value="$s['google_site_verification'] ?? ''" />
                    <x-admin.media name="og_image" label="Default share image" :media="$ogImage" help="1200×630 recommended." />
                </div>
            </x-admin.card>
        @endif
        <button class="a-btn a-btn-primary mt-6">Save {{ strtolower($groups[$group]) }}</button>
    </form>
</x-admin.layout>
