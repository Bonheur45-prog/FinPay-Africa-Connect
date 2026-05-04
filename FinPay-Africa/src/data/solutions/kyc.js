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
    title: "meta.title",
    description:
      "meta.description",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "hero.badge",
        headline: "hero.headline",
        sub:
          "hero.sub",
        primaryCta:   { label: "hero.primaryCta.label",       href: "/signup"  },
        secondaryCta: { label: "hero.secondaryCta.label",         href: "/docs"    },
        accent: "#22c55e",
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 8s",  label: "stats.items.0.label"     },
          { value: "98.4%", label: "stats.items.1.label" },
          { value: "50+",   label: "stats.items.2.label"},
          { value: "22",    label: "stats.items.3.label"},
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
            icon: "shield",
            title: "features.items.0.title",
            body:
              "features.items.0.body",
          },
          {
            icon: "lightning",
            title: "features.items.1.title",
            body:
              "features.items.1.body",
          },
          {
            icon: "globe",
            title: "features.items.2.title",
            body:
              "features.items.2.body",
          },
          {
            icon: "chart",
            title: "features.items.3.title",
            body:
              "features.items.3.body",
          },
          {
            icon: "code",
            title: "features.items.4.title",
            body:
              "features.items.4.body",
          },
          {
            icon: "clock",
            title: "features.items.5.title",
            body:
              "features.items.5.body",
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
        primaryCta:   { label: "cta.primaryCta.label",      href: "/signup"  },
        secondaryCta: { label: "cta.secondaryCta.label",    href: "/contact" },
        trust: "cta.trust",
      },
    },
  ],
};

export default kyc;