/**
 * CountryModal.jsx
 * ─────────────────────────────────────────────────────────────────
 * Displays company data for the selected country.
 * Closes on: backdrop click · close button · Escape key.
 *
 * Reads all styles from AfricaMap.module.css (shared scope).
 */

import React, { useEffect, useCallback } from 'react';
import styles from './AfricaMap.module.css';

// ─── Status config ────────────────────────────────────────────────
const STATUS = {
  presence:  { label: '● Active Presence',  cls: styles.modalStatusPresence  },
  expansion: { label: '◐ Expansion Target', cls: styles.modalStatusExpansion },
  inactive:  { label: '○ Monitored',        cls: styles.modalStatusInactive  },
};

function formatDate(str) {
  if (!str) return null;
  try {
    return new Date(str).toLocaleDateString('en-GB', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return str;
  }
}

// ─── Component ────────────────────────────────────────────────────
export default function CountryModal({ country, onClose }) {
  const { name, status, color, metadata = {} } = country;
  const { startDate, projects = [], officeAddress, description } = metadata;
  const badge = STATUS[status] ?? STATUS.inactive;

  // Close on Escape
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

        {/* ── Header ──────────────────────────────────────────────── */}
        <div
          className={styles.modalHeader}
          style={{ borderTopColor: color }}
        >
          <span
            className={styles.modalSwatch}
            style={{ background: color }}
            aria-hidden="true"
          />
          <h2 id="am-modal-title" className={styles.modalTitle}>
            {name}
          </h2>
          <span className={`${styles.modalStatus} ${badge.cls}`}>
            {badge.label}
          </span>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className={styles.modalBody}>

          {/* Launch date */}
          {startDate && (
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>📅</span>
              <div>
                <p className={styles.infoLabel}>FINPAY launch date</p>
                <p className={styles.infoValue}>{formatDate(startDate)}</p>
              </div>
            </div>
          )}

          {/* Office address */}
          {officeAddress && (
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <p className={styles.infoLabel}>Office / Registered address</p>
                <p className={styles.infoValue}>{officeAddress}</p>
              </div>
            </div>
          )}

          {/* Divider before projects / description */}
          {(projects.length > 0 || description) && (
            <hr className={styles.divider} />
          )}

          {/* Key projects */}
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

          {/* Description / overview */}
          {description && (
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>ℹ️</span>
              <div>
                <p className={styles.infoLabel}>Overview</p>
                <p className={styles.infoDescription}>{description}</p>
              </div>
            </div>
          )}

          {/* Fallback when no metadata */}
          {!startDate && !officeAddress && projects.length === 0 && !description && (
            <p className={styles.infoDescription} style={{ opacity: 0.45 }}>
              No additional information available for this country yet.
            </p>
          )}

        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div className={styles.modalFooter}>
          <span className={styles.modalBrand}>FINPAY · Connecting Africa</span>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
