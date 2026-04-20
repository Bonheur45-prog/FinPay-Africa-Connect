import { useEffect, useRef } from "react";
import { Shield, Lock, Clock, Check } from "lucide-react";
import styles from './TrustIndicators.module.css';

const partners = [
  { name: "BNR", full: "National Bank of Rwanda", type: "Regulator" },
  { name: "RDB", full: "Rwanda Development Board", type: "Government" },
  { name: "MINICT", full: "Ministry of ICT", type: "Government" },
  { name: "FinPay Africa", full: "Fintech Partner", type: "Partner" },
  { name: "NSI Group", full: "Nord Sud Industriess", type: "Group" },
  { name: "Microfinance", full: "MFI Network Rwanda", type: "Sector" },
];

const certBadges = [
  {
    icon: <Shield size={22} strokeWidth={1.5} />,
    label: "RDB Registered",
    sub: "Official entity",
  },
  {
    icon: <Lock size={22} strokeWidth={1.5} />,
    label: "Secure Practices",
    sub: "End-to-end encrypted",
  },
  {
    icon: <Clock size={22} strokeWidth={1.5} />,
    label: "Years of Operation",
    sub: "Established track record",
  },
  {
    icon: <Check size={22} strokeWidth={2} />,
    label: "BNR Compliant",
    sub: "Regulatory aligned",
  },
];

export default function TrustIndicators() {
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

  return (
    <section className={styles["ti-section"]} ref={sectionRef}>
      <div className={styles["ti-bg"]} />

      <div className={styles["ti-container"]} ref={innerRef}>
        <div className={styles["ti-header"]}>
          <span className={styles["ti-label"]}>Institutional Trust</span>
          <h2 className={styles["ti-title"]}>Trusted by Financial Institutions & Enterprises</h2>
          <p className={styles["ti-sub"]}>
            Our clients and partners are among Rwanda's most regulated and
            respected organizations — and they trust us with their technology core.
          </p>
        </div>

        {/* Partner logos / placeholders */}
        <div className={styles["ti-logos"]}>
          {partners.map((p) => (
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
          {certBadges.map((b) => (
            <div className={styles["ti-badge"]} key={b.label}>
              <div className={styles["ti-badge-icon"]}>{b.icon}</div>
              <div className={styles["ti-badge-text"]}>
                <span className={styles["ti-badge-label"]}>{b.label}</span>
                <span className={styles["ti-badge-sub"]}>{b.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <p className={styles["ti-disclaimer"]}>
          Partner logos are representative of our engagement areas. Actual client agreements are subject to confidentiality.
        </p>
      </div>
    </section>
  );
}
