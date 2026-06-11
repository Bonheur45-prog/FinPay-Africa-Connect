import { useEffect } from 'react';

function setMetaAttr(selector, attrName, attrValue, useProperty = false) {
  if (typeof attrValue === 'undefined') return;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (useProperty) el.setAttribute('property', attrName);
    else el.setAttribute('name', attrName);
    document.head.appendChild(el);
  }
  if (useProperty) el.setAttribute('property', attrName);
  else el.setAttribute('name', attrName);
  el.content = attrValue || '';
}

function setLinkRelCanonical(href) {
  if (typeof href === 'undefined') return;
  let link = document.querySelector('link[rel="canonical"][data-managed="HeadTitle"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    link.setAttribute('data-managed', 'HeadTitle');
    document.head.appendChild(link);
  }
  link.href = href;
}

function setHreflangs(items = []) {
  // remove previously managed hreflang links
  document.querySelectorAll('link[rel="alternate"][data-managed="HeadTitle"]').forEach(el => el.remove());
  items.forEach(({ href, lang }) => {
    if (!href || !lang) return;
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = href;
    link.setAttribute('data-managed', 'HeadTitle');
    document.head.appendChild(link);
  });
}

function setJsonLd(jsonLd) {
  // remove previous
  document.querySelectorAll('script[type="application/ld+json"][data-managed="HeadTitle"]').forEach(el => el.remove());
  if (!jsonLd) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-managed', 'HeadTitle');
  script.text = JSON.stringify(jsonLd);
  document.head.appendChild(script);
}

export default function HeadTitle({ title, description, canonical, og = {}, twitter = {}, hreflangs = [], jsonLd }) {
  useEffect(() => {
    if (title) document.title = title;

    if (typeof description !== 'undefined') {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description || '';
    }

    // canonical
    setLinkRelCanonical(canonical);

    // Open Graph
    if (og.title) setMetaAttr('meta[property="og:title"]', 'og:title', og.title, true);
    if (og.description) setMetaAttr('meta[property="og:description"]', 'og:description', og.description, true);
    if (og.url) setMetaAttr('meta[property="og:url"]', 'og:url', og.url, true);
    if (og.image) setMetaAttr('meta[property="og:image"]', 'og:image', og.image, true);
    if (og.type) setMetaAttr('meta[property="og:type"]', 'og:type', og.type, true);

    // Twitter
    if (twitter.card) setMetaAttr('meta[name="twitter:card"]', 'twitter:card', twitter.card);
    if (twitter.title) setMetaAttr('meta[name="twitter:title"]', 'twitter:title', twitter.title);
    if (twitter.description) setMetaAttr('meta[name="twitter:description"]', 'twitter:description', twitter.description);
    if (twitter.image) setMetaAttr('meta[name="twitter:image"]', 'twitter:image', twitter.image);

    // hreflang links
    setHreflangs(hreflangs);

    // JSON-LD
    setJsonLd(jsonLd);
  }, [title, description, canonical, JSON.stringify(og), JSON.stringify(twitter), JSON.stringify(hreflangs), JSON.stringify(jsonLd)]);

  return null;
}
