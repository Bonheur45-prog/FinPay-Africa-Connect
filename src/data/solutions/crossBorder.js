const crossBorder = {
  slug: "cross-border",
  namespace: "crossBorder",

  meta: {
    title: "crossBorder.meta.title",
    description: "crossBorder.meta.description",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "crossBorder.hero.badge",
        headline: "crossBorder.hero.headline",
        sub: "crossBorder.hero.sub",
        primaryCta:   { label: "crossBorder.hero.primaryCta.label",          href: "/signup"  },
        secondaryCta: { label: "crossBorder.hero.secondaryCta.label",   href: "/docs"    },
        accent: "#f59e0b",
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "crossBorder.features.eyebrow",
        headline: "crossBorder.features.headline",
        items: [
          {
            icon: "globe",
            title: "crossBorder.features.items.0.title",
            body: "crossBorder.features.items.0.body",
          },
          {
            icon: "lightning",
            title: "crossBorder.features.items.1.title",
            body: "crossBorder.features.items.1.body",
          },
          {
            icon: "chart",
            title: "crossBorder.features.items.2.title",
            body: "crossBorder.features.items.2.body",
          },
          {
            icon: "shield",
            title: "crossBorder.features.items.3.title",
            body: "crossBorder.features.items.3.body",
          },
          {
            icon: "code",
            title: "crossBorder.features.items.4.title",
            body: "crossBorder.features.items.4.body",
          },
          {
            icon: "lock",
            title: "crossBorder.features.items.5.title",
            body: "crossBorder.features.items.5.body",
          },
        ],
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 60s", label: "crossBorder.stats.items.0.label" },
          { value: "150+",  label: "crossBorder.stats.items.1.label" },
          { value: "0.8%",  label: "crossBorder.stats.items.2.label" },
          { value: "$2M+",  label: "crossBorder.stats.items.3.label" },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "crossBorder.cta.headline",
        sub: "crossBorder.cta.sub",
        primaryCta:   { label: "crossBorder.cta.primaryCta.label",  href: "/signup"  },
        secondaryCta: { label: "crossBorder.cta.secondaryCta.label",    href: "/contact" },
        trust: "crossBorder.cta.trust",
      },
    },
  ],
};

export default crossBorder;