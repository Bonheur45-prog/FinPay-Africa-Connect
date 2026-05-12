/**
 * AfricaPresenceSection.jsx
 * ─────────────────────────────────────────────────────────────────────────
 * Premium section layout with:
 * - LEFT: Label, Title, Subtitle, Key Points, CTA Button
 * - RIGHT: 3D Africa Map in a premium card with glowing borders & shadows
 * 
 * Features:
 * - Responsive design (Desktop, Tablet, Mobile)
 * - Premium styling with gradient borders and shadows
 * - Stats displayed above the map card
 * - Smooth animations and hover effects
 * - Customizable content and styling
 */

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AfricaMap from '../AfricaMap/AfricaMap';
import StatCard from './StatCard';
import styles from './AfricaPresence.module.css';

// ──────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────────────────────

export default function AfricaPresenceSection({
  // Left section content (with translation fallbacks)
  label,
  titlePrefix,
  titleHighlight,
  subtitle,
  keyPoints,
  ctaText,
  onCtaClick = () => console.log('FinPay Africa Presence CTA clicked'),
  
  // Stats section content
  showStats = true,
  stats,
  
  // Map section content
  mapBadgeText,
  mapProps = {
    width: 720,
    height: 500,
    extrusionDepth: 5,
    showLegend: true
  }
} = {}) {
  
  // Get translations
  const { t } = useTranslation('home');
  
  // Use translations as defaults if props not provided
  const finalLabel = label ?? t('africa-presence.label');
  const finalTitlePrefix = titlePrefix ?? t('africa-presence.titlePrefix');
  const finalTitleHighlight = titleHighlight ?? t('africa-presence.titleHighlight');
  const finalSubtitle = subtitle ?? t('africa-presence.subtitle');
  const finalKeyPoints = useMemo(
    () => keyPoints ?? t('africa-presence.keyPoints', { returnObjects: true }),
    [keyPoints, t]
  );
  const finalCtaText = ctaText ?? t('africa-presence.ctaText');
  const finalMapBadgeText = useMemo(
    () => mapBadgeText ?? t('africa-presence.mapBadgeText'),
    [mapBadgeText, t]
  );
  const finalStats = useMemo(
    () => stats ?? t('africa-presence.stats', { returnObjects: true }),
    [stats, t]
  );

  const activeMapProps = useMemo(
    () => ({
      width: 720,
      height: 500,
      extrusionDepth: 5,
      showLegend: true,
      ...mapProps,
    }),
    [mapProps]
  );

  const statsList = useMemo(
    () => (finalStats ? Object.entries(finalStats) : []),
    [finalStats]
  );




  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ─── LEFT SECTION ─────────────────────────────────────────── */}
        <div className={styles.left}>
          <p className={styles.label}>{finalLabel}</p>

          <h2 className={styles.title}>
            {finalTitlePrefix}'s <span className={styles.titleHighlight}>{finalTitleHighlight}</span>
          </h2>

          <p className={styles.subtitle}>
            {finalSubtitle}
          </p>

          {/* Key Points */}
          <div className={styles.points}>
            {finalKeyPoints && finalKeyPoints.map((point, index) => (
              <div key={index} className={styles.point}>
                {point}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            className={styles.cta}
            onClick={onCtaClick}
            aria-label={finalCtaText}
          >
            {finalCtaText}
          </button>
        </div>

        {/* ─── RIGHT SECTION ────────────────────────────────────────── */}
        <div className={styles.right}>
          {/* Stats Section */}
          {showStats && statsList.length > 0 && (
            <div className={styles.stats}>
              {statsList.map(([key, stat]) => (
                <StatCard 
                  key={key}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                />
              ))}
            </div>
          )}

          {/* 3D Map Card */}
          <div className={styles.mapCardWrapper}>
            <div className={styles.mapContainer}>
              <div className={styles.mapBadge}>
                {finalMapBadgeText}
              </div>
              <AfricaMap 
                width={activeMapProps.width}
                height={activeMapProps.height}
                extrusionDepth={activeMapProps.extrusionDepth}
                showLegend={activeMapProps.showLegend}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
