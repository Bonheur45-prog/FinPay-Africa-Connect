/**
 * api.js
 * ─────────────────────────────────────────────────────────────────
 * Data config for the "Payment API & Infrastructure" solution page.
 * This page is used by /solutions/api and follows the same
 * section-driven layout as the other solution pages.
 * ─────────────────────────────────────────────────────────────────
 */

const api = {
  meta: {
    title: "api.meta.title",
    description: "api.meta.description",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "api.hero.badge",
        headline: "api.hero.headline",
        sub: "api.hero.sub",
        primaryCta: { label: "api.hero.primaryCta.label", href: "/signup" },
        secondaryCta: { label: "api.hero.secondaryCta.label", href: "/contact" },
        accent: "#7c3aed",
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "api.features1.eyebrow",
        headline: "api.features1.headline",
        items: [
          {
            icon: "code",
            title: "api.features1.items.0.title",
            body: "api.features1.items.0.body",
          },
          {
            icon: "lock",
            title: "api.features1.items.1.title",
            body: "api.features1.items.1.body",
          },
          {
            icon: "globe",
            title: "api.features1.items.2.title",
            body: "api.features1.items.2.body",
          },
          {
            icon: "chart",
            title: "api.features1.items.3.title",
            body: "api.features1.items.3.body",
          },
          {
            icon: "clock",
            title: "api.features1.items.4.title",
            body: "api.features1.items.4.body",
          },
          {
            icon: "shield",
            title: "api.features1.items.5.title",
            body: "api.features1.items.5.body",
          },
        ],
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "99.99%", label: "api.stats.items.0.label" },
          { value: "< 50ms", label: "api.stats.items.1.label" },
          { value: "100+", label: "api.stats.items.2.label" },
          { value: "24/7", label: "api.stats.items.3.label" },
        ],
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "api.features2.eyebrow",
        headline: "api.features2.headline",
        items: [
          {
            icon: "card",
            title: "api.features2.items.0.title",
            body: "api.features2.items.0.body",
          },
          {
            icon: "lock",
            title: "api.features2.items.1.title",
            body: "api.features2.items.1.body",
          },
          {
            icon: "globe",
            title: "api.features2.items.2.title",
            body: "api.features2.items.2.body",
          },
          {
            icon: "code",
            title: "api.features2.items.3.title",
            body: "api.features2.items.3.body",
          },
          {
            icon: "chart",
            title: "api.features2.items.4.title",
            body: "api.features2.items.4.body",
          },
          {
            icon: "shield",
            title: "api.features2.items.5.title",
            body: "api.features2.items.5.body",
          },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "api.cta.headline",
        sub: "api.cta.sub",
        primaryCta: { label: "api.cta.primaryCta.label", href: "/signup" },
        secondaryCta: { label: "api.cta.secondaryCta.label", href: "/contact" },
        trust: "api.cta.trust",
      },
    },
  ],
};

export default api;
