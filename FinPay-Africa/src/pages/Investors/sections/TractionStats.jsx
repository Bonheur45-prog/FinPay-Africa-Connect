/**
 * FinPay Africa — Traction Stats Section
 * Animated counter numbers that fire when scrolled into view.
 * Crimson background — high-impact momentum proof.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TractionStats.module.css';
import { useScrollReveal, useCountUp } from '../../../components/shared/useScrollReveal';

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
  const { t } = useTranslation('investors');
  const { ref: hRef, isVisible: hVis } = useScrollReveal({ threshold: 0.2 });

  const stats = t('traction.stats', { returnObjects: true });
  const statsArray = Array.isArray(stats) ? stats : [];

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
          <div className={styles.eyebrow}>{t('traction.label')}</div>
          <h2 className={styles.title}>{t('traction.title')}</h2>
          <p className={styles.sub}>
            {t('traction.subtitle')}
          </p>
        </div>

        {/* Counters grid */}
        <div className={styles.grid}>
          {statsArray.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} delay={i * 100} />
          ))}
        </div>

        {/* Bottom divider line with logo mark */}
        <div className={styles.bottomRow}>
          <div className={styles.divLine} aria-hidden="true" />
          <span className={styles.tagline}>{t('traction.tagline')}</span>
          <div className={styles.divLine} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}