/**
 * api.js
 * ─────────────────────────────────────────────────────────────────
 * Data config for the "Payment API & Infrastructure" solution page.
 * This page is used by /solutions/api and follows the same
 * section-driven layout as the other solution pages.
 * ─────────────────────────────────────────────────────────────────
 */

const api = {
  namespace: "api",
  meta: {
    title: "meta.title",
    description: "meta.description",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "hero.badge",
        headline: "hero.headline",
        sub: "hero.sub",
        primaryCta: { label: "hero.primaryCta.label", href: "/signup" },
        secondaryCta: { label: "hero.secondaryCta.label", href: "/contact" },
        accent: "#7c3aed",
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "features1.eyebrow",
        headline: "features1.headline",
        items: [
          {
            icon: "code",
            title: "features1.items.0.title",
            body: "features1.items.0.body",
          },
          {
            icon: "lock",
            title: "features1.items.1.title",
            body: "features1.items.1.body",
          },
          {
            icon: "globe",
            title: "features1.items.2.title",
            body: "features1.items.2.body",
          },
          {
            icon: "chart",
            title: "features1.items.3.title",
            body: "features1.items.3.body",
          },
          {
            icon: "clock",
            title: "features1.items.4.title",
            body: "features1.items.4.body",
          },
          {
            icon: "shield",
            title: "features1.items.5.title",
            body: "features1.items.5.body",
          },
        ],
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "99.99%", label: "stats.items.0.label" },
          { value: "< 50ms", label: "stats.items.1.label" },
          { value: "100+", label: "stats.items.2.label" },
          { value: "24/7", label: "stats.items.3.label" },
        ],
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "features2.eyebrow",
        headline: "features2.headline",
        items: [
          {
            icon: "card",
            title: "features2.items.0.title",
            body: "features2.items.0.body",
          },
          {
            icon: "lock",
            title: "features2.items.1.title",
            body: "features2.items.1.body",
          },
          {
            icon: "globe",
            title: "features2.items.2.title",
            body: "features2.items.2.body",
          },
          {
            icon: "code",
            title: "features2.items.3.title",
            body: "features2.items.3.body",
          },
          {
            icon: "chart",
            title: "features2.items.4.title",
            body: "features2.items.4.body",
          },
          {
            icon: "shield",
            title: "features2.items.5.title",
            body: "features2.items.5.body",
          },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "cta.headline",
        sub: "cta.sub",
        primaryCta: { label: "cta.primaryCta.label", href: "/signup" },
        secondaryCta: { label: "cta.secondaryCta.label", href: "/contact" },
        trust: "cta.trust",
      },
    },
  ],
};

export default api;
