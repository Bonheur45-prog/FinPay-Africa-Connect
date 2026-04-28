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
    title: "cards.meta.title",
    description: "cards.meta.description",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "cards.hero.badge",
        headline: "cards.hero.headline",
        sub: "cards.hero.sub",
        primaryCta:   { label: "cards.hero.primaryCta.label", href: "/signup"   },
        secondaryCta: { label: "cards.hero.secondaryCta.label",      href: "/docs"     },
        accent: "#8C1A13",
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 30s",  label: "cards.stats.items.0.label"   },
          { value: "190+",   label: "cards.stats.items.1.label"   },
          { value: "0%",     label: "cards.stats.items.2.label"   },
          { value: "Real-time", label: "cards.stats.items.3.label"    },
        ],
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "cards.features.eyebrow",
        headline: "cards.features.headline",
        items: [
          {
            icon: "card",
            title: "cards.features.items.0.title",
            body: "cards.features.items.0.body",
          },
          {
            icon: "globe",
            title: "cards.features.items.1.title",
            body: "cards.features.items.1.body",
          },
          {
            icon: "shield",
            title: "cards.features.items.2.title",
            body: "cards.features.items.2.body",
          },
          {
            icon: "chart",
            title: "cards.features.items.3.title",
            body: "cards.features.items.3.body",
          },
          {
            icon: "lightning",
            title: "cards.features.items.4.title",
            body: "cards.features.items.4.body",
          },
          {
            icon: "code",
            title: "cards.features.items.5.title",
            body: "cards.features.items.5.body",
          },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "cards.cta.headline",
        sub: "cards.cta.sub",
        primaryCta:   { label: "cards.cta.primaryCta.label", href: "/signup"   },
        secondaryCta: { label: "cards.cta.secondaryCta.label",    href: "/contact"  },
        trust: "cards.cta.trust",
      },
    },
  ],
};

export default cards;