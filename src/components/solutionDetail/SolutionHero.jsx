/**
 * SolutionHero.jsx
 * ─────────────────────────────────────────────────────────────────
 * Full-screen hero section for individual solution pages.
 *
 * Props (all come straight from the data file — no mapping needed):
 *   badge        {string}  – small pill label e.g. "Flagship Product"
 *   headline     {string}  – main heading; use \n for manual line breaks
 *   sub          {string}  – supporting paragraph
 *   primaryCta   {{ label, href }}
 *   secondaryCta {{ label, href }}
 *   accent       {string}  – hex colour used for the badge tint
 *
 * Design decisions:
 * • Dark navy background — matches the global hero and wave connector
 *   so the page feels continuous when reached from CoreSolutions.
 * • Headline uses Fraunces (matches global heading style).
 * • Entrance animation is pure CSS — no JS animation library needed.
 * ─────────────────────────────────────────────────────────────────
 */

import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./SolutionHero.module.css";

export default function SolutionHero({
  badge,
  headline,
  sub,
  primaryCta,
  secondaryCta,
  accent = "#f59e0b",
  namespace = "solutions",
}) {
  const { t } = useTranslation(namespace);
  // Convert \n in the headline string to <br> elements for layout control
  const translatedHeadline = t(headline);
  const headlineLines = translatedHeadline.split("\n");

  return (
    <section className={styles.hero} aria-labelledby="sol-hero-heading">

      {/* Dot-grid texture — pure CSS, no image needed */}
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── Badge ───────────────────────────────────────────── */}
        <div
          className={styles.badge}
          style={{
            background: hexToAlpha(accent, 0.15),
            borderColor: hexToAlpha(accent, 0.4),
            color:       accent,
          }}
        >
          <span
            className={styles.badgeDot}
            style={{ background: accent }}
          />
          {t(badge)}
        </div>

        {/* ── Headline ────────────────────────────────────────── */}
        <h1 className={styles.headline} id="sol-hero-heading">
          {headlineLines?.map((line, i) => (
            <span key={i} className={styles.headlineLine}>
              {line}
            </span>
          ))}
        </h1>

        {/* ── Supporting text ─────────────────────────────────── */}
        <p className={styles.sub}>{t(sub)}</p>

        {/* ── CTA buttons ─────────────────────────────────────── */}
        <div className={styles.actions}>
          {primaryCta && (
            <a href={primaryCta.href} className={styles.btnPrimary}>
              {t(primaryCta.label)}
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>
          )}
          {secondaryCta && (
            <a href={secondaryCta.href} className={styles.btnSecondary}>
              {t(secondaryCta.label)}
            </a>
          )}
        </div>

      </div>
    </section>
  );
}

// ── Tiny helpers ─────────────────────────────────────────────────

/**
 * Convert a 6-digit hex colour to rgba() with a given alpha.
 * Used inline so the badge tint follows the per-solution accent colour.
 */
function hexToAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}


