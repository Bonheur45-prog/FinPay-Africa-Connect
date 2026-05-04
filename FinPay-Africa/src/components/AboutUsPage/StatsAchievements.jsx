import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from './StatsAchievements.module.css';

function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatItem({ item, started, index }) {
  const count = useCountUp(item.value, 1800, started);
  return (
    <div
      className={styles["sa-stat"]}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className={styles["sa-stat-number"]}>
        <span className={styles["sa-count"]}>{count}</span>
        <span className={styles["sa-suffix"]}>{item.suffix}</span>
      </div>
      <div className={styles["sa-stat-label"]}>{item.label}</div>
      <div className={styles["sa-stat-sub"]}>{item.sub}</div>
    </div>
  );
}

export default function StatsAchievements() {
  const { t } = useTranslation('about');
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          entry.target.classList.add(styles["sa-visible"]);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = t('stats.items', { returnObjects: true });
  const statsArray = Array.isArray(stats) ? stats : [];

  return (
    <section className={styles["sa-section"]} ref={sectionRef}>
      <div className={styles["sa-bg-top"]} />
      <div className={styles["sa-bg-bottom"]} />

      <div className={styles["sa-container"]}>
        <div className={styles["sa-header"]}>
          <span className={styles["sa-label"]}>
            {t('stats.label')}
          </span>
          <h2 className={styles["sa-title"]}>
            {t('stats.title')}
          </h2>
        </div>

        <div className={styles["sa-grid"]}>
          {statsArray.map((stat, i) => (
            <StatItem key={stat.label} item={stat} started={started} index={i} />
          ))}
        </div>

        <div className={styles["sa-quote"]}>
          <div className={styles["sa-quote-mark"]}>"</div>
          <p className={styles["sa-quote-text"]}>
            {t('stats.quote.text')}
          </p>
          <div className={styles["sa-quote-attr"]}>{t('stats.quote.attribution')}</div>
        </div>
      </div>
    </section>
  );
}