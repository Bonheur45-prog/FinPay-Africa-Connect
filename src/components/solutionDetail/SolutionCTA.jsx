/**
 * SolutionCTA.jsx
 * ─────────────────────────────────────────────────────────────────
 * Bottom conversion block for each solution page.
 *
 * Props:
 *   headline     {string}  – use \n for line breaks
 *   sub          {string}  – supporting line
 *   primaryCta   {{ label, href }}
 *   secondaryCta {{ label, href }}
 *   trust        {string}  – small trust line (e.g. "No setup fee · PCI-DSS")
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SolutionCTA.module.css";

export default function SolutionCTA({
  headline,
  sub,
  primaryCta,
  secondaryCta,
  trust,
  namespace = "solutions",
}) {
  const { t } = useTranslation(namespace);
  const blockRef = useRef(null);

  // Fade in once the block enters the viewport
  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const translatedHeadline = t(headline);
  const headlineLines = translatedHeadline.split("\n");

  return (
    <section className={styles.section}>
      <div className={styles.block} ref={blockRef}>

        {/* Dot-grid texture */}
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.content}>

          <h2 className={styles.headline}>
            {headlineLines.map((line, i) => (
              <span key={i} className={styles.headlineLine}>{line}</span>
            ))}
          </h2>

          {sub && <p className={styles.sub}>{t(sub)}</p>}

          <div className={styles.actions}>
            {primaryCta && (
              <a href={primaryCta.href} className={styles.btnPrimary}>
                {t(primaryCta.label)}
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryCta.href} className={styles.btnSecondary}>
                {t(secondaryCta.label)}
              </a>
            )}
          </div>

          {trust && (
            <p className={styles.trust}>
              <span className={styles.trustDot} aria-hidden="true" />
              {t(trust)}
            </p>
          )}

        </div>
      </div>
    </section>
  );
}
