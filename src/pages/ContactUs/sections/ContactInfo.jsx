/**
 * FinPay Africa — Contact Info Section
 * Three team member cards with real contact details from the brief,
 * plus office locations and response promise.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Clock } from 'lucide-react';
import styles from './ContactInfo.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

function TeamCard({ member, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`${styles.teamCard} ${isVisible ? styles.teamCardVisible : ''}`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      {/* Gradient top bar */}
      <div
        className={styles.cardTopBar}
        style={{ background: `linear-gradient(90deg, ${member.gradientFrom}, ${member.gradientTo})` }}
        aria-hidden="true"
      />

      {/* Avatar */}
      <div className={styles.avatarRow}>
        <div
          className={styles.avatar}
          style={{ background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})` }}
          aria-hidden="true"
        >
          {member.initials}
        </div>
        <div className={styles.memberBasic}>
          <div className={styles.memberName}>{member.name}</div>
          <div className={styles.memberRole}>{member.role}</div>
          <div className={styles.memberLoc}>
            <span aria-label={`Located in ${member.location}`}>{member.flag}</span>
            {member.location}
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div className={styles.contactDetails}>
        <a
          href={`mailto:${member.email}?subject=FinPay%20Africa%20Inquiry`}
          className={styles.contactRow}
          aria-label={`Email ${member.name}`}
        >
          <Mail size={14} strokeWidth={2} aria-hidden="true" />
          <span>{member.email}</span>
        </a>

        <a
          href={`tel:${member.phone.replace(/\s/g, '')}`}
          className={styles.contactRow}
          aria-label={`Call ${member.name}`}
        >
          <Phone size={14} strokeWidth={2} aria-hidden="true" />
          <span>{member.phone}</span>
        </a>
      </div>

      {/* Availability chip */}
      <div className={styles.availChip}>
        <span className={styles.availDot} aria-hidden="true" />
        {member.availability} · {member.timezone}
      </div>
    </div>
  );
}

export default function ContactInfo() {
  const { t } = useTranslation('contact');
  const { ref: hRef, isVisible: hVis } = useScrollReveal();
  const { ref: chRef, isVisible: chVis } = useScrollReveal({ threshold: 0.2 });

  const team = t('info.team', { returnObjects: true });
  const teamArray = Array.isArray(team) ? team : [];

  const channels = t('info.channels', { returnObjects: true });
  const channelsArray = Array.isArray(channels) ? channels : [];

  return (
    <section className={styles.section}>
      {/* ── Header ── */}
      <div
        ref={hRef}
        className={`${styles.header} ${hVis ? styles.headerVisible : ''}`}
      >
        <div className={styles.eyebrow}>{t('info.eyebrow')}</div>
        <h2 className={styles.title}>{t('info.title')}</h2>
        <p className={styles.sub}>
          {t('info.subtitle')}
        </p>
      </div>

      {/* ── Team cards ── */}
      <div className={styles.teamGrid}>
        {teamArray.map((member, i) => (
          <TeamCard key={member.email} member={member} index={i} />
        ))}
      </div>

      {/* ── Quick-contact channels ── */}
      <div
        ref={chRef}
        className={`${styles.channelsRow} ${chVis ? styles.channelsRowVisible : ''}`}
      >
        {channelsArray.map((ch, i) => (
          <div
            key={ch.title}
            className={styles.channelCard}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className={styles.channelIcon}>
              {ch.type === 'mail' && <Mail size={22} strokeWidth={2} aria-hidden="true" />}
              {ch.type === 'phone' && <Phone size={22} strokeWidth={2} aria-hidden="true" />}
              {ch.type === 'clock' && <Clock size={22} strokeWidth={2} aria-hidden="true" />}
            </div>
            <div className={styles.channelText}>
              <div className={styles.channelTitle}>{ch.title}</div>
              {ch.href ? (
                <a href={ch.href} className={styles.channelDetail}>{ch.detail}</a>
              ) : (
                <div className={styles.channelDetail}>{ch.detail}</div>
              )}
              <div className={styles.channelSub}>{ch.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom brand strip ── */}
      <div className={styles.brandStrip}>
        <div className={styles.brandMark} aria-hidden="true">
          {/* Simplified snowflake mark inline SVG */}
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
            <path d="M30 4 L34 26 L30 30 L26 26 Z" fill="#e8760a" opacity="0.7"/>
            <path d="M30 56 L34 34 L30 30 L26 34 Z" fill="#7a0e0e" opacity="0.7"/>
            <path d="M4 30 L26 34 L30 30 L26 26 Z" fill="#e8760a" opacity="0.7"/>
            <path d="M56 30 L34 34 L30 30 L34 26 Z" fill="#7a0e0e" opacity="0.7"/>
            <path d="M12 12 L26 26 L30 30 Z" fill="#f5a623" opacity="0.5"/>
            <path d="M48 12 L34 26 L30 30 Z" fill="#f5a623" opacity="0.5"/>
            <path d="M12 48 L26 34 L30 30 Z" fill="#f5a623" opacity="0.5"/>
            <path d="M48 48 L34 34 L30 30 Z" fill="#f5a623" opacity="0.5"/>
            <circle cx="30" cy="30" r="6" fill="#f5c518" opacity="0.6"/>
          </svg>
        </div>
        <div className={styles.brandWords}>
          <div className={styles.brandName}>{t('info.brand.name')}</div>
          <div className={styles.brandTagline}>{t('info.brand.tagline')}</div>
        </div>
      </div>
    </section>
  );
}