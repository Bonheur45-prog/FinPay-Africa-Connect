import { useEffect, useRef, useState } from "react";
import styles from './StatsAchievements.module.css';

const stats = [
  { value: 10, suffix: "+", label: "Years of Experience", sub: "In enterprise technology" },
  { value: 50, suffix: "+", label: "Projects Delivered", sub: "Across Rwanda & East Africa" },
  { value: 15, suffix: "+", label: "Institutional Clients", sub: "Banks, MFIs & enterprises" },
  { value: 99, suffix: "%", label: "Client Retention Rate", sub: "Long-term partnerships" },
];

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

  return (
    <section className={styles["sa-section"]} ref={sectionRef}>
      <div className={styles["sa-bg-top"]} />
      <div className={styles["sa-bg-bottom"]} />

      <div className={styles["sa-container"]}>
        <div className={styles["sa-header"]}>
          <span className={styles["sa-label"]}>By The Numbers</span>
          <h2 className={styles["sa-title"]}>Achievements & Milestones</h2>
        </div>

        <div className={styles["sa-grid"]}>
          {stats.map((stat, i) => (
            <StatItem key={stat.label} item={stat} started={started} index={i} />
          ))}
        </div>

        <div className={styles["sa-quote"]}>
          <div className={styles["sa-quote-mark"]}>"</div>
          <p className={styles["sa-quote-text"]}>
            In fintech, the strongest asset you can build is institutional trust.
            Every system we deploy, every line of code we write, is another brick
            in that foundation.
          </p>
          <div className={styles["sa-quote-attr"]}>— FinPay Africa Leadership</div>
        </div>
      </div>
    </section>
  );
}
