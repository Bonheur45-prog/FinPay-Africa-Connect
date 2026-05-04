import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from './Timeline.module.css';

export default function Timeline() {
  const { t } = useTranslation('about');
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["tl-item-visible"]);
          }
        });
      },
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const timelineData = t('timeline.items', { returnObjects: true });
  const timelineArray = Array.isArray(timelineData) ? timelineData : [];

  return (
    <section className={styles["tl-section"]}>
      <div className={styles["tl-bg-overlay"]} />
      <div className={styles["tl-blur-left"]} />
      <div className={styles["tl-blur-right"]} />

      <div className={styles["tl-container"]}>
        <div className={styles["tl-header"]}>
          <span className={styles["tl-label"]}>
            {t('timeline.label')}
          </span>
          <h2 className={styles["tl-title"]}>
            {t('timeline.title')}
          </h2>
          <p className={styles["tl-subtitle"]}>
            {t('timeline.subtitle')}
          </p>
        </div>

        <div className={styles["tl-track"]}>
          <div className={styles["tl-line"]} />

          {timelineArray.map((item, index) => (
            <div
              key={item.year}
              className={`${styles["tl-item"]} ${index % 2 === 0 ? styles["tl-item-left"] : styles["tl-item-right"]}`}
              ref={(el) => (itemRefs.current[index] = el)}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Center dot */}
              <div className={styles["tl-dot"]}>
                <span className={styles["tl-dot-inner"]} />
              </div>

              {/* Card */}
              <div className={styles["tl-card"]}>
                <div className={styles["tl-card-top"]}>
                  <span className={styles["tl-year"]}>{item.year}</span>
                  <span className={styles["tl-tag"]}>{item.tag}</span>
                </div>
                <h3 className={styles["tl-card-title"]}>{item.title}</h3>
                <p className={styles["tl-card-desc"]}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}