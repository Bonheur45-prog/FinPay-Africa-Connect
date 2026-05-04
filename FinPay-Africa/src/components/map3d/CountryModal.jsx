/**
 * CountryModal.jsx
 * ─────────────────────────────────────────────────────────────────
 * Info modal for CONNECT company data per country.
 * Closes on: backdrop click, close button, or Escape key.
 */

import React, { useEffect, useCallback } from 'react';
import styles from './AfricaMap3D.module.css';

const STATUS_CONFIG = {
  presence:  { label: '● Active Presence',  cls: styles.badgePresence  },
  expansion: { label: '◐ Expansion Target', cls: styles.badgeExpansion },
  inactive:  { label: '○ Monitored',        cls: styles.badgeInactive  },
};

function formatDate(str) {
  if (!str) return null;
  try {
    return new Date(str).toLocaleDateString('en-GB', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return str; }
}

export default function CountryModal({ country, onClose }) {
  const { name, status, color, metadata = {} } = country;
  const { startDate, projects = [], officeAddress, description } = metadata;
  const badge = STATUS_CONFIG[status] || STATUS_CONFIG.inactive;

  const onKeyDown = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onKeyDown]);

  return (
    <div
      className={styles.modalBackdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="am-modal-title"
    >
      <div
        className={styles.modalPanel}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader} style={{ borderTopColor: color }}>
          <span className={styles.modalSwatch} style={{ background: color }} aria-hidden="true" />
          <h2 id="am-modal-title" className={styles.modalTitle}>{name}</h2>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <span className={`${styles.badge} ${badge.cls}`}>{badge.label}</span>

          {startDate && (
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>📅</span>
              <div>
                <p className={styles.infoLabel}>CONNECT launch date</p>
                <p className={styles.infoValue}>{formatDate(startDate)}</p>
              </div>
            </div>
          )}

          {officeAddress && (
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <p className={styles.infoLabel}>Office / Registered address</p>
                <p className={styles.infoValue}>{officeAddress}</p>
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>🚀</span>
              <div>
                <p className={styles.infoLabel}>Key projects</p>
                <ul className={styles.projectList}>
                  {projects.map((p, i) => (
                    <li key={i} className={styles.projectItem}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {description && (
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>ℹ️</span>
              <div>
                <p className={styles.infoLabel}>Overview</p>
                <p className={styles.infoDescription}>{description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <span className={styles.modalBrand}>CONNECT · Connecting Africa</span>
          <button className={styles.modalCloseBtn} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
