# Deploying FinPay Africa to OVH shared hosting

The Laravel app is built on GitHub and uploaded to OVH over SSH by
`.github/workflows/deploy-ovh-laravel.yml`. Nothing needs to be installed on
your computer, and you never run commands on the server by hand.

## 1. One-time setup in the OVH control panel

1. **Database**: Web Cloud → Hosting plans → *your plan* → **Databases** → *Create a database* (MySQL 8).
   Note the **server/host**, **database name**, **user** and **password**.
2. **SSH login**: Hosting → **FTP - SSH**. Your SSH user is the FTP login, and the server is
   usually `ssh.cluster100.hosting.ovh.net` (shown on that page). Set or reset the password there.
3. **PHP version**: no action needed. The `.ovhconfig` file in the app selects PHP 8.3.
4. **Point the domain at the app** (do this *after* the first successful deploy):
   Hosting → **Multisite** → `finpay-africa.com` (and `www.`) → *Modify* → **Root folder** = `finpay/public`.
   Tip: first add a test subdomain (for example `new.finpay-africa.com`) with root folder `finpay/public`,
   check everything there, then switch the main domain.
   Keep **SSL** enabled on the multisite entry.

## 2. GitHub secrets and variables

Repository → Settings → *Secrets and variables* → **Actions**.

| Secret | Value |
|---|---|
| `OVH_SSH_HOST` | e.g. `ssh.cluster100.hosting.ovh.net` |
| `OVH_SSH_USER` | your OVH FTP/SSH login |
| `OVH_SSH_PASSWORD` | its password (or use `OVH_SSH_KEY` with a private key instead) |
| `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` | from step 1.1 (`DB_PORT` optional, default 3306) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | first CMS administrator (used only on the very first deploy) |
| `BREVO_API_KEY` | *optional*: contact-form email alerts (Brevo → SMTP & API → API keys) |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | *optional*: Cloudflare Turnstile spam protection |
| `MONGODB_URI` | *optional*: only for importing the old blog posts |

| Variable | Value |
|---|---|
| `APP_URL` | `https://finpay-africa.com` |
| `MAIL_FROM_ADDRESS` | a sender verified in Brevo, e.g. `no-reply@finpay-africa.com` |
| `MAIL_NOTIFY_TO` | *optional*: where form alerts go (otherwise the email set in CMS → Settings → Contact) |
| `OVH_APP_DIR` | *optional*: folder in your hosting home, default `finpay` |
| `OVH_PHP_BIN` | *optional*: default `/usr/local/php8.3/bin/php` |
| `DB_PREFIX` | *optional*: table prefix, default `fp_`. FinPay shares its database with another site, so every FinPay table is prefixed and the other site's tables are never touched. |
| `OVH_DEPLOY_ENABLED` | set to `true` to deploy automatically on every push to `main` |

## 3. Deploy

Actions → **Deploy FinPay Laravel to OVH** → *Run workflow*.

Each deploy:
- builds the CSS/JS and production PHP dependencies
- uploads the app with rsync. It never touches the server `.env` key, `storage/` or uploaded media in `public/media/`.
- runs the database migrations
- fills an empty database with the initial content and creates the admin. On later deploys the seeder sees the existing content and changes nothing.
- caches config, routes and views, then smoke-tests the home page

Then sign in at **`https://finpay-africa.com/admin`**.

## 4. Optional: bring over the old blog posts

Add the `MONGODB_URI` secret, then run Actions → **Import old blog posts** → *Run workflow*.
Posts are imported with both languages, the cover images are downloaded from Cloudinary, and existing slugs are skipped.

## 5. Before going live

The CMS dashboard lists every page or article that still contains a `TODO` marker. In particular:
- privacy policy, terms and cookie policy: legal text to be supplied
- the three sample articles, which are drafts until they are replaced
- figures and certifications quoted on the site (countries covered, ISO/SOC/PCI mentions on the solution pages); FinPay must be able to evidence each one
- the home page logo bar (BNR, Ecobank, Equity, I&M, Urwego): show these only with each institution's permission (CMS → Partners → “Show in logo bar”)
