/**
 * StatsBand.jsx
 * ─────────────────────────────────────────────────────────────────
 * Horizontal strip of key metrics.
 *
 * Props:
 *   items  {Array<{ value: string, label: string }>}
 *
 * Scroll animation uses IntersectionObserver so stats only count up
 * once they enter the viewport. The animation itself is CSS-driven
 * (a single fade-in) — no JS counter animation to keep it lean.
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./StatsBand.module.css";

export default function StatsBand({ items = [] }) {
  const { t } = useTranslation("solutions");
  const bandRef = useRef(null);

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.band} ref={bandRef} aria-label="Key metrics">
      <div className={styles.inner}>
        {items.map((stat, i) => (
          <div
            key={i}
            className={styles.stat}
            style={{ "--delay": `${i * 80}ms` }}
          >
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{t(stat.label)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
