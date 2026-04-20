/**
 * FinPay Africa — Become a Partner Section
 * Crimson-to-orange gradient CTA inviting new partners to apply.
 */

import React from 'react';
import styles from './BecomePartner.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

const BENEFITS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Regulatory Compliance',
    desc: 'Operate under a certified, internationally compliant payment framework.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Pan-African Reach',
    desc: 'Access an established cross-border network spanning 12+ countries.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Growing Volume',
    desc: 'Plug into a platform processing thousands of transactions monthly.',
  },
];

export default function BecomePartner() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}
      >
        {/* Background decoration */}
        <div className={styles.bgOrb1} aria-hidden="true" />
        <div className={styles.bgOrb2} aria-hidden="true" />

        <div className={styles.content}>
          {/* Left: text */}
          <div className={styles.left}>
            <div className={styles.eyebrow}>Join the Network</div>
            <h2 className={styles.title}>
              Become a FinPay Africa Partner
            </h2>
            <p className={styles.body}>
              We are always looking for forward-thinking organizations to grow with us.
              Whether you're a bank, fintech, mobile operator, or merchant network —
              there's a place for you in the FinPay Africa ecosystem.
            </p>

            <div className={styles.actions}>
              <a href="/contact" className={styles.btnPrimary}>
                Apply Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a href="/contact" className={styles.btnSecondary}>
                Talk to Our Team
              </a>
            </div>
          </div>

          {/* Right: benefit pills */}
          <div className={styles.right}>
            {BENEFITS.map((b) => (
              <div key={b.title} className={styles.benefitItem}>
                <div className={styles.benefitIcon}>{b.icon}</div>
                <div className={styles.benefitText}>
                  <strong className={styles.benefitTitle}>{b.title}</strong>
                  <span className={styles.benefitDesc}>{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
