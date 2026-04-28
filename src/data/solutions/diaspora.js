/**
 * diaspora.js
 * ─────────────────────────────────────────────────────────────────
 * Data config for the "Diaspora Money Transfers" solution page.
 * This page is used by /solutions/diaspora and follows the same
 * section-driven layout as the other solution pages.
 * ─────────────────────────────────────────────────────────────────
 */

const diaspora = {
  meta: {
    title: "Diaspora Money Transfers — FinPay Africa",
    description:
      "Fast, low-cost money transfers for African diaspora communities. " +
      "Transparent FX, local payout options, and built-in compliance.",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "Diaspora Remittances",
        headline: "Send money home with speed, trust, and clarity",
        sub:
          "Low-fee transfers from Europe, North America and the Middle East " +
          "into Africa, with local payout rails, market-leading FX, and full compliance.",
        primaryCta: { label: "Start transfers", href: "/signup" },
        secondaryCta: { label: "Talk to sales", href: "/contact" },
        accent: "#8C1A13",
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "Diaspora-first payments",
        headline: "Deliver faster, safer remittances for every corridor",
        items: [
          {
            icon: "globe",
            title: "Global corridor coverage",
            body:
              "Support payouts from major diaspora hubs into local African accounts, " +
              "mobile wallets, and cash pickup partners.",
          },
          {
            icon: "lightning",
            title: "Fast settlement",
            body:
              "Most transfers settle in under 60 seconds with transparent routing " +
              "and real-time notification updates.",
          },
          {
            icon: "shield",
            title: "Built-in compliance",
            body:
              "AML screening, KYC checks, and sanctions filtering keep every transfer " +
              "safe and auditable.",
          },
          {
            icon: "chart",
            title: "Transparent FX pricing",
            body:
              "Show customers exact exchange rates and fees before they send, " +
              "with no hidden costs.",
          },
          {
            icon: "code",
            title: "Developer-friendly APIs",
            body:
              "Integrate remittance flows quickly with REST endpoints, webhooks, " +
              "and customizable payout journeys.",
          },
          {
            icon: "lock",
            title: "Secure onboardings",
            body:
              "Protect your brand with multi-layer fraud controls and secure settlement rails.",
          },
        ],
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 60s", label: "Average payout time" },
          { value: "99.9%", label: "Transfer completion rate" },
          { value: "24/7", label: "Support for diaspora corridors" },
          { value: "Multi-currency", label: "EUR, USD, GBP, AED, and more" },
        ],
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "Designed for diaspora trust",
        headline: "Connect families, businesses, and financial ecosystems",
        items: [
          {
            icon: "shield",
            title: "Regulated payout partners",
            body:
              "Work with licensed local payers and banks across Africa for fast, " +
              "compliant delivery.",
          },
          {
            icon: "globe",
            title: "Multi-rail support",
            body:
              "Offer bank transfers, mobile wallet credit, and cash collection in key markets.",
          },
          {
            icon: "card",
            title: "Consumer-friendly experience",
            body:
              "Keep the customer journey simple with clear fees, rate locking, " +
              "and instant status updates.",
          },
          {
            icon: "chart",
            title: "Data-driven insights",
            body:
              "Measure corridor performance, customer retention, and FX margins " +
              "from one dashboard.",
          },
          {
            icon: "code",
            title: "White-label flows",
            body:
              "Brand the remittance experience as your own while FinPay handles the rails.",
          },
          {
            icon: "lock",
            title: "Secure funding",
            body:
              "Protect customer deposits with strong settlement controls and secure wallets.",
          },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "Launch diaspora transfers with confidence",
        sub:
          "Enable low-cost, fast, compliant remittances for African diaspora customers.",
        primaryCta: { label: "Get started", href: "/signup" },
        secondaryCta: { label: "Book a demo", href: "/contact" },
        trust: "Trusted by diaspora fintechs · No setup fee · Full API control",
      },
    },
  ],
};

export default diaspora;
