import { useEffect, useRef } from "react";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import styles from './CallToAction.module.css';

export default function CallToAction() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles["cta-visible"]);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles["cta-section"]} ref={sectionRef}>
      <div className={styles["cta-bg-deep"]} />
      <div className={styles["cta-orb-1"]} />
      <div className={styles["cta-orb-2"]} />
      <div className={styles["cta-grid"]} />

      <div className={styles["cta-container"]}>
        <div className={styles["cta-inner"]}>
          <div className={styles["cta-badge"]}>
            <span className={styles["cta-badge-dot"]} />
            Ready to build together
          </div>

          <h2 className={styles["cta-title"]}>
            Let's Build Africa's Financial<br />
            <span className={styles["cta-title-accent"]}>Infrastructure Together</span>
          </h2>

          <p className={styles["cta-body"]}>
            Whether you're a financial institution seeking a reliable technology partner,
            an enterprise looking for scalable digital solutions, or a fintech startup
            needing expert infrastructure — FinPay Africa is ready.
          </p>

          <div className={styles["cta-actions"]}>
            <a href="#contact" className={styles["cta-btn-primary"]}>
              <span>Work With Us</span>
              <ArrowRight size={18} strokeWidth={2} />
            </a>
            <a href="mailto:brighttlink@gmail.com" className={styles["cta-btn-secondary"]}>
              brighttlink@gmail.com
            </a>
          </div>

          <div className={styles["cta-contact-info"]}>
            <div className={styles["cta-contact-item"]}>
              <Phone size={15} strokeWidth={1.5} />
              <span>+250 782 567 921 / +250 795 263 269</span>
            </div>
            <div className={styles["cta-contact-sep"]}>·</div>
            <div className={styles["cta-contact-item"]}>
              <MapPin size={15} strokeWidth={1.5} />
              <span>Kigali, Rwanda</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
