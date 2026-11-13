import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

Alpine.plugin(collapse);

Alpine.data('siteHeader', () => ({
    mobile: false,
    menu: null,
    scrolled: false,
    progress: 0,
    timer: null,
    init() {
        const onScroll = () => {
            this.scrolled = window.scrollY > 8;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            this.progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        };
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

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Home hero slideshow: autoplay with progress, pauses on hover/focus, when the tab is hidden, or by the pause button.
Alpine.data('heroSlider', (count, seconds = 7) => ({
    active: 0,
    progress: 0,
    hover: false,
    paused: false,
    count,
    init() {
        if (count < 2) return;
        if (prefersReduced()) this.paused = true;
        let last = performance.now();
        const tick = (now) => {
            const dt = now - last;
            last = now;
            if (!this.hover && !this.paused && !document.hidden) {
                this.progress += (dt / (seconds * 1000)) * 100;
                if (this.progress >= 100) this.next();
            }
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    },
    go(i) { this.active = (i + this.count) % this.count; this.progress = 0; },
    next() { this.go(this.active + 1); },
    prev() { this.go(this.active - 1); },
}));

// Cross-fading background photos (contact section).
Alpine.data('bgSlideshow', (count, seconds = 6) => ({
    active: 0,
    init() {
        if (count < 2 || prefersReduced()) return;
        setInterval(() => { if (!document.hidden) this.active = (this.active + 1) % count; }, seconds * 1000);
    },
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

// Parallax: [data-parallax="0.2"] moves at a fraction of the scroll speed while its section is on screen.
function initParallax() {
    const els = [...document.querySelectorAll('[data-parallax]')];
    if (!els.length || prefersReduced()) return;
    let ticking = false;
    const update = () => {
        const vh = window.innerHeight;
        els.forEach((el) => {
            const host = el.closest('section') || el.parentElement;
            const r = host.getBoundingClientRect();
            if (r.bottom < -100 || r.top > vh + 100) return;
            const factor = parseFloat(el.dataset.parallax) || 0.2;
            const offset = (r.top + r.height / 2 - vh / 2) * -factor;
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        });
        ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
}

document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initBackToTop();
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

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    const toggle = () => btn.classList.toggle('is-shown', window.scrollY > 900);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' }));
}

window.Alpine = Alpine;
Alpine.start();
