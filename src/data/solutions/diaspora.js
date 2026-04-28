/**
 * diaspora.js
 * ─────────────────────────────────────────────────────────────────
 * Data config for the "Diaspora Money Transfers" solution page.
 * This page is used by /solutions/diaspora and follows the same
 * section-driven layout as the other solution pages.
 * ─────────────────────────────────────────────────────────────────
 */

const diaspora = {
  namespace: "diaspora",
  meta: {
    title: "diaspora.meta.title",
    description: "diaspora.meta.description",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "diaspora.hero.badge",
        headline: "diaspora.hero.headline",
        sub: "diaspora.hero.sub",
        primaryCta: { label: "diaspora.hero.primaryCta.label", href: "/signup" },
        secondaryCta: { label: "diaspora.hero.secondaryCta.label", href: "/contact" },
        accent: "#8C1A13",
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "diaspora.features1.eyebrow",
        headline: "diaspora.features1.headline",
        items: [
          {
            icon: "globe",
            title: "diaspora.features1.items.0.title",
            body: "diaspora.features1.items.0.body",
          },
          {
            icon: "lightning",
            title: "diaspora.features1.items.1.title",
            body: "diaspora.features1.items.1.body",
          },
          {
            icon: "shield",
            title: "diaspora.features1.items.2.title",
            body: "diaspora.features1.items.2.body",
          },
          {
            icon: "chart",
            title: "diaspora.features1.items.3.title",
            body: "diaspora.features1.items.3.body",
          },
          {
            icon: "code",
            title: "diaspora.features1.items.4.title",
            body: "diaspora.features1.items.4.body",
          },
          {
            icon: "lock",
            title: "diaspora.features1.items.5.title",
            body: "diaspora.features1.items.5.body",
          },
        ],
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 60s", label: "diaspora.stats.items.0.label" },
          { value: "99.9%", label: "diaspora.stats.items.1.label" },
          { value: "24/7", label: "diaspora.stats.items.2.label" },
          { value: "Multi-currency", label: "diaspora.stats.items.3.label" },
        ],
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "diaspora.features2.eyebrow",
        headline: "diaspora.features2.headline",
        items: [
          {
            icon: "shield",
            title: "diaspora.features2.items.0.title",
            body: "diaspora.features2.items.0.body",
          },
          {
            icon: "globe",
            title: "diaspora.features2.items.1.title",
            body: "diaspora.features2.items.1.body",
          },
          {
            icon: "card",
            title: "diaspora.features2.items.2.title",
            body: "diaspora.features2.items.2.body",
          },
          {
            icon: "chart",
            title: "diaspora.features2.items.3.title",
            body: "diaspora.features2.items.3.body",
          },
          {
            icon: "code",
            title: "diaspora.features2.items.4.title",
            body: "diaspora.features2.items.4.body",
          },
          {
            icon: "lock",
            title: "diaspora.features2.items.5.title",
            body: "diaspora.features2.items.5.body",
          },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "diaspora.cta.headline",
        sub: "diaspora.cta.sub",
        primaryCta: { label: "diaspora.cta.primaryCta.label", href: "/signup" },
        secondaryCta: { label: "diaspora.cta.secondaryCta.label", href: "/contact" },
        trust: "diaspora.cta.trust",
      },
    },
  ],
};

export default diaspora;
