const crossBorder = {
  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "Cross-Border Payments",
        headline: "Move money globally\nwith speed and transparency",
        sub: "Real-time settlement in 150+ countries. Transparent pricing. No hidden fees.",
        primaryCta:   { label: "Get started",          href: "/signup"  },
        secondaryCta: { label: "View documentation",   href: "/docs"    },
        accent: "#f59e0b",
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "Global coverage",
        headline: "Send money anywhere\nin seconds",
        items: [
          {
            icon: "globe",
            title: "150+ countries",
            body: "Real-time settlement to bank accounts and mobile wallets worldwide.",
          },
          {
            icon: "lightning",
            title: "Instant transfers",
            body: "Most corridors settle in under 60 seconds — no delays, no excuses.",
          },
          {
            icon: "chart",
            title: "Transparent pricing",
            body: "No hidden fees. Know your exact cost before you send.",
          },
          {
            icon: "shield",
            title: "Full compliance",
            body: "Built-in sanctions screening and AML checks on every transaction.",
          },
          {
            icon: "code",
            title: "API first",
            body: "Embed payments into your app. Webhooks for real-time settlement updates.",
          },
          {
            icon: "lock",
            title: "Enterprise-grade security",
            body: "Multi-signature payouts, fraud detection, and dispute resolution.",
          },
        ],
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 60s", label: "Settlement time" },
          { value: "150+",  label: "Countries covered" },
          { value: "0.8%",  label: "Average fee" },
          { value: "$2M+",  label: "Volume processed daily" },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "Start sending globally\ntoday",
        sub: "No setup fees. No minimum volume. Pay as you go.",
        primaryCta:   { label: "Open an account",  href: "/signup"  },
        secondaryCta: { label: "Talk to sales",    href: "/contact" },
        trust: "Supported by leading fintech investors · ISO 27001 certified",
      },
    },
  ],
};

export default crossBorder;