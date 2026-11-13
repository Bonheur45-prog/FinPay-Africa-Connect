import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

Alpine.plugin(collapse);

Alpine.data('siteHeader', () => ({
    mobile: false,
    menu: null,
    scrolled: false,
    timer: null,
    init() {
        const onScroll = () => { this.scrolled = window.scrollY > 8; };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        this.$watch('mobile', (v) => { document.documentElement.style.overflow = v ? 'hidden' : ''; });
    },
    openMenu(i) { clearTimeout(this.timer); this.menu = i; },
    toggleMenu(i) { this.menu = this.menu === i ? null : i; },
    closeSoon() { this.timer = setTimeout(() => { this.menu = null; }, 160); },
    cancelClose() { clearTimeout(this.timer); },
    close() { this.menu = null; this.mobile = false; },
}));

// Cookie consent: Google Analytics loads only after the visitor accepts.
const CONSENT_KEY = 'fp_cookie_consent';
function readConsent() { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } }
function loadAnalytics() {
    const id = window.FP_GA_ID;
    if (!id || window.__fpGaLoaded) return;
    window.__fpGaLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });
}
Alpine.data('cookieConsent', () => ({
    open: false,
    init() {
        const c = readConsent();
        if (c === 'granted') loadAnalytics();
        this.open = c === null;
    },
    decide(granted) {
        try { localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied'); } catch { /* storage unavailable */ }
        this.open = false;
        if (granted) loadAnalytics();
    },
}));

// Contact form: enquiry type tabs + submit state (the server decides success).
Alpine.data('contactForm', (initialType = 'general') => ({
    type: initialType,
    sending: false,
    submit() { this.sending = true; },
}));

Alpine.data('partnerFilter', () => ({
    active: 'all',
    show(cat) { return this.active === 'all' || this.active === cat; },
}));

Alpine.data('copyLink', () => ({
    copied: false,
    async copy() {
        try { await navigator.clipboard.writeText(window.location.href); this.copied = true; setTimeout(() => { this.copied = false; }, 2000); } catch { /* clipboard blocked */ }
    },
}));

// Count-up for key figures (only animates the numeric part, keeps prefixes/suffixes).
function countUp(el) {
    const text = el.dataset.value || el.textContent;
    const m = text.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!m) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ''));
    if (!isFinite(target) || target === 0) return;
    const decimals = (num.split('.')[1] || '').length;
    const start = performance.now();
    const dur = 1200;
    const step = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = (target * eased).toFixed(decimals);
        el.textContent = pre + (num.includes(',') ? Number(val).toLocaleString('en-US') : val) + post;
        if (p < 1) requestAnimationFrame(step); else el.textContent = text;
    };
    requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll('[data-reveal], [data-count]');
    if (!('IntersectionObserver' in window) || reduce) {
        els.forEach((el) => el.classList.add('is-visible'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add('is-visible');
            if (e.target.hasAttribute('data-count')) countUp(e.target);
            io.unobserve(e.target);
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    els.forEach((el) => io.observe(el));
});

window.Alpine = Alpine;
Alpine.start();
