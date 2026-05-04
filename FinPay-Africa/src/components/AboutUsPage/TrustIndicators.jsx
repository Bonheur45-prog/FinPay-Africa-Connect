import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Lock, Clock, Check } from "lucide-react";
import styles from './TrustIndicators.module.css';

const iconMap = {
  shield: <Shield size={22} strokeWidth={1.5} />,
  lock: <Lock size={22} strokeWidth={1.5} />,
  clock: <Clock size={22} strokeWidth={1.5} />,
  check: <Check size={22} strokeWidth={2} />,
};

export default function TrustIndicators() {
  const { t } = useTranslation('about');
  const sectionRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles["ti-visible"]);
        }
      },
      { threshold: 0.1 }
    );
    if (innerRef.current) observer.observe(innerRef.current);
    return () => observer.disconnect();
  }, []);

  const partners = t('trust.partners', { returnObjects: true });
  const partnersArray = Array.isArray(partners) ? partners : [];

  const certBadges = t('trust.badges', { returnObjects: true });
  const badgesArray = Array.isArray(certBadges) ? certBadges : [];

  return (
    <section className={styles["ti-section"]} ref={sectionRef}>
      <div className={styles["ti-bg"]} />

      <div className={styles["ti-container"]} ref={innerRef}>
        <div className={styles["ti-header"]}>
          <span className={styles["ti-label"]}>
            {t('trust.label')}
          </span>
          <h2 className={styles["ti-title"]}>
            {t('trust.title')}
          </h2>
          <p className={styles["ti-sub"]}>
            {t('trust.subtitle')}
          </p>
        </div>

        {/* Partner logos / placeholders */}
        <div className={styles["ti-logos"]}>
          {partnersArray.map((p) => (
            <div className={styles["ti-logo-item"]} key={p.name}>
              <div className={styles["ti-logo-box"]}>
                <span className={styles["ti-logo-name"]}>{p.name}</span>
                <span className={styles["ti-logo-full"]}>{p.full}</span>
              </div>
              <span className={styles["ti-logo-type"]}>{p.type}</span>
            </div>
          ))}
        </div>

        {/* Certification badges */}
        <div className={styles["ti-badges"]}>
          {badgesArray.map((b) => (
            <div className={styles["ti-badge"]} key={b.label}>
              <div className={styles["ti-badge-icon"]}>
                {iconMap[b.icon] || <Shield size={22} strokeWidth={1.5} />}
              </div>
              <div className={styles["ti-badge-text"]}>
                <span className={styles["ti-badge-label"]}>{b.label}</span>
                <span className={styles["ti-badge-sub"]}>{b.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <p className={styles["ti-disclaimer"]}>
          {t('trust.disclaimer')}
        </p>
      </div>
    </section>
  );
}