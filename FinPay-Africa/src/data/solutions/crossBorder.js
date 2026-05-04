const crossBorder = {
  slug: "cross-border",
  namespace: "crossBorder",

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
        primaryCta:   { label: "hero.primaryCta.label",          href: "/signup"  },
        secondaryCta: { label: "hero.secondaryCta.label",   href: "/docs"    },
        accent: "#f59e0b",
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
            icon: "globe",
            title: "features.items.0.title",
            body: "features.items.0.body",
          },
          {
            icon: "lightning",
            title: "features.items.1.title",
            body: "features.items.1.body",
          },
          {
            icon: "chart",
            title: "features.items.2.title",
            body: "features.items.2.body",
          },
          {
            icon: "shield",
            title: "features.items.3.title",
            body: "features.items.3.body",
          },
          {
            icon: "code",
            title: "features.items.4.title",
            body: "features.items.4.body",
          },
          {
            icon: "lock",
            title: "features.items.5.title",
            body: "features.items.5.body",
          },
        ],
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 60s", label: "stats.items.0.label" },
          { value: "150+",  label: "stats.items.1.label" },
          { value: "0.8%",  label: "stats.items.2.label" },
          { value: "$2M+",  label: "stats.items.3.label" },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "cta.headline",
        sub: "cta.sub",
        primaryCta:   { label: "cta.primaryCta.label",  href: "/signup"  },
        secondaryCta: { label: "cta.secondaryCta.label",    href: "/contact" },
        trust: "cta.trust",
      },
    },
  ],
};

export default crossBorder;