/**
 * kyc.js
 * ─────────────────────────────────────────────────────────────────
 * Data config for the "Identity & KYC Verification" solution page.
 * ─────────────────────────────────────────────────────────────────
 */

const kyc = {
  slug: "kyc",

  meta: {
    title: "Identity & KYC Verification — FinPay Africa",
    description:
      "Automated KYC and AML screening for fast, compliant onboarding " +
      "of individuals and businesses across Africa.",
  },

  sections: [
    {
      type: "hero",
      background: "particles",
      data: {
        badge: "Compliance",
        headline: "Know your customer.\nProtect your business.",
        sub:
          "Automated KYC, AML screening, and identity verification — " +
          "built for African ID types. Onboard in seconds. Stay compliant forever.",
        primaryCta:   { label: "Start verifying",       href: "/signup"  },
        secondaryCta: { label: "Read the docs",         href: "/docs"    },
        accent: "#22c55e",
      },
    },

    {
      type: "stats",
      background: "gradient",
      data: {
        items: [
          { value: "< 8s",  label: "Average KYC time"     },
          { value: "98.4%", label: "Verification accuracy" },
          { value: "50+",   label: "Sanction lists screened"},
          { value: "22",    label: "African ID types supported"},
        ],
      },
    },

    {
      type: "features",
      background: "gradient",
      data: {
        eyebrow: "Compliance at scale",
        headline: "Verify anyone,\nanywhere in Africa",
        items: [
          {
            icon: "shield",
            title: "Multi-document ID support",
            body:
              "National IDs, passports, driver licences, and voter cards — " +
              "from 54 African countries — verified with AI-powered OCR.",
          },
          {
            icon: "lightning",
            title: "Liveness detection",
            body:
              "Passive liveness checks in under 3 seconds. " +
              "Prevents spoofing with printed photos or recorded videos.",
          },
          {
            icon: "globe",
            title: "AML & sanctions screening",
            body:
              "Real-time screening against 50+ global sanction lists, PEP " +
              "databases, and adverse media — on every onboarding and transaction.",
          },
          {
            icon: "chart",
            title: "Risk-scored results",
            body:
              "Every verification returns a risk score with detailed reason codes, " +
              "so your compliance team can make fast, auditable decisions.",
          },
          {
            icon: "code",
            title: "No-code + API",
            body:
              "Drop in our hosted KYC flow with one line of code, or build " +
              "a fully custom journey using our headless Verification API.",
          },
          {
            icon: "clock",
            title: "Audit-ready records",
            body:
              "Every check is stored with timestamp, evidence, and decision log. " +
              "One-click export for regulator requests.",
          },
        ],
      },
    },

    {
      type: "cta",
      background: "gradient",
      data: {
        headline: "Compliant onboarding\nin minutes, not months",
        sub: "Trusted by licensed fintechs and banks across Africa.",
        primaryCta:   { label: "Try for free",      href: "/signup"  },
        secondaryCta: { label: "Request a demo",    href: "/contact" },
        trust: "GDPR & NDPR compliant · SOC 2 Type II · Data stays in-region",
      },
    },
  ],
};

export default kyc;