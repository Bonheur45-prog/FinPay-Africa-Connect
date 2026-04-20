import { useEffect, useRef } from "react";
import styles from './Timeline.module.css';

const timelineData = [
  {
    year: "2010",
    title: "Foundational Vision",
    description:
      "FinPay Africa's founding vision emerges within the NSI Group — an established industrial conglomerate with decades of commercial presence in Rwanda. The focus on digital financial transformation begins.",
    tag: "Foundation",
  },
  {
    year: "2015",
    title: "FinPay Africa Incorporated",
    description:
      "Formally established as an independent financial technology entity in Kigali, Rwanda. TIN registered (155772836). Initial focus on enterprise payment solutions for local businesses.",
    tag: "Launch",
  },
  {
    year: "2017",
    title: "Financial Sector Milestone",
    description:
      "Secured first partnership with a Rwandan commercial bank. Delivered core banking interface integration and digital workflow automation — a defining moment shaping our fintech DNA.",
    tag: "Banking",
  },
  {
    year: "2019",
    title: "Pan-African Infrastructure",
    description:
      "Expanded capabilities to include multi-channel transaction processing and mobile money APIs. Became a critical technology layer for financial institutions across East Africa.",
    tag: "Expansion",
  },
  {
    year: "2022",
    title: "Product Suite Innovation",
    description:
      "Launched a proprietary product suite covering secure digital onboarding, compliance reporting, and document management — built specifically for the needs of African markets.",
    tag: "Innovation",
  },
  {
    year: "2024",
    title: "Continental Leadership",
    description:
      "Scaling strategic operations into West and Southern Africa. Positioning FinPay Africa as the premier technology backbone for the continent's next-generation financial infrastructure.",
    tag: "Leadership",
  },
];

export default function Timeline() {
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

  return (
    <section className={styles["tl-section"]}>
      <div className={styles["tl-bg-overlay"]} />
      <div className={styles["tl-blur-left"]} />
      <div className={styles["tl-blur-right"]} />

      <div className={styles["tl-container"]}>
        <div className={styles["tl-header"]}>
          <span className={styles["tl-label"]}>Our Journey</span>
          <h2 className={styles["tl-title"]}>A Decade of Building Trust</h2>
          <p className={styles["tl-subtitle"]}>
            From our roots in Rwanda's industrial sector to the front line of Africa's
            financial technology transformation.
          </p>
        </div>

        <div className={styles["tl-track"]}>
          <div className={styles["tl-line"]} />

          {timelineData.map((item, index) => (
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
