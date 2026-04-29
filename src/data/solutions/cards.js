/**
 * cards.js
 * ─────────────────────────────────────────────────────────────────
 * Data config for the "Virtual & Physical Cards" solution page.
 *
 * Identical shape to payments.js — different content.
 * No UI code lives here. Adding this file was all that was needed
 * to get a fully rendered /solutions/cards page.
 * ─────────────────────────────────────────────────────────────────
 */

const cards = {
  namespace: "cards",
  slug: "cards",

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
        primaryCta:   { label: "hero.primaryCta.label", href: "/signup"   },
        secondaryCta: { label: "hero.secondaryCta.label",      href: "/docs"     },
        accent: "#8C1A13",
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 30s",  label: "stats.items.0.label"   },
          { value: "190+",   label: "stats.items.1.label"   },
          { value: "0%",     label: "stats.items.2.label"   },
          { value: "Real-time", label: "stats.items.3.label"    },
        ],
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "features.eyebrow",
        headline: "features.headline",
        items: [
          {
            icon: "card",
            title: "features.items.0.title",
            body: "features.items.0.body",
          },
          {
            icon: "globe",
            title: "features.items.1.title",
            body: "features.items.1.body",
          },
          {
            icon: "shield",
            title: "features.items.2.title",
            body: "features.items.2.body",
          },
          {
            icon: "chart",
            title: "features.items.3.title",
            body: "features.items.3.body",
          },
          {
            icon: "lightning",
            title: "features.items.4.title",
            body: "features.items.4.body",
          },
          {
            icon: "code",
            title: "features.items.5.title",
            body: "features.items.5.body",
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
        primaryCta:   { label: "cta.primaryCta.label", href: "/signup"   },
        secondaryCta: { label: "cta.secondaryCta.label",    href: "/contact"  },
        trust: "cta.trust",
      },
    },
  ],
};

export default cards;