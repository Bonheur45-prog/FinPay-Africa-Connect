/**
 * FinPay Africa — Traction Stats Section
 * Animated counter numbers that fire when scrolled into view.
 * Crimson background — high-impact momentum proof.
 */

import React from 'react';
import styles from './TractionStats.module.css';
import { useScrollReveal, useCountUp } from '../../../components/shared/useScrollReveal';

const STATS = [
  { value: 2500, suffix: '+', label: 'Active Clients', sub: 'using the Connect platform & card' },
  { value: 30,   suffix: '+', label: 'Strategic Partners', sub: 'across finance, tech & commerce' },
  { value: 12,   suffix: '',  label: 'Countries Covered', sub: 'and expanding across Africa' },
  { value: 40,   suffix: 'B$', label: 'Market Addressable', sub: 'annual remittance flow to Sub-Saharan Africa' },
];

function StatCounter({ stat, delay = 0 }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const count = useCountUp(stat.value, 1800, isVisible);

  return (
    <div
      ref={ref}
      className={`${styles.statItem} ${isVisible ? styles.statItemVisible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.statNum}>
        {count.toLocaleString()}
        <span className={styles.suffix}>{stat.suffix}</span>
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
      <div className={styles.statSub}>{stat.sub}</div>
    </div>
  );
}

export default function TractionStats() {
  const { ref: hRef, isVisible: hVis } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className={styles.section}>
      {/* BG decoration */}
      <div className={styles.bgGrad} aria-hidden="true" />
      <div className={styles.bgLines} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Header */}
        <div
          ref={hRef}
          className={`${styles.header} ${hVis ? styles.headerVisible : ''}`}
        >
          <div className={styles.eyebrow}>Traction & Proof</div>
          <h2 className={styles.title}>The Numbers Speak</h2>
          <p className={styles.sub}>
            We are not just a vision. FinPay Africa is live, growing, and delivering
            real value to real people across Europe and Africa today.
          </p>
        </div>

        {/* Counters grid */}
        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} delay={i * 100} />
          ))}
        </div>

        {/* Bottom divider line with logo mark */}
        <div className={styles.bottomRow}>
          <div className={styles.divLine} aria-hidden="true" />
          <span className={styles.tagline}>"Connecting you with your loved ones"</span>
          <div className={styles.divLine} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
