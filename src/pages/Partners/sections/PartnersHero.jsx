/**
 * FinPay Africa — Partners Hero Section
 * Full-width crimson hero with animated entrance and key partnership stats.
 */

import React, { useEffect, useRef } from 'react';
import styles from './PartnersHero.module.css';

// Decorative snowflake motif — simplified brand mark used as BG texture
const SnowflakeMark = () => (
  <svg
    className={styles.snowflakeSvg}
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M120 8 L134 100 L120 120 L106 100 Z" fill="rgba(255,255,255,0.06)" />
    <path d="M120 232 L134 140 L120 120 L106 140 Z" fill="rgba(255,255,255,0.06)" />
    <path d="M8 120 L100 134 L120 120 L100 106 Z" fill="rgba(255,255,255,0.06)" />
    <path d="M232 120 L140 134 L120 120 L140 106 Z" fill="rgba(255,255,255,0.06)" />
    <path d="M34 34 L104 104 L120 120 L104 104 Z" fill="rgba(232,118,10,0.1)" />
    <path d="M206 34 L136 104 L120 120 L136 104 Z" fill="rgba(232,118,10,0.1)" />
    <path d="M34 206 L104 136 L120 120 L104 136 Z" fill="rgba(232,118,10,0.1)" />
    <path d="M206 206 L136 136 L120 120 L136 136 Z" fill="rgba(232,118,10,0.1)" />
    <circle cx="120" cy="120" r="28" fill="rgba(245,166,35,0.12)" />
    <circle cx="120" cy="120" r="14" fill="rgba(245,166,35,0.18)" />
  </svg>
);

export default function PartnersHero() {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const delays = [
      [badgeRef, 80],
      [titleRef, 220],
      [subtitleRef, 420],
      [statsRef, 620],
    ];
    const timers = delays.map(([ref, delay]) =>
      setTimeout(() => ref.current?.classList.add(styles.visible), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background layers */}
      <div className={styles.bgGradient} aria-hidden="true" />
      <div className={styles.bgPattern} aria-hidden="true" />
      <SnowflakeMark />

      <div className={styles.inner}>
        {/* Badge */}
        <div ref={badgeRef} className={`${styles.badge} ${styles.fadeUp}`}>
          <span className={styles.badgeDot} />
          Our Ecosystem
        </div>

        {/* Headline */}
        <h1 ref={titleRef} className={`${styles.title} ${styles.fadeUp}`}>
          Built on{' '}
          <span className={styles.accentOrange}>Trust</span>,<br />
          Grown Through{' '}
          <span className={styles.accentGold}>Partnership</span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className={`${styles.subtitle} ${styles.fadeUp}`}>
          FinPay Africa's strength lies in its network. Together with our strategic partners
          across finance, technology, and commerce, we are building the payment
          infrastructure Africa truly deserves.
        </p>

        {/* Stats bar */}
        <div ref={statsRef} className={`${styles.statsBar} ${styles.fadeUp}`}>
          <div className={styles.stat}>
            <span className={styles.statNum}>30+</span>
            <span className={styles.statLabel}>Active Partners</span>
          </div>
          <div className={styles.statDivider} aria-hidden="true" />
          <div className={styles.stat}>
            <span className={styles.statNum}>12</span>
            <span className={styles.statLabel}>Countries Covered</span>
          </div>
          <div className={styles.statDivider} aria-hidden="true" />
          <div className={styles.stat}>
            <span className={styles.statNum}>2,500+</span>
            <span className={styles.statLabel}>Clients Served</span>
          </div>
        </div>
      </div>

      {/* Wave transition to white */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
