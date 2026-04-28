/**
 * FeatureGrid.jsx
 * ─────────────────────────────────────────────────────────────────
 * 3-column grid of feature cards, each with an icon, title, and body.
 *
 * Props (from the data file):
 *   eyebrow  {string}  – small overline label
 *   headline {string}  – section headline; use \n for line breaks
 *   items    {Array<{
 *               icon:  string,   – key from ICON_MAP below
 *               title: string,
 *               body:  string,
 *             }>}
 *
 * Scroll animation: each card fades + slides up with a staggered
 * delay driven by a CSS custom property (--delay) set inline.
 * IntersectionObserver fires once per card.
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { 
  Zap, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  Code2, 
  Clock, 
  CreditCard, 
  Lock,
  HelpCircle
} from "lucide-react";
import styles from "./FeatureGrid.module.css";

// ── Icon map ─────────────────────────────────────────────────────
// Inline SVG icons keyed by the string used in the data file.
// Add new icons here as the icon vocabulary grows.
const ICON_MAP = {
  lightning: <Zap size={24} strokeWidth={1.8} />,
  shield:    <ShieldCheck size={24} strokeWidth={1.8} />,
  globe:     <Globe size={24} strokeWidth={1.8} />,
  chart:     <TrendingUp size={24} strokeWidth={1.8} />,
  code:      <Code2 size={24} strokeWidth={1.8} />,
  clock:     <Clock size={24} strokeWidth={1.8} />,
  card:      <CreditCard size={24} strokeWidth={1.8} />,
  lock:      <Lock size={24} strokeWidth={1.8} />,
};

// Fallback icon when the data references an unknown key
function FallbackIcon() {
  return <HelpCircle size={24} strokeWidth={1.8} />;
}


// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function FeatureGrid({ eyebrow, headline, items = [], namespace = "solutions" }) {
  const { t } = useTranslation(namespace);
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Observe each card individually — fires as user scrolls into each
    const cards = grid.querySelectorAll("[data-feature-card]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Split headline on \n to allow controlled line breaks
  const translatedHeadline = t(headline);
  const headlineLines = translatedHeadline.split("\n");

  return (
    <section className={styles.section} aria-labelledby="fg-headline">
      <div className={styles.inner}>

        {/* ── Section header ────────────────────────────────── */}
        <header className={styles.header}>
          {eyebrow && (
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              {t(eyebrow)}
            </div>
          )}
          <h2 className={styles.headline} id="fg-headline">
            {headlineLines.map((line, i) => (
              <span key={i} className={styles.headlineLine}>{line}</span>
            ))}
          </h2>
        </header>

        {/* ── Feature cards ─────────────────────────────────── */}
        <div className={styles.grid} ref={gridRef}>
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? <FallbackIcon />;

            return (
              <article
                key={i}
                className={styles.card}
                data-feature-card          /* selector used by the observer */
                style={{ "--delay": `${i * 70}ms` }}
              >
                {/* Icon pill */}
                <div className={styles.iconWrap}>
                  {Icon}
                </div>

                <h3 className={styles.cardTitle}>{t(item.title)}</h3>
                <p  className={styles.cardBody}>{t(item.body)}</p>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
