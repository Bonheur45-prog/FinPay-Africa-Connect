/**
 * FinPay Africa — Investors CTA Section
 * The closing call-to-action for the Investors page.
 * Two paths: Request Pitch Deck OR Schedule a Call.
 * Cream background with a bold centered card.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './InvestorsCTA.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

function TeamCard({ member, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <a
      ref={ref}
      href={`mailto:${member.email}?subject=Investment%20Inquiry%20-%20FinPay%20Africa`}
      className={`${styles.teamCard} ${isVisible ? styles.teamCardVisible : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      aria-label={`Email ${member.name}`}
    >
      <div className={styles.avatar}>{member.initials}</div>
      <div className={styles.memberInfo}>
        <div className={styles.memberName}>{member.name}</div>
        <div className={styles.memberRole}>{member.role}</div>
        <div className={styles.memberLocation}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {member.location}
        </div>
        <div className={styles.memberEmail}>{member.email}</div>
        <div className={styles.memberPhone}>{member.phone}</div>
      </div>
      <div className={styles.cardArrow} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </a>
  );
}

export default function InvestorsCTA() {
  const { t } = useTranslation('investors');
  const { ref: heroRef, isVisible: heroVis } = useScrollReveal({ threshold: 0.15 });
  const { ref: teamRef, isVisible: teamVis } = useScrollReveal({ threshold: 0.1 });
  const [copied, setCopied] = useState(false);

  const team = t('cta.team', { returnObjects: true });
  const teamArray = Array.isArray(team) ? team : [];

  const badges = t('cta.badges', { returnObjects: true });
  const badgesArray = Array.isArray(badges) ? badges : [];

  const handleCopy = () => {
    navigator.clipboard.writeText('rmichel@nsi-monetique.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.section}>
      {/* ── Main CTA card ── */}
      <div
        ref={heroRef}
        className={`${styles.ctaCard} ${heroVis ? styles.ctaCardVisible : ''}`}
      >
        {/* Gradient BG */}
        <div className={styles.ctaBg} aria-hidden="true" />
        <div className={styles.ctaOrb1} aria-hidden="true" />
        <div className={styles.ctaOrb2} aria-hidden="true" />

        <div className={styles.ctaContent}>
          <div className={styles.ctaEyebrow}>{t('cta.eyebrow')}</div>

          <h2 className={styles.ctaTitle}>
            {t('cta.title.part1')}
            <br />
            <span className={styles.ctaGold}>{t('cta.title.part2')}</span>
          </h2>

          <p className={styles.ctaBody}>
            {t('cta.description')}
          </p>

          {/* Two CTA buttons */}
          <div className={styles.ctaActions}>
            <a
              href="mailto:rmichel@nsi-monetique.com?subject=Pitch%20Deck%20Request%20-%20FinPay%20Africa"
              className={styles.btnPitch}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {t('cta.buttons.pitch')}
            </a>

            <a
              href="mailto:rmichel@nsi-monetique.com?subject=Investor%20Call%20Request%20-%20FinPay%20Africa"
              className={styles.btnCall}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {t('cta.buttons.schedule')}
            </a>
          </div>

          {/* Quick copy email */}
          <button
            onClick={handleCopy}
            className={styles.copyEmail}
            aria-label="Copy contact email"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {t('cta.copyStatus.copied')}
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                {t('cta.copyStatus.default')}
              </>
            )}
          </button>

          {/* Confidence badges */}
          <div className={styles.badges}>
            {badgesArray.map((b) => (
              <span key={b} className={styles.badge}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Team contacts ── */}
      <div ref={teamRef} className={`${styles.teamSection} ${teamVis ? styles.teamSectionVisible : ''}`}>
        <div className={styles.teamHeader}>
          <h3 className={styles.teamTitle}>{t('cta.teamSection.title')}</h3>
          <p className={styles.teamSub}>
            {t('cta.teamSection.subtitle')}
          </p>
        </div>

        <div className={styles.teamGrid}>
          {teamArray.map((member, i) => (
            <TeamCard key={member.email} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}