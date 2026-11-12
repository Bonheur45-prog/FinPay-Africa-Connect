import Alpine from 'alpinejs';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;
const LOCALES = ['fr', 'en'];

/* ------------------------------------------------------------------ helpers */
const h = (tag, attrs = {}, ...children) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
        else if (k === 'html') el.innerHTML = v;
        else el.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) {
        if (c === null || c === undefined || c === false) continue;
        el.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
};
const uid = () => 'b_' + Math.random().toString(36).slice(2, 10);
const clone = (o) => JSON.parse(JSON.stringify(o));
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ------------------------------------------------------------------ editing language */
function setLang(l) {
    document.body.dataset.lang = l;
    try { localStorage.setItem('fp_admin_lang', l); } catch { /* ignore */ }
    document.querySelectorAll('[data-lang-switch] button').forEach((b) => b.classList.toggle('is-on', b.dataset.l === l));
}
function initLang() {
    let l = 'fr';
    try { l = localStorage.getItem('fp_admin_lang') || 'fr'; } catch { /* ignore */ }
    setLang(LOCALES.includes(l) ? l : 'fr');
    document.addEventListener('click', (e) => {
        const b = e.target.closest('[data-lang-switch] button');
        if (b) setLang(b.dataset.l);
    });
}

/* ------------------------------------------------------------------ media picker */
const MediaPicker = {
    modal: null,
    resolve: null,
    open({ imagesOnly = true } = {}) {
        return new Promise((resolve) => {
            this.resolve = resolve;
            this.imagesOnly = imagesOnly;
            this.render();
            this.load('');
        });
    },
    close(result = null) {
        this.modal?.remove();
        this.modal = null;
        this.resolve?.(result);
        this.resolve = null;
    },
    render() {
        this.grid = h('div', { class: 'grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5' });
        this.status = h('p', { class: 'text-xs text-muted' });
        const search = h('input', { class: 'a-input max-w-xs', placeholder: 'Search files…', type: 'search' });
        let t;
        search.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => this.load(search.value), 250); });
        const file = h('input', { type: 'file', class: 'hidden', multiple: true, accept: this.imagesOnly ? 'image/jpeg,image/png,image/webp,image/gif' : 'image/*,application/pdf' });
        file.addEventListener('change', () => this.upload(file.files));
        this.modal = h('div', { class: 'fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-4', onclick: (e) => { if (e.target === this.modal) this.close(); } },
            h('div', { class: 'a-card flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden' },
                h('div', { class: 'a-card-h' },
                    h('p', { class: 'a-card-t' }, 'Media library'),
                    h('div', { class: 'flex items-center gap-2' }, search,
                        h('button', { type: 'button', class: 'a-btn a-btn-primary', onclick: () => file.click() }, 'Upload'), file,
                        h('button', { type: 'button', class: 'a-btn a-btn-ghost', onclick: () => this.close() }, '✕'))),
                h('div', { class: 'flex-1 overflow-y-auto p-5' }, this.grid),
                h('div', { class: 'border-t border-line px-5 py-3' }, this.status)));
        document.body.append(this.modal);
        search.focus();
    },
    async load(q) {
        this.status.textContent = 'Loading…';
        const res = await fetch(`/admin/media/picker?q=${encodeURIComponent(q)}&images=${this.imagesOnly ? 1 : 0}`, { headers: { Accept: 'application/json' } });
        const json = await res.json();
        this.grid.innerHTML = '';
        json.data.forEach((m) => this.grid.append(this.tile(m)));
        this.status.textContent = json.data.length ? `${json.data.length} file(s) — click one to select it.` : 'No files yet. Upload one.';
    },
    tile(m) {
        return h('button', { type: 'button', class: 'group overflow-hidden rounded-lg border border-line bg-surface text-left hover:border-brand-500 hover:ring-4 hover:ring-brand-100', onclick: () => this.close(m) },
            m.is_image ? h('img', { src: m.thumb, alt: '', class: 'aspect-square w-full object-contain bg-[repeating-conic-gradient(#f1f3f5_0_25%,#fff_0_50%)] bg-[length:16px_16px]' })
                : h('div', { class: 'grid aspect-square place-items-center text-xs font-bold text-muted' }, 'PDF'),
            h('p', { class: 'truncate px-2 py-1.5 text-[11px] text-muted' }, m.name));
    },
    async upload(files) {
        for (const f of files) {
            this.status.textContent = `Uploading ${f.name}…`;
            const fd = new FormData();
            fd.append('files[]', f);
            const res = await fetch('/admin/media', { method: 'POST', body: fd, headers: { 'X-CSRF-TOKEN': CSRF, Accept: 'application/json' } });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) { this.status.textContent = json.message || 'Upload failed.'; return; }
        }
        this.load('');
    },
};
window.MediaPicker = MediaPicker;

/* Single media field: <div data-media-input data-name="cover_id" data-value="12" data-url="…" data-label="…"> */
function mediaInput(root) {
    const name = root.dataset.name;
    let value = root.dataset.value || '';
    let url = root.dataset.url || '';
    const input = h('input', { type: 'hidden', name, value });
    const render = () => {
        root.innerHTML = '';
        input.value = value;
        root.append(input, h('div', { class: 'flex items-center gap-3' },
            h('div', { class: 'grid size-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-surface' },
                url ? h('img', { src: url, alt: '', class: 'size-full object-contain' }) : h('span', { class: 'text-[11px] text-muted' }, 'No image')),
            h('div', { class: 'flex flex-col gap-1.5' },
                h('button', { type: 'button', class: 'a-btn a-btn-outline a-btn-sm', onclick: async () => {
                    const m = await MediaPicker.open({ imagesOnly: root.dataset.any !== '1' });
                    if (m) { value = m.id; url = m.thumb; render(); }
                } }, value ? 'Replace' : 'Choose…'),
                value ? h('button', { type: 'button', class: 'a-btn a-btn-ghost a-btn-sm', onclick: () => { value = ''; url = ''; render(); } }, 'Remove') : null)));
    };
    render();
}

/* ------------------------------------------------------------------ rich text */
function mountRte(host, { initial = '', onChange, tall = false }) {
    host.classList.add('rte');
    if (tall) host.classList.add('rte-tall');
    const bar = h('div', { class: 'rte-bar' });
    const area = h('div');
    host.append(bar, area);
    const editor = new Editor({
        element: area,
        extensions: [StarterKit.configure({ heading: { levels: [2, 3] }, link: false }), Link.configure({ openOnClick: false }), Image],
        content: initial || '',
        onUpdate: ({ editor: e }) => onChange(e.isEmpty ? '' : e.getHTML()),
        onSelectionUpdate: () => sync(),
        onTransaction: () => sync(),
    });
    const btns = [
        ['B', 'Bold', () => editor.chain().focus().toggleBold().run(), () => editor.isActive('bold')],
        ['I', 'Italic', () => editor.chain().focus().toggleItalic().run(), () => editor.isActive('italic')],
        ['H2', 'Heading', () => editor.chain().focus().toggleHeading({ level: 2 }).run(), () => editor.isActive('heading', { level: 2 })],
        ['H3', 'Subheading', () => editor.chain().focus().toggleHeading({ level: 3 }).run(), () => editor.isActive('heading', { level: 3 })],
        ['• List', 'Bullet list', () => editor.chain().focus().toggleBulletList().run(), () => editor.isActive('bulletList')],
        ['1. List', 'Numbered list', () => editor.chain().focus().toggleOrderedList().run(), () => editor.isActive('orderedList')],
        ['❝', 'Quote', () => editor.chain().focus().toggleBlockquote().run(), () => editor.isActive('blockquote')],
        ['Link', 'Link', () => {
            const prev = editor.getAttributes('link').href || '';
            const href = window.prompt('Link URL (https://…, /fr/page, mailto:…). Leave empty to remove.', prev);
            if (href === null) return;
            if (href === '') editor.chain().focus().unsetLink().run();
            else editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
        }, () => editor.isActive('link')],
        ['Image', 'Insert image', async () => {
            const m = await MediaPicker.open();
            if (m) editor.chain().focus().setImage({ src: m.url, alt: m.alt || '' }).run();
        }, () => false],
        ['↶', 'Undo', () => editor.chain().focus().undo().run(), () => false],
        ['↷', 'Redo', () => editor.chain().focus().redo().run(), () => false],
    ];
    const els = btns.map(([label, title, run]) => {
        const b = h('button', { type: 'button', title, onclick: run }, label);
        bar.append(b);
        return b;
    });
    function sync() { els.forEach((b, i) => b.classList.toggle('is-on', btns[i][3]())); }
    return editor;
}

/* <div data-rte data-target="#body_fr" data-tall> bound to a textarea */
function initRteFields(scope = document) {
    scope.querySelectorAll('[data-rte]').forEach((host) => {
        if (host.dataset.mounted) return;
        host.dataset.mounted = '1';
        const target = document.querySelector(host.dataset.target);
        mountRte(host, { initial: target.value, tall: host.hasAttribute('data-tall'), onChange: (v) => { target.value = v; } });
    });
}

/* ------------------------------------------------------------------ block editor */
class BlockEditor {
    constructor(root) {
        this.root = root;
        this.schema = JSON.parse(root.dataset.schema);
        this.sections = JSON.parse(root.dataset.sections || '[]');
        this.media = JSON.parse(root.dataset.media || '{}');
        this.icons = JSON.parse(root.dataset.icons || '[]');
        this.input = document.querySelector(root.dataset.input);
        this.open = new Set(this.sections.length <= 2 ? this.sections.map((b) => b.id) : []);
        this.editors = [];
        this.dirty = false;
        this.render();
        this.input.form.addEventListener('submit', () => { this.sync(); this.dirty = false; });
        window.addEventListener('beforeunload', (e) => { if (this.dirty) { e.preventDefault(); e.returnValue = ''; } });
    }
    touch() { this.dirty = true; this.sync(); }
    sync() { this.input.value = JSON.stringify(this.sections); }

    blank(type) {
        const fields = this.schema[type].fields;
        const data = {};
        for (const [k, s] of Object.entries(fields)) data[k] = this.blankValue(s);
        return { id: uid(), type, visible: true, data };
    }
    blankValue(s) {
        if (s.type === 'repeater') return [];
        if (s.type === 'link') return { label: { fr: '', en: '' }, url: '' };
        if (s.type === 'toggle') return false;
        if (s.type === 'select') return Object.keys(s.options)[0];
        if (s.type === 'image' || s.type === 'number') return null;
        return s.t ? { fr: '', en: '' } : '';
    }

    render() {
        this.editors.forEach((e) => e.destroy());
        this.editors = [];
        this.root.innerHTML = '';
        const list = h('div', { class: 'space-y-3' });
        this.sections.forEach((b, i) => list.append(this.renderBlock(b, i)));
        if (!this.sections.length) list.append(h('div', { class: 'a-card p-10 text-center text-muted' }, 'This page has no blocks yet. Add the first one below.'));
        this.root.append(list, this.renderAdd());
        this.sync();
    }

    renderAdd() {
        const wrap = h('div', { class: 'mt-4' });
        const grid = h('div', { class: 'grid gap-2 sm:grid-cols-2 lg:grid-cols-3 hidden' });
        for (const [type, def] of Object.entries(this.schema)) {
            grid.append(h('button', { type: 'button', class: 'rounded-lg border border-line bg-white p-3 text-left hover:border-brand-500', onclick: () => {
                const b = this.blank(type);
                this.sections.push(b);
                this.open.add(b.id);
                this.touch();
                this.render();
                this.root.querySelector(`[data-block="${b.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } }, h('span', { class: 'block text-[13px] font-semibold' }, def.label), def.description ? h('span', { class: 'mt-0.5 block text-xs text-muted' }, def.description) : null));
        }
        wrap.append(h('button', { type: 'button', class: 'a-btn a-btn-dark w-full py-3', onclick: () => grid.classList.toggle('hidden') }, '+ Add a block'), h('div', { class: 'mt-3' }, grid));
        return wrap;
    }

    summary(b) {
        const d = b.data || {};
        for (const k of ['title', 'text', 'eyebrow', 'form_title']) {
            const v = d[k];
            const s = v && typeof v === 'object' ? (v.fr || v.en) : v;
            if (s) return s;
        }
        return '';
    }

    renderBlock(b, i) {
        const def = this.schema[b.type];
        const isOpen = this.open.has(b.id);
        const act = (label, title, fn, cls = '') => h('button', { type: 'button', title, class: `a-btn a-btn-ghost a-btn-sm ${cls}`, onclick: (e) => { e.stopPropagation(); fn(); } }, label);
        const header = h('div', { class: 'flex cursor-pointer items-center gap-3 px-4 py-3', onclick: () => { isOpen ? this.open.delete(b.id) : this.open.add(b.id); this.render(); } },
            h('span', { class: 'grid size-7 shrink-0 place-items-center rounded-md bg-surface text-xs font-bold text-muted' }, String(i + 1)),
            h('div', { class: 'min-w-0 flex-1' },
                h('p', { class: 'text-[13.5px] font-semibold' }, def.label, b.visible ? null : h('span', { class: 'a-badge a-badge-gray ml-2' }, 'Hidden')),
                h('p', { class: 'truncate text-xs text-muted' }, this.summary(b))),
            act('↑', 'Move up', () => { if (i > 0) { [this.sections[i - 1], this.sections[i]] = [this.sections[i], this.sections[i - 1]]; this.touch(); this.render(); } }),
            act('↓', 'Move down', () => { if (i < this.sections.length - 1) { [this.sections[i + 1], this.sections[i]] = [this.sections[i], this.sections[i + 1]]; this.touch(); this.render(); } }),
            act(b.visible ? 'Hide' : 'Show', 'Show or hide on the website', () => { b.visible = !b.visible; this.touch(); this.render(); }),
            act('Duplicate', 'Duplicate', () => { const c = clone(b); c.id = uid(); this.sections.splice(i + 1, 0, c); this.open.add(c.id); this.touch(); this.render(); }),
            act('Delete', 'Delete block', () => { if (confirm(`Delete the “${def.label}” block?`)) { this.sections.splice(i, 1); this.touch(); this.render(); } }, 'text-brand-600'),
            h('span', { class: `ml-1 text-muted transition ${isOpen ? 'rotate-180' : ''}` }, '▾'));
        const card = h('div', { class: `a-card ${b.visible ? '' : 'opacity-70'}`, 'data-block': b.id }, header);
        if (isOpen) {
            const body = h('div', { class: 'grid gap-5 border-t border-line p-5 md:grid-cols-2' });
            for (const [k, s] of Object.entries(def.fields)) body.append(this.field(s, b.data, k));
            card.append(body);
        }
        return card;
    }

    field(s, obj, key, compact = false) {
        if (obj[key] === undefined) obj[key] = this.blankValue(s);
        const wide = ['textarea', 'richtext', 'repeater'].includes(s.type) || (s.t && s.type === 'text' && /title|subtitle|text|body/.test(key));
        const wrap = h('div', { class: wide && !compact ? 'md:col-span-2' : '' });
        const label = h('label', { class: 'a-label' }, s.label, s.t ? h('span', { class: 'lang-pill bg-ink text-white t-fr' }, 'FR') : null, s.t ? h('span', { class: 'lang-pill bg-ink text-white t-en' }, 'EN') : null);
        wrap.append(label);
        const on = () => this.touch();

        if (s.type === 'repeater') {
            wrap.append(this.repeater(s, obj, key));
            return wrap;
        }
        if (s.type === 'link') {
            const v = obj[key];
            v.label ??= { fr: '', en: '' };
            const row = h('div', { class: 'grid gap-2 sm:grid-cols-2' });
            for (const l of LOCALES) {
                row.append(h('input', { class: `a-input t-${l}`, placeholder: `Button text (${l.toUpperCase()})`, value: v.label[l] ?? '', oninput: (e) => { v.label[l] = e.target.value; on(); } }));
            }
            row.append(h('input', { class: 'a-input', placeholder: 'Link: /contact-us or https://…', value: v.url ?? '', oninput: (e) => { v.url = e.target.value; on(); } }));
            wrap.append(row, h('p', { class: 'a-help' }, 'Internal links like /about get the right language automatically. Leave empty to hide the button.'));
            return wrap;
        }
        if (s.type === 'image') {
            const holder = h('div');
            const m = this.media[obj[key]];
            holder.append(h('div', { class: 'flex items-center gap-3' },
                h('div', { class: 'grid size-20 place-items-center overflow-hidden rounded-lg border border-line bg-surface' }, m ? h('img', { src: m.thumb, class: 'size-full object-contain', alt: '' }) : h('span', { class: 'text-[11px] text-muted' }, 'No image')),
                h('div', { class: 'flex flex-col gap-1.5' },
                    h('button', { type: 'button', class: 'a-btn a-btn-outline a-btn-sm', onclick: async () => { const x = await MediaPicker.open(); if (x) { this.media[x.id] = x; obj[key] = x.id; on(); this.render(); } } }, obj[key] ? 'Replace' : 'Choose…'),
                    obj[key] ? h('button', { type: 'button', class: 'a-btn a-btn-ghost a-btn-sm', onclick: () => { obj[key] = null; on(); this.render(); } }, 'Remove') : null)));
            wrap.append(holder);
            return wrap;
        }
        if (s.type === 'select') {
            const sel = h('select', { class: 'a-input', onchange: (e) => { obj[key] = e.target.value; on(); } });
            for (const [v, l] of Object.entries(s.options)) sel.append(h('option', { value: v, selected: String(obj[key]) === v }, l));
            wrap.append(sel);
            return wrap;
        }
        if (s.type === 'icon') {
            const sel = h('select', { class: 'a-input', onchange: (e) => { obj[key] = e.target.value; on(); } }, h('option', { value: '' }, '— none —'));
            this.icons.filter((n) => !n.startsWith('brand-')).forEach((n) => sel.append(h('option', { value: n, selected: obj[key] === n }, n)));
            wrap.append(sel);
            return wrap;
        }
        if (s.type === 'toggle') {
            wrap.innerHTML = '';
            wrap.append(h('label', { class: 'flex items-center gap-2 pt-6 text-[13px] font-medium' },
                h('input', { type: 'checkbox', checked: !!obj[key], class: 'size-4 accent-[#8c1a13]', onchange: (e) => { obj[key] = e.target.checked; on(); } }), s.label));
            return wrap;
        }
        if (s.type === 'number') {
            wrap.append(h('input', { type: 'number', step: 'any', class: 'a-input', value: obj[key] ?? '', oninput: (e) => { obj[key] = e.target.value === '' ? null : Number(e.target.value); on(); } }));
            return wrap;
        }
        if (s.type === 'richtext') {
            if (!obj[key] || typeof obj[key] !== 'object') obj[key] = { fr: '', en: '' };
            for (const l of LOCALES) {
                const host = h('div', { class: `t-${l}` });
                wrap.append(host);
                this.editors.push(mountRte(host, { initial: obj[key][l], onChange: (v) => { obj[key][l] = v; on(); } }));
            }
            return wrap;
        }
        // text / textarea, translatable or not
        const make = (val, set, cls = '') => s.type === 'textarea'
            ? h('textarea', { class: `a-input ${cls}`, rows: compact ? 2 : 3, oninput: (e) => { set(e.target.value); on(); } }, val ?? '')
            : h('input', { class: `a-input ${cls}`, value: val ?? '', oninput: (e) => { set(e.target.value); on(); } });
        if (s.t) {
            if (!obj[key] || typeof obj[key] !== 'object') obj[key] = { fr: obj[key] || '', en: '' };
            for (const l of LOCALES) wrap.append(make(obj[key][l], (v) => { obj[key][l] = v; }, `t-${l}`));
        } else {
            wrap.append(make(obj[key], (v) => { obj[key] = v; }));
        }
        return wrap;
    }

    repeater(s, obj, key) {
        if (!Array.isArray(obj[key])) obj[key] = [];
        const rows = obj[key];
        const box = h('div', { class: 'space-y-2 rounded-lg border border-dashed border-line bg-surface/60 p-3' });
        rows.forEach((row, i) => {
            const inner = h('div', { class: 'grid flex-1 gap-3 sm:grid-cols-2' });
            for (const [k, fs] of Object.entries(s.fields)) inner.append(this.field(fs, row, k, true));
            box.append(h('div', { class: 'flex gap-3 rounded-lg border border-line bg-white p-3' },
                h('span', { class: 'pt-1 text-xs font-bold text-muted' }, String(i + 1)), inner,
                h('div', { class: 'flex flex-col gap-1' },
                    h('button', { type: 'button', class: 'a-btn a-btn-ghost a-btn-sm', title: 'Up', onclick: () => { if (i > 0) { [rows[i - 1], rows[i]] = [rows[i], rows[i - 1]]; this.touch(); this.render(); } } }, '↑'),
                    h('button', { type: 'button', class: 'a-btn a-btn-ghost a-btn-sm', title: 'Down', onclick: () => { if (i < rows.length - 1) { [rows[i + 1], rows[i]] = [rows[i], rows[i + 1]]; this.touch(); this.render(); } } }, '↓'),
                    h('button', { type: 'button', class: 'a-btn a-btn-ghost a-btn-sm text-brand-600', title: 'Remove', onclick: () => { rows.splice(i, 1); this.touch(); this.render(); } }, '✕'))));
        });
        box.append(h('button', { type: 'button', class: 'a-btn a-btn-outline a-btn-sm', onclick: () => {
            const r = {};
            for (const [k, fs] of Object.entries(s.fields)) r[k] = this.blankValue(fs);
            rows.push(r);
            this.touch();
            this.render();
        } }, '+ Add item'));
        return box;
    }
}

/* ------------------------------------------------------------------ JSON list editor for settings (nav/footer) */
Alpine.data('jsonList', (initial = [], blank = {}) => ({
    items: initial,
    add() { this.items.push(clone(blank)); },
    remove(i) { this.items.splice(i, 1); },
    up(i) { if (i > 0) [this.items[i - 1], this.items[i]] = [this.items[i], this.items[i - 1]]; },
    down(i) { if (i < this.items.length - 1) [this.items[i + 1], this.items[i]] = [this.items[i], this.items[i + 1]]; },
    get json() { return JSON.stringify(this.items); },
}));

Alpine.data('slugField', (initial = '', locked = false) => ({
    slug: initial,
    touched: !!initial,
    locked,
    fromTitle(v) { if (!this.touched && !this.locked) this.slug = slugify(v); },
}));
function slugify(v) {
    return String(v).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

/* ------------------------------------------------------------------ boot */
document.addEventListener('DOMContentLoaded', () => {
    initLang();
    document.querySelectorAll('[data-block-editor]').forEach((el) => { window.blockEditor = new BlockEditor(el); });
    document.querySelectorAll('[data-media-input]').forEach(mediaInput);
    initRteFields();
    document.querySelectorAll('[data-confirm]').forEach((f) => f.addEventListener('submit', (e) => { if (!confirm(f.dataset.confirm)) e.preventDefault(); }));
    document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(b.dataset.copy); const t = b.textContent; b.textContent = 'Copied'; setTimeout(() => { b.textContent = t; }, 1500); } catch { /* ignore */ }
    }));
});

window.Alpine = Alpine;
window.escHtml = esc;
Alpine.start();
