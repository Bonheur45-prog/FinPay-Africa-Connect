import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import CompanyOverviewImage from "../../assets/images/physical-virtual-card.png";
import styles from './CompanyOverview.module.css';

export default function CompanyOverview() {
  const { t } = useTranslation('about');
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["co-animate"]);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  const tags = t('company.tags', { returnObjects: true });

  return (
    <section className={styles["co-section"]} ref={sectionRef}>
      <div className={styles["co-bg-mesh"]} />
      <div className={styles["co-container"]}>
        {/* Left: Text */}
        <div className={styles["co-left"]} ref={leftRef}>
          <div className={styles["co-label"]}>
            {t('company.label')}
          </div>
          <h2 className={styles["co-title"]}>
            {t('company.title')}
          </h2>
          <div className={styles["co-body"]}>
            <p>
              {t('company.description.p1')}
            </p>
            <p>
              {t('company.description.p2.part1')} <strong>{t('company.description.p2.part2')}</strong> {t('company.description.p2.part3')}
            </p>
            <p>
              {t('company.description.p3')}
            </p>
          </div>
          <div className={styles["co-tags"]}>
            {Array.isArray(tags) && tags.map((tag) => (
              <span className={styles["co-tag"]} key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Right: Visual card */}
        <div className={styles["co-right"]} ref={rightRef}>
          <div className={styles["co-visual-card"]}>
            <div className={styles["co-card-header"]}>
              <div className={styles["co-card-dots"]}>
                <span /><span /><span />
              </div>
              <span className={styles["co-card-label"]}>{t('company.cardLabel')}</span>
            </div>
            <div className={styles["co-card-body"]}>
              <img src={CompanyOverviewImage} alt="" />
            </div>
          </div>
          {/* Decorative behind-card elements */}
          <div className={styles["co-card-shadow"]} />
          <div className={styles["co-card-glow"]} />
        </div>
      </div>
    </section>
  );
}