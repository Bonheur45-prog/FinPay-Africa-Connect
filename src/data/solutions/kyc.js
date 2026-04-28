/**
 * kyc.js
 * ─────────────────────────────────────────────────────────────────
 * Data config for the "Identity & KYC Verification" solution page.
 * ─────────────────────────────────────────────────────────────────
 */

const kyc = {
  slug: "kyc",
  namespace: "kyc",

  meta: {
    title: "kyc.meta.title",
    description:
      "kyc.meta.description",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "kyc.hero.badge",
        headline: "kyc.hero.headline",
        sub:
          "kyc.hero.sub",
        primaryCta:   { label: "kyc.hero.primaryCta.label",       href: "/signup"  },
        secondaryCta: { label: "kyc.hero.secondaryCta.label",         href: "/docs"    },
        accent: "#22c55e",
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 8s",  label: "kyc.stats.items.0.label"     },
          { value: "98.4%", label: "kyc.stats.items.1.label" },
          { value: "50+",   label: "kyc.stats.items.2.label"},
          { value: "22",    label: "kyc.stats.items.3.label"},
        ],
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "kyc.features.eyebrow",
        headline: "kyc.features.headline",
        items: [
          {
            icon: "shield",
            title: "kyc.features.items.0.title",
            body:
              "kyc.features.items.0.body",
          },
          {
            icon: "lightning",
            title: "kyc.features.items.1.title",
            body:
              "kyc.features.items.1.body",
          },
          {
            icon: "globe",
            title: "kyc.features.items.2.title",
            body:
              "kyc.features.items.2.body",
          },
          {
            icon: "chart",
            title: "kyc.features.items.3.title",
            body:
              "kyc.features.items.3.body",
          },
          {
            icon: "code",
            title: "kyc.features.items.4.title",
            body:
              "kyc.features.items.4.body",
          },
          {
            icon: "clock",
            title: "kyc.features.items.5.title",
            body:
              "kyc.features.items.5.body",
          },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "kyc.cta.headline",
        sub: "kyc.cta.sub",
        primaryCta:   { label: "kyc.cta.primaryCta.label",      href: "/signup"  },
        secondaryCta: { label: "kyc.cta.secondaryCta.label",    href: "/contact" },
        trust: "kyc.cta.trust",
      },
    },
  ],
};

export default kyc;