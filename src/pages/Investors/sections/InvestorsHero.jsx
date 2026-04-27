/**
 * FinPay Africa — Investors Hero
 * Full-bleed crimson hero with the $40B market size stat,
 * urgency messaging, and dual CTA buttons.
 */

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, ArrowRight, Check } from 'lucide-react';
import styles from './InvestorsHero.module.css';

export default function InvestorsHero() {
  const { t } = useTranslation('investors');
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  useEffect(() => {
    const refs = [ref0, ref1, ref2, ref3];
    const delays = [80, 250, 450, 650];
    const timers = refs.map((ref, i) =>
      setTimeout(() => ref.current?.classList.add(styles.visible), delays[i])
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const trustBadges = t('hero.badges', { returnObjects: true });
  const badgesArray = Array.isArray(trustBadges) ? trustBadges : [];

  return (
    <section className={styles.hero}>
      {/* Layered background */}
      <div className={styles.bgBase}    aria-hidden="true" />
      <div className={styles.bgTexture} aria-hidden="true" />

      {/* Floating geometric accents */}
      <div className={styles.geo1} aria-hidden="true" />
      <div className={styles.geo2} aria-hidden="true" />
      <div className={styles.geo3} aria-hidden="true" />

      {/* Africa continent outline — decorative SVG */}
      <div className={styles.africaWrap} aria-hidden="true">
        <svg viewBox="0 0 300 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.africaSvg}>
          <path
            d="M150 10 C90 10 60 40 50 80 C35 130 30 160 40 200 C50 240 60 260 80 290 C100 320 130 360 150 370 C170 360 200 320 220 290 C240 260 250 240 260 200 C270 160 265 130 250 80 C240 40 210 10 150 10Z"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1.5"
          />
          {/* Horn of Africa bump */}
          <path
            d="M230 160 C250 155 270 160 280 175 C270 178 250 175 230 168Z"
            fill="rgba(255,255,255,0.04)"
          />
        </svg>
      </div>

      <div className={styles.inner}>
        {/* Confidential tag */}
        <div ref={ref0} className={`${styles.confTag} ${styles.fadeUp}`}>
          <span className={styles.confDot} />
          {t('hero.tag')}
        </div>

        {/* Headline */}
        <h1 ref={ref1} className={`${styles.title} ${styles.fadeUp}`}>
          {t('hero.title.part1')}{' '}
          <span className={styles.highlight}>{t('hero.title.highlight')}</span>
          <br />
          {t('hero.title.part2')}
          <br />
          <span className={styles.titleSub}>{t('hero.title.subtext')}</span>
        </h1>

        {/* Sub-headline */}
        <p ref={ref2} className={`${styles.sub} ${styles.fadeUp}`}>
          {t('hero.description.part1')} <strong className={styles.strongWhite}>{t('hero.description.highlight')}</strong> {t('hero.description.part2')}
        </p>

        {/* CTAs */}
        <div ref={ref3} className={`${styles.actions} ${styles.fadeUp}`}>
          <a href="/contact?subject=pitch-deck" className={styles.btnGold}>
            <Download size={18} strokeWidth={2} aria-hidden="true" />
            {t('hero.buttons.pitch')}
          </a>
          <a href="/contact?subject=investor-call" className={styles.btnGhost}>
            {t('hero.buttons.schedule')}
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>

        {/* Trust badges */}
        <div className={styles.trustRow}>
          {badgesArray.map((b) => (
            <span key={b} className={styles.trustBadge}>
              <Check size={12} strokeWidth={3} aria-hidden="true" />
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,90 C480,0 960,0 1440,90 L1440,90 L0,90 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}