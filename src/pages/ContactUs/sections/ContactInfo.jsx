/**
 * FinPay Africa — Contact Info Section
 * Three team member cards with real contact details from the brief,
 * plus office locations and response promise.
 */

import React from 'react';
import { Mail, Phone, Clock } from 'lucide-react';
import styles from './ContactInfo.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

/* ── Real contacts from the FinPay Africa documentation ── */
const TEAM = [
  {
    name: 'Richard Michel',
    role: 'Founding Partner',
    email: 'rmichel@nsi-monetique.com',
    phone: '+32 478 63 71 41',
    location: 'Brussels, Belgium',
    flag: '🇧🇪',
    timezone: 'CET (UTC+1)',
    initials: 'RM',
    gradientFrom: '#7a0e0e',
    gradientTo: '#e8760a',
    availability: 'Mon–Fri, 9:00–18:00 CET',
  },
  {
    name: 'Charles Nzeyimana',
    role: 'Regional Director',
    email: 'c.nzeyima@nsi-monetique.com',
    phone: '+257 79 591 466',
    location: 'Bujumbura, Burundi',
    flag: '🇧🇮',
    timezone: 'EAT (UTC+3)',
    initials: 'CN',
    gradientFrom: '#1a2e5a',
    gradientTo: '#3a6bba',
    availability: 'Mon–Fri, 8:00–17:00 EAT',
  },
  {
    name: 'Jean Paul Ngabonziza',
    role: 'East Africa Director',
    email: 'jp.ngabonziza@nsi-monetique.com',
    phone: '+250 788 624 389',
    location: 'Kigali, Rwanda',
    flag: '🇷🇼',
    timezone: 'EAT (UTC+3)',
    initials: 'JN',
    gradientFrom: '#2d5a1a',
    gradientTo: '#5a9a3a',
    availability: 'Mon–Fri, 8:00–17:00 EAT',
  },
];

const CHANNELS = [
  {
    icon: <Mail size={22} strokeWidth={2} aria-hidden="true" />,
    title: 'Email Us',
    detail: 'rmichel@nsi-monetique.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:rmichel@nsi-monetique.com',
  },
  {
    icon: <Phone size={22} strokeWidth={2} aria-hidden="true" />,
    title: 'Call Us',
    detail: '+32 478 63 71 41',
    sub: 'Belgium office — Mon–Fri',
    href: 'tel:+32478637141',
  },
  {
    icon: <Clock size={22} strokeWidth={2} aria-hidden="true" />,
    title: 'Response Time',
    detail: 'Within 24 Hours',
    sub: 'For all inquiries, guaranteed',
    href: null,
  },
];

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
  const { ref: hRef, isVisible: hVis } = useScrollReveal();
  const { ref: chRef, isVisible: chVis } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className={styles.section}>
      {/* ── Header ── */}
      <div
        ref={hRef}
        className={`${styles.header} ${hVis ? styles.headerVisible : ''}`}
      >
        <div className={styles.eyebrow}>Our Team</div>
        <h2 className={styles.title}>Talk to the Right Person</h2>
        <p className={styles.sub}>
          Our team spans Belgium, Burundi, and Rwanda — covering Europe and
          East Africa time zones. Reach out directly to whoever is closest to your need.
        </p>
      </div>

      {/* ── Team cards ── */}
      <div className={styles.teamGrid}>
        {TEAM.map((member, i) => (
          <TeamCard key={member.email} member={member} index={i} />
        ))}
      </div>

      {/* ── Quick-contact channels ── */}
      <div
        ref={chRef}
        className={`${styles.channelsRow} ${chVis ? styles.channelsRowVisible : ''}`}
      >
        {CHANNELS.map((ch, i) => (
          <div
            key={ch.title}
            className={styles.channelCard}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className={styles.channelIcon}>{ch.icon}</div>
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
          <div className={styles.brandName}>FinPay Africa</div>
          <div className={styles.brandTagline}>Connecting you with your loved ones</div>
        </div>
      </div>
    </section>
  );
}
