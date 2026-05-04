/**
 * FinPay Africa — Become a Partner Section
 * Crimson-to-orange gradient CTA inviting new partners to apply.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './BecomePartner.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

const BENEFITS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    titleKey: 'benefits.compliance.title',
    descKey: 'benefits.compliance.desc',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    titleKey: 'benefits.reach.title',
    descKey: 'benefits.reach.desc',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    titleKey: 'benefits.volume.title',
    descKey: 'benefits.volume.desc',
  },
];

export default function BecomePartner() {
  const { t } = useTranslation('partners');
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
            <div className={styles.eyebrow}>{t('cta.eyebrow')}</div>
            <h2 className={styles.title}>
              {t('cta.title')}
            </h2>
            <p className={styles.body}>
              {t('cta.body')}
            </p>

            <div className={styles.actions}>
              <a href="/contact" className={styles.btnPrimary}>
                {t('cta.buttons.apply')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a href="/contact" className={styles.btnSecondary}>
                {t('cta.buttons.talk')}
              </a>
            </div>
          </div>

          {/* Right: benefit pills */}
          <div className={styles.right}>
            {BENEFITS.map((b) => (
              <div key={b.titleKey} className={styles.benefitItem}>
                <div className={styles.benefitIcon}>{b.icon}</div>
                <div className={styles.benefitText}>
                  <strong className={styles.benefitTitle}>{t(b.titleKey)}</strong>
                  <span className={styles.benefitDesc}>{t(b.descKey)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
