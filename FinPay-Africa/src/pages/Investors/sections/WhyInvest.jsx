/**
 * FinPay Africa — Why Invest Section
 * Five compelling, investor-facing reasons. White background.
 * Alternating layout: icon card (left) + text (right).
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WhyInvest.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

const iconSVGs = {
  chart: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      <path d="M8 30 L18 20 L26 26 L40 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="34,14 40,14 40,20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="24,4 28,20 44,20 31,30 36,46 24,36 12,46 17,30 4,20 20,20" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <polygon points="24,12 27,22 38,22 29,28 32,38 24,32 16,38 19,28 10,22 21,22" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.6"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M24 4 L40 12 L40 24 C40 34 32 42 24 44 C16 42 8 34 8 24 L8 12 Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <polyline points="16,24 21,30 32,18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8"  y="10" width="32" height="8"  rx="3" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <rect x="8"  y="22" width="32" height="8"  rx="3" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
      <rect x="8"  y="34" width="32" height="6"  rx="3" stroke="currentColor" strokeWidth="2" opacity="0.9"/>
      <line x1="16" y1="10" x2="16" y2="8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="24" y1="10" x2="24" y2="8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="32" y1="10" x2="32" y2="8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  people: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <path d="M10 40 C10 32 16 26 24 26 C32 26 38 32 38 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <path d="M36 18 C38 14 44 14 44 20 C44 26 36 30 32 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M12 18 C10 14 4 14 4 20 C4 26 12 30 16 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
};

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
        <div className={styles.iconWrap}>{iconSVGs[reason.icon] || iconSVGs.chart}</div>
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
  const { t } = useTranslation('investors');
  const { ref: hRef, isVisible: hVis } = useScrollReveal();

  const reasons = t('whyInvest.reasons', { returnObjects: true });
  const reasonsArray = Array.isArray(reasons) ? reasons : [];

  return (
    <section className={styles.section}>
      <div
        ref={hRef}
        className={`${styles.header} ${hVis ? styles.headerVisible : ''}`}
      >
        <div className={styles.eyebrow}>{t('whyInvest.label')}</div>
        <h2 className={styles.sectionTitle}>{t('whyInvest.title')}</h2>
        <p className={styles.sectionSub}>
          {t('whyInvest.subtitle')}
        </p>
      </div>

      <div className={styles.reasons}>
        {reasonsArray.map((reason, i) => (
          <ReasonRow key={reason.number} reason={reason} index={i} />
        ))}
      </div>
    </section>
  );
}