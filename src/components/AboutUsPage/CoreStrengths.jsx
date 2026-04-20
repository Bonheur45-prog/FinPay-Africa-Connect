import { useEffect, useRef } from "react";
import { Lock, Activity, Layers, FileCheck, Clock, Users } from "lucide-react";
import styles from './CoreStrengths.module.css';

const strengths = [
  {
    icon: <Lock size={26} strokeWidth={1.5} />,
    title: "Bank-Grade Security",
    description:
      "Our systems are architected with end-to-end encryption, multi-factor authentication, and audit-ready logging — meeting the security standards demanded by Rwanda's regulatory environment and international frameworks.",
  },
  {
    icon: <Activity size={26} strokeWidth={2} />,
    title: "Proven Reliability",
    description:
      "Backed by our integration within the NSI Group ecosystem, we deliver solutions with tested infrastructure, dependable uptime, and disaster-recovery protocols trusted by institutional clients.",
  },
  {
    icon: <Layers size={26} strokeWidth={1.5} />,
    title: "Scalable Architecture",
    description:
      "We build platforms that grow with you — from single-branch institutions to multi-country deployments — using modular, cloud-ready architectures that scale without rebuilding from scratch.",
  },
  {
    icon: <FileCheck size={26} strokeWidth={1.5} />,
    title: "Regulatory Compliance",
    description:
      "From Rwanda's BNR directives to regional AML/KYC standards, our products are built with compliance as a first-class feature — not an afterthought — giving institutions confidence during audits.",
  },
  {
    icon: <Clock size={26} strokeWidth={1.5} />,
    title: "Deep Local Experience",
    description:
      "Years operating in Rwanda's financial and enterprise ecosystem give us contextual knowledge that external vendors lack — understanding regulation, culture, and infrastructure realities on the ground.",
  },
  {
    icon: <Users size={26} strokeWidth={1.5} />,
    title: "Dedicated Partnership Support",
    description:
      "We don't disappear after go-live. Our team provides ongoing technical support, system maintenance, and strategic consultation to ensure long-term value from every engagement.",
  },
];

export default function CoreStrengths() {
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

  return (
    <section className={styles["cs-section"]}>
      <div className={styles["cs-bg"]} />
      <div className={styles["cs-bg-stripe"]} />

      <div className={styles["cs-container"]}>
        <div className={styles["cs-header"]}>
          <span className={styles["cs-label"]}>Why Choose FinPay Africa</span>
          <h2 className={styles["cs-title"]}>Core Strengths That Set Us Apart</h2>
          <p className={styles["cs-sub"]}>
            What makes us the right partner for financial institutions and enterprises
            that refuse to compromise on quality.
          </p>
        </div>

        <div className={styles["cs-grid"]}>
          {strengths.map((item, index) => (
            <div
              key={item.title}
              className={styles["cs-item"]}
              ref={(el) => (itemRefs.current[index] = el)}
              style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
            >
              <div className={styles["cs-icon"]}>{item.icon}</div>
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
