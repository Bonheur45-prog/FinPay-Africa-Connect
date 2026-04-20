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
  slug: "cards",

  meta: {
    title: "Virtual & Physical Cards — FinPay Africa",
    description:
      "Issue branded cards to customers and employees. " +
      "Real-time spend controls, worldwide acceptance.",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "Cards Issuing",
        headline: "Your brand,\nin every wallet",
        sub:
          "Issue branded virtual or physical Visa / Mastercard cards to anyone " +
          "in Africa. Real-time spend controls. Instant freeze. Zero card-present fraud.",
        primaryCta:   { label: "Get your card programme", href: "/signup"   },
        secondaryCta: { label: "View documentation",      href: "/docs"     },
        accent: "#8C1A13",
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 30s",  label: "Card issuance time"   },
          { value: "190+",   label: "Countries accepted"   },
          { value: "0%",     label: "Card-present fraud"   },
          { value: "Real-time", label: "Spend controls"    },
        ],
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "Everything included",
        headline: "One platform,\nevery card type",
        items: [
          {
            icon: "card",
            title: "Virtual cards — instant",
            body:
              "Spin up virtual cards for online payments, subscriptions, " +
              "or employee expenses in under 30 seconds via API or dashboard.",
          },
          {
            icon: "globe",
            title: "Physical card production",
            body:
              "White-label physical cards with your brand, chip, contactless, " +
              "and PIN. Delivered anywhere in Africa within 5 business days.",
          },
          {
            icon: "shield",
            title: "Real-time spend controls",
            body:
              "Set limits by category, merchant, time, geography, or amount. " +
              "Freeze / unfreeze any card in milliseconds via API.",
          },
          {
            icon: "chart",
            title: "Transaction reporting",
            body:
              "Live transaction feeds, categorised spend analytics, and " +
              "exportable statements — for your finance team or your customers.",
          },
          {
            icon: "lightning",
            title: "Instant top-up",
            body:
              "Fund cards directly from your FinPay wallet. Real-time balance " +
              "updates pushed to your system via Webhooks.",
          },
          {
            icon: "code",
            title: "Full API control",
            body:
              "Create, fund, freeze, and close cards programmatically. " +
              "Embed card management into your own app with our white-label SDK.",
          },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "Launch your card\nprogramme today",
        sub: "From fintech startups to enterprise — we scale with you.",
        primaryCta:   { label: "Start issuing cards", href: "/signup"   },
        secondaryCta: { label: "Talk to our team",    href: "/contact"  },
        trust: "Visa & Mastercard certified · No minimum volume · Full API access",
      },
    },
  ],
};

export default cards;