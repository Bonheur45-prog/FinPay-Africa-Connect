/**
 * FinPay Africa — Why Invest Section
 * Five compelling, investor-facing reasons. White background.
 * Alternating layout: icon card (left) + text (right).
 */

import React from 'react';
import styles from './WhyInvest.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

const REASONS = [
  {
    number: '01',
    title: 'A Proven, Massive Market',
    body: 'Over $40 billion flows into Sub-Saharan Africa each year through remittances — representing 10%+ of GDP in several nations. This is not speculative: it is a deep, recurring, growing market that has barely been touched by modern fintech.',
    accent: '#7a0e0e',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
        <path d="M8 30 L18 20 L26 26 L40 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="34,14 40,14 40,20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'First-Mover Advantage',
    body: 'Transaction costs in African remittance corridors remain nearly double the global average due to limited formal infrastructure. FinPay Africa enters this gap with a certified, modern, low-cost solution before the market consolidates.',
    accent: '#e8760a',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polygon points="24,4 28,20 44,20 31,30 36,46 24,36 12,46 17,30 4,20 20,20" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <polygon points="24,12 27,22 38,22 29,28 32,38 24,32 16,38 19,28 10,22 21,22" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Live, Certified & Compliant',
    body: 'FinPay Africa is not a concept — it is operational today. We hold the certifications and partnerships required to issue real bank cards and IBAN accounts. Every transaction is processed in full compliance with EU and international financial regulations.',
    accent: '#2d7a3a',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M24 4 L40 12 L40 24 C40 34 32 42 24 44 C16 42 8 34 8 24 L8 12 Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <polyline points="16,24 21,30 32,18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'A Scalable Technology Stack',
    body: 'Built in partnership with BrightLink Technologies, our platform is modular and API-driven. Adding new countries, new corridors, or new product lines (mobile money, microloans, insurance) requires configuration, not rebuilding.',
    accent: '#22c55e',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* API/layers icon — represents modular stack */}
        <rect x="8"  y="10" width="32" height="8"  rx="3" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        <rect x="8"  y="22" width="32" height="8"  rx="3" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
        <rect x="8"  y="34" width="32" height="6"  rx="3" stroke="currentColor" strokeWidth="2" opacity="0.9"/>
        <line x1="16" y1="10" x2="16" y2="8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="10" x2="24" y2="8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="32" y1="10" x2="32" y2="8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Social Impact — a Strategic Asset',
    body: 'ESG-aligned investors and international development institutions are actively seeking fintech opportunities with measurable social impact. FinPay Africa delivers: financial inclusion, diaspora empowerment, and reduced remittance poverty are built into our core model.',
    accent: '#7a5a00',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        <path d="M10 40 C10 32 16 26 24 26 C32 26 38 32 38 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <path d="M36 18 C38 14 44 14 44 20 C44 26 36 30 32 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <path d="M12 18 C10 14 4 14 4 20 C4 26 12 30 16 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
];

function ReasonRow({ reason, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`${styles.row} ${isVisible ? styles.rowVisible : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Icon card */}
      <div
        className={styles.iconCard}
        style={{
          '--reason-accent': reason.accent,
          '--reason-accent-light': reason.accent + '18',
        }}
      >
        <div className={styles.iconNum}>{reason.number}</div>
        <div className={styles.iconWrap}>{reason.icon}</div>
      </div>

      {/* Text */}
      <div className={styles.textBlock}>
        <div
          className={styles.accentBar}
          style={{ background: reason.accent }}
          aria-hidden="true"
        />
        <h3 className={styles.reasonTitle}>{reason.title}</h3>
        <p className={styles.reasonBody}>{reason.body}</p>
      </div>
    </div>
  );
}

export default function WhyInvest() {
  const { ref: hRef, isVisible: hVis } = useScrollReveal();

  return (
    <section className={styles.section}>
      <div
        ref={hRef}
        className={`${styles.header} ${hVis ? styles.headerVisible : ''}`}
      >
        <div className={styles.eyebrow}>The Investment Case</div>
        <h2 className={styles.sectionTitle}>5 Reasons to Invest in FinPay Africa</h2>
        <p className={styles.sectionSub}>
          A compelling combination of market size, timing, technology maturity,
          regulatory compliance, and social mission.
        </p>
      </div>

      <div className={styles.reasons}>
        {REASONS.map((reason, i) => (
          <ReasonRow key={reason.number} reason={reason} index={i} />
        ))}
      </div>
    </section>
  );
}
