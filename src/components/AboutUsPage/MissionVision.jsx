import { useEffect, useRef } from "react";
import { Target, Eye, Star } from "lucide-react";
import styles from './MissionVision.module.css';

const cards = [
  {
    id: "mission",
    icon: <Target size={28} strokeWidth={1.5} />,
    label: "Mission",
    title: "What Drives Us Daily",
    description:
      "To deliver secure, scalable, and reliable technology infrastructure that empowers financial institutions, enterprises, and businesses across Africa — enabling them to operate with confidence, compliance, and competitive agility.",
  },
  {
    id: "vision",
    icon: <Eye size={28} strokeWidth={1.5} />,
    label: "Vision",
    title: "Where We're Headed",
    description:
      "To become Africa's most trusted enterprise technology partner — a company synonymous with financial security, digital excellence, and long-term institutional reliability from Kigali to the continent.",
  },
  {
    id: "values",
    icon: <Star size={28} strokeWidth={1.5} />,
    label: "Values",
    title: "What We Stand On",
    values: [
      { name: "Integrity", desc: "We build on honesty and ethical practice at every layer." },
      { name: "Security", desc: "We treat data and systems protection as non-negotiable." },
      { name: "Partnership", desc: "Long-term relationships over short-term transactions." },
      { name: "Excellence", desc: "High standards in code, communication, and delivery." },
    ],
  },
];

export default function MissionVision() {
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

  return (
    <section className={styles["mv-section"]}>
      <div className={styles["mv-bg"]} />

      <div className={styles["mv-container"]}>
        <div className={styles["mv-header"]}>
          <span className={styles["mv-label"]}>Core Principles</span>
          <h2 className={styles["mv-title"]}>Mission, Vision & Values</h2>
          <p className={styles["mv-sub"]}>
            The principles that guide every decision, every product, and every partnership.
          </p>
        </div>

        <div className={styles["mv-grid"]}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`mv-card mv-card-${card.id}`}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className={styles["mv-icon-wrap"]}>
                {card.icon}
              </div>
              <div className={styles["mv-card-meta"]}>
                <span className={styles["mv-card-label"]}>{card.label}</span>
                <h3 className={styles["mv-card-title"]}>{card.title}</h3>
              </div>
              {card.description && (
                <p className={styles["mv-card-desc"]}>{card.description}</p>
              )}
              {card.values && (
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
