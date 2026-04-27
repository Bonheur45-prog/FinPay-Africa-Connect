import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Target, Eye, Star } from "lucide-react";
import styles from './MissionVision.module.css';

const iconMap = {
  mission: <Target size={28} strokeWidth={1.5} />,
  vision: <Eye size={28} strokeWidth={1.5} />,
  values: <Star size={28} strokeWidth={1.5} />,
};

export default function MissionVision() {
  const { t } = useTranslation('about');
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["mv-card-visible"]);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const cards = t('missionVision.cards', { returnObjects: true });
  const cardsArray = Array.isArray(cards) ? cards : [];

  return (
    <section className={styles["mv-section"]}>
      <div className={styles["mv-bg"]} />

      <div className={styles["mv-container"]}>
        <div className={styles["mv-header"]}>
          <span className={styles["mv-label"]}>
            {t('missionVision.label')}
          </span>
          <h2 className={styles["mv-title"]}>
            {t('missionVision.title')}
          </h2>
          <p className={styles["mv-sub"]}>
            {t('missionVision.subtitle')}
          </p>
        </div>

        <div className={styles["mv-grid"]}>
          {cardsArray.map((card, index) => (
            <div
              key={card.id}
              className={`mv-card mv-card-${card.id}`}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className={styles["mv-icon-wrap"]}>
                {iconMap[card.id] || <Target size={28} strokeWidth={1.5} />}
              </div>
              <div className={styles["mv-card-meta"]}>
                <span className={styles["mv-card-label"]}>{card.label}</span>
                <h3 className={styles["mv-card-title"]}>{card.title}</h3>
              </div>
              {card.description && (
                <p className={styles["mv-card-desc"]}>{card.description}</p>
              )}
              {card.values && Array.isArray(card.values) && (
                <div className={styles["mv-values-list"]}>
                  {card.values.map((v) => (
                    <div key={v.name} className={styles["mv-value-item"]}>
                      <div className={styles["mv-value-dot"]} />
                      <div>
                        <span className={styles["mv-value-name"]}>{v.name}</span>
                        <span className={styles["mv-value-desc"]}> — {v.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles["mv-card-glow"]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}