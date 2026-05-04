/**
 * FinPay Africa — Contact Hero Section
 * Clean white hero with a diagonal crimson accent strip,
 * headline, and three "intent" quick-links (General / Partner / Investor).
 */

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Users, DollarSign, ArrowRight } from 'lucide-react';
import styles from './ContactHero.module.css';

const iconMap = {
  message: <MessageSquare size={20} strokeWidth={2} />,
  users: <Users size={20} strokeWidth={2} />,
  dollar: <DollarSign size={20} strokeWidth={2.5} />,
};

export default function ContactHero() {
  const { t } = useTranslation('contact');
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();

  useEffect(() => {
    const refs = [ref0, ref1, ref2];
    const delays = [100, 280, 500];
    const timers = refs.map((r, i) =>
      setTimeout(() => r.current?.classList.add(styles.visible), delays[i])
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const intentLinks = t('hero.intentLinks', { returnObjects: true });
  const intentLinksArray = Array.isArray(intentLinks) ? intentLinks : [];

  return (
    <section className={styles.hero}>
      {/* Diagonal crimson accent — top-right corner */}
      <div className={styles.accentSlash} aria-hidden="true" />

      {/* Subtle grid texture */}
      <div className={styles.gridTexture} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Eyebrow */}
        <div ref={ref0} className={`${styles.eyebrow} ${styles.fadeUp}`}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          {t('hero.eyebrow')}
          <span className={styles.eyebrowLine} aria-hidden="true" />
        </div>

        {/* Headline */}
        <h1 ref={ref1} className={`${styles.title} ${styles.fadeUp}`}>
          {t('hero.title.part1')}{' '}
          <span className={styles.highlight}>{t('hero.title.highlight')}</span>
        </h1>

        <p className={`${styles.sub} ${styles.fadeUp}`} ref={ref2}>
          {t('hero.subtitle')}
        </p>

        {/* Intent quick-links */}
        <div className={styles.intentGrid}>
          {intentLinksArray.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              data-subject={item.subject}
              className={styles.intentCard}
              style={{ animationDelay: `${600 + i * 120}ms` }}
            >
              <div className={styles.intentIcon}>{iconMap[item.icon] || iconMap.message}</div>
              <div className={styles.intentText}>
                <span className={styles.intentLabel}>{item.label}</span>
                <span className={styles.intentDesc}>{item.desc}</span>
              </div>
              <ArrowRight className={styles.intentArrow} size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Wave down to the form section */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z" fill="#8C1A13" />
        </svg>
      </div>
    </section>
  );
}