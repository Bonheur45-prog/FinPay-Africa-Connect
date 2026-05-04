import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Lock, Activity, Layers, FileCheck, Clock, Users } from "lucide-react";
import styles from './CoreStrengths.module.css';

const iconMap = {
  lock: <Lock size={26} strokeWidth={1.5} />,
  activity: <Activity size={26} strokeWidth={2} />,
  layers: <Layers size={26} strokeWidth={1.5} />,
  fileCheck: <FileCheck size={26} strokeWidth={1.5} />,
  clock: <Clock size={26} strokeWidth={1.5} />,
  users: <Users size={26} strokeWidth={1.5} />,
};

export default function CoreStrengths() {
  const { t } = useTranslation('about');
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["cs-visible"]);
          }
        });
      },
      { threshold: 0.1 }
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const strengths = t('strengths.items', { returnObjects: true });
  const strengthsArray = Array.isArray(strengths) ? strengths : [];

  return (
    <section className={styles["cs-section"]}>
      <div className={styles["cs-bg"]} />
      <div className={styles["cs-bg-stripe"]} />

      <div className={styles["cs-container"]}>
        <div className={styles["cs-header"]}>
          <span className={styles["cs-label"]}>
            {t('strengths.label')}
          </span>
          <h2 className={styles["cs-title"]}>
            {t('strengths.title')}
          </h2>
          <p className={styles["cs-sub"]}>
            {t('strengths.subtitle')}
          </p>
        </div>

        <div className={styles["cs-grid"]}>
          {strengthsArray.map((item, index) => (
            <div
              key={item.title}
              className={styles["cs-item"]}
              ref={(el) => (itemRefs.current[index] = el)}
              style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
            >
              <div className={styles["cs-icon"]}>
                {iconMap[item.icon] || <Lock size={26} strokeWidth={1.5} />}
              </div>
              <h3 className={styles["cs-item-title"]}>{item.title}</h3>
              <p className={styles["cs-item-desc"]}>{item.description}</p>
              <div className={styles["cs-item-line"]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}