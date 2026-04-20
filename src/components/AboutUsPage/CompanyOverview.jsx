import { useEffect, useRef } from "react";
import CompanyOverviewImage from "../../assets/images/physical-virtual-card.png";
import styles from './CompanyOverview.module.css';

export default function CompanyOverview() {
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

  return (
    <section className={styles["co-section"]} ref={sectionRef}>
      <div className={styles["co-bg-mesh"]} />
      <div className={styles["co-container"]}>
        {/* Left: Text */}
        <div className={styles["co-left"]} ref={leftRef}>
          <div className={styles["co-label"]}>Company Overview</div>
          <h2 className={styles["co-title"]}>
            Building the Digital Backbone of Africa's Financial Future
          </h2>
          <div className={styles["co-body"]}>
            <p>
              FinPay Africa Ltd is a Kigali-based enterprise technology company
              specializing in secure financial software, payment systems, and digital
              infrastructure for banks, microfinance institutions, and enterprise clients
              across Rwanda and the broader African continent.
            </p>
            <p>
              Operating as part of the{" "}
              <strong>NSI Group (Nord Sud Industriess)</strong> — a well-established
              industrial and commercial conglomerate — FinPay Africa benefits from decades of
              institutional trust, local market knowledge, and strategic positioning that few
              technology firms in the region can match.
            </p>
            <p>
              We don't just deliver software. We engineer trust — through robust
              architecture, rigorous compliance frameworks, and client-centric partnerships
              that stand the test of time.
            </p>
          </div>
          <div className={styles["co-tags"]}>
            {["FinTech Solutions", "Banking Software", "Payment Systems", "Enterprise IT", "NSI Group"].map((t) => (
              <span className={styles["co-tag"]} key={t}>{t}</span>
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
              <span className={styles["co-card-label"]}>Company Profile</span>
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
