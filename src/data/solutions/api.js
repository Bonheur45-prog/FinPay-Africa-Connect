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
    title: "Payment API & Infrastructure — FinPay Africa",
    description:
      "Build payment-enabled apps with a unified API, secure infrastructure, " +
      "and local settlement rails designed for African markets.",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "Payment API",
        headline: "Power payments with one API and enterprise-grade infrastructure",
        sub:
          "Integrate checkout, reconciliation, compliance and settlement " +
          "with a single platform built for Africa’s fastest growing apps.",
        primaryCta: { label: "Explore the API", href: "/signup" },
        secondaryCta: { label: "Request a demo", href: "/contact" },
        accent: "#7c3aed",
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "Developer-first infrastructure",
        headline: "One API. Multiple payment rails. Zero infrastructure overhead.",
        items: [
          {
            icon: "code",
            title: "Unified payment endpoints",
            body:
              "Accept cards, bank transfers, mobile money and wallets through one " +
              "REST API with SDKs for web and mobile.",
          },
          {
            icon: "lock",
            title: "PCI-ready security",
            body:
              "Hosted tokenization, secure vaults, and compliance checks built " +
              "into every payment flow.",
          },
          {
            icon: "globe",
            title: "Local settlement rails",
            body:
              "Connected to local banks, wallets and cash networks across Africa " +
              "for fast, compliant payouts.",
          },
          {
            icon: "chart",
            title: "Smart routing",
            body:
              "Route payments automatically on cost, speed, and currency availability " +
              "for the best customer experience.",
          },
          {
            icon: "clock",
            title: "Real-time reconciliation",
            body:
              "Track settlements, refunds and disputes instantly with webhooks " +
              "and ledger-ready reporting.",
          },
          {
            icon: "shield",
            title: "Built-in compliance",
            body:
              "KYC, AML and sanctions screening are embedded in the payment path, " +
              "so every transaction stays compliant.",
          },
        ],
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "99.99%", label: "API uptime" },
          { value: "< 50ms", label: "Average response time" },
          { value: "100+", label: "Integration endpoints" },
          { value: "24/7", label: "Infrastructure monitoring" },
        ],
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "Infrastructure for scale",
        headline: "Secure, resilient systems for high-volume payments",
        items: [
          {
            icon: "card",
            title: "Payment orchestration",
            body:
              "A resilient core routes funds across rails with retries, fallback " +
              "paths and payout guarantees.",
          },
          {
            icon: "lock",
            title: "Enterprise security",
            body:
              "Role-based access, audit logs, and encryption protect your users " +
              "and your business.",
          },
          {
            icon: "globe",
            title: "Regional connectivity",
            body:
              "Local currency support and settlement partners in key African markets " +
              "reduce friction and speed payouts.",
          },
          {
            icon: "code",
            title: "SDKs & webhooks",
            body:
              "Ship faster with SDKs, ready-made UI components, and webhook events " +
              "for every payment lifecycle state.",
          },
          {
            icon: "chart",
            title: "Insightful dashboards",
            body:
              "Monitor transaction health, revenue metrics, and partner performance " +
              "from one analytics panel.",
          },
          {
            icon: "shield",
            title: "Fraud prevention",
            body:
              "Adaptive risk scoring and fraud rules reduce chargebacks and protect " +
              "customer trust.",
          },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "Launch payment APIs your team can trust",
        sub:
          "From startups to enterprise, use modern infrastructure that handles " +
          "payments, compliance, and settlement in one platform.",
        primaryCta: { label: "Start building", href: "/signup" },
        secondaryCta: { label: "Talk to sales", href: "/contact" },
        trust: "PCI-ready · ISO 27001 · Built for African payments",
      },
    },
  ],
};

export default api;
