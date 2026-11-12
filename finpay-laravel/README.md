# FinPay Africa — website & CMS (Laravel)

The public website (`/fr`, `/en`) and a custom CMS (`/admin`), built with Laravel 13, Blade, Tailwind CSS 4 and Alpine.js.
No headless CMS or admin package is used; everything is custom code.

## What the CMS manages

| Area | What editors can do |
|---|---|
| **Pages** | Every page is a list of blocks (hero, feature grid, key figures, text + image, timeline, chart, trust band, markets, partners, team, FAQ, CTA, rich text…). Add, reorder, hide or duplicate blocks; edit French and English; SEO title/description and share image; version history with restore; drafts with preview. |
| **Solutions** | Products shown in the header menu, on the home page and on their own pages (same block editor). |
| **Insights (blog)** | Rich-text articles in FR/EN, categories, cover images, scheduling, featured posts, SEO, version history. |
| **Partners / Team contacts** | Partner directory with category filters and the home-page logo bar; contacts shown on Contact/Investors. |
| **Media library** | Uploads (JPG/PNG/WebP/GIF/PDF, 10 MB max) with automatic WebP resizing; alt text in FR/EN. |
| **Messages** | Contact-form inbox (general / partnership / investor), status and notes, CSV export, email alert via Brevo. |
| **Subscribers** | Newsletter sign-ups with unsubscribe links, CSV export. |
| **Settings** *(admins)* | Company details, contact details, header menu, footer and social links, SEO defaults, Google Analytics (loaded only after cookie consent). |
| **Redirects, Users, Activity log, Trash** *(admins)* | 301/302 redirects; admin/editor accounts; who changed what; restore or permanently delete. |

## Local development

```bash
composer install && npm install
cp .env.example .env && php artisan key:generate
touch database/database.sqlite
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=secret123secret php artisan migrate --seed
npm run build   # or: npm run dev
php artisan serve
```

Tests: `php artisan test`. CI runs them on every push, plus a MySQL migrate + seed.

## Project layout

- `config/blocks.php`: the block types and their fields. The admin editor, server-side sanitizing and the public templates (`resources/views/blocks/*`) all follow this file.
- `app/Http/Controllers/Site`: public pages, blog, forms, sitemap
- `app/Http/Controllers/Admin`: the CMS
- `database/seeders/data/content.json`: initial FR/EN content converted from the previous React site
- `lang/{fr,en}/site.php`: interface strings (buttons, form labels, errors)

## Deployment

See [DEPLOY.md](DEPLOY.md). Hosting is OVH shared hosting, deployed from GitHub Actions over SSH.
