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

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AfricaMap from '../AfricaMap/AfricaMap';

// ──────────────────────────────────────────────────────────────────────────────
// STAT CARD COMPONENT
// ──────────────────────────────────────────────────────────────────────────────

function StatCard({ value, label, suffix }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  // Intersection Observer to trigger animation when card comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the card is visible
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVisible]);
  
  // Animated counter effect
  useEffect(() => {
    if (!isVisible) return;
    
    const endValue = parseFloat(value) || 0;
    const duration = 2000; // 2 seconds
    let startTime;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = 0 + (endValue - 0) * easeOutCubic;
      
      setCount(Math.floor(currentValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue); // Ensure final value is exact
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, value]);
  
  return (
    <div className="stat-card" ref={cardRef}>
      <div className="stat-value">
        {count}{suffix}
      </div>
      <div className="stat-label">
        {label}
      </div>
    </div>
  );
}

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
  const finalKeyPoints = keyPoints ?? t('africa-presence.keyPoints', { returnObjects: true });
  const finalCtaText = ctaText ?? t('africa-presence.ctaText');
  const finalMapBadgeText = mapBadgeText ?? t('africa-presence.mapBadgeText');
  const finalStats = stats ?? t('africa-presence.stats', { returnObjects: true });




  return (
    <section className="africa-presence-section">
      <style>{`
        .africa-presence-section {
          width: 100%;
          padding: 80px 40px;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          overflow: hidden;
        }

        .presence-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        /* ─── LEFT SECTION ─────────────────────────────────────────────── */
        .presence-left {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .presence-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8C1A13;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .presence-label::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 2px;
          background: linear-gradient(90deg, #8C1A13, transparent);
          border-radius: 1px;
        }

        .presence-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          color: #1a1a1a;
          margin: 0;
          letter-spacing: -1px;
        }

        .presence-title span {
          background: linear-gradient(135deg, #8C1A13 0%, #6A1109 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .presence-subtitle {
          font-size: 18px;
          line-height: 1.6;
          color: #666;
          margin: 0;
          font-weight: 400;
        }

        /* ─── KEY POINTS ──────────────────────────────────────────────── */
        .presence-points {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 24px 0;
        }

        .presence-point {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 15px;
          color: #333;
          line-height: 1.6;
          padding: 12px;
          border-left: 3px solid transparent;
          border-image: linear-gradient(180deg, #8C1A13, #6A1109) 1;
          background: rgba(140, 26, 19, 0.02);
          border-radius: 0 4px 4px 0;
          transition: all 0.3s ease;
        }

        .presence-point:hover {
          background: rgba(140, 26, 19, 0.08);
          transform: translateX(4px);
        }

        .presence-point::before {
          content: '✓';
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #8C1A13, #6A1109);
          color: white;
          border-radius: 50%;
          flex-shrink: 0;
          font-size: 12px;
          font-weight: 700;
        }

        /* ─── CTA BUTTON ───────────────────────────────────────────────── */
        .presence-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #8C1A13 0%, #6A1109 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(140, 26, 19, 0.3);
          text-decoration: none;
          width: fit-content;
          margin-top: 12px;
        }

        .presence-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(140, 26, 19, 0.4);
        }

        .presence-cta:active {
          transform: translateY(0);
        }

        .presence-cta::after {
          content: '→';
          font-size: 18px;
        }

        /* ─── RIGHT SECTION (MAP CARD) ───────────────────────────────── */
        .presence-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* ─── STATS SECTION ────────────────────────────────────────── */
        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
          margin-bottom: 8px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(140, 26, 19, 0.08);
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(140, 26, 19, 0.4), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: rgba(140, 26, 19, 0.16);
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #8C1A13;
          margin-bottom: 4px;
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: -0.5px;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'Rajdhani', sans-serif;
        }

        /* 3D Map Card Container */
        .map-card-wrapper {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          
          /* Clean shadow for modern look */
          box-shadow: 
            0 0 0 1px rgba(140, 26, 19, 0.06),
            0 12px 32px rgba(0, 0, 0, 0.08);
          
          transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .map-card-wrapper:hover {
          box-shadow: 
            0 0 0 2px rgba(140, 26, 19, 0.12),
            0 16px 48px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        /* Gradient top border */
        .map-card-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(140, 26, 19, 0.3), transparent);
          z-index: 10;
        }

        .map-container {
          position: relative;
          width: 100%;
          height: 500px;
          background: linear-gradient(135deg, #fafbfc 0%, #ffffff 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Badge on top-right */
        .map-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          padding: 10px 18px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 600;
          color: #8C1A13;
          box-shadow: 0 4px 16px rgba(140, 26, 19, 0.15);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .map-badge::before {
          content: '●';
          color: #8C1A13;
          font-size: 8px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* ─── RESPONSIVE DESIGN ────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .presence-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .presence-title {
            font-size: 36px;
          }

          .presence-subtitle {
            font-size: 16px;
          }

          .map-container {
            height: 420px;
          }
        }

        @media (max-width: 768px) {
          .africa-presence-section {
            padding: 60px 24px;
          }

          .presence-container {
            gap: 32px;
          }

          .presence-title {
            font-size: 28px;
          }

          .presence-subtitle {
            font-size: 15px;
          }

          .presence-points {
            gap: 12px;
            margin: 16px 0;
          }

          .presence-point {
            font-size: 14px;
            padding: 10px;
          }

          .stats-section {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .stat-card {
            padding: 16px 12px;
          }

          .stat-value {
            font-size: 24px;
          }

          .stat-label {
            font-size: 11px;
          }

          .map-container {
            height: 360px;
          }

          .map-card-wrapper {
            box-shadow: 
              0 0 0 1px rgba(140, 26, 19, 0.06),
              0 8px 20px rgba(0, 0, 0, 0.06);
          }
        }

        @media (max-width: 480px) {
          .africa-presence-section {
            padding: 48px 16px;
          }

          .presence-container {
            gap: 24px;
          }

          .presence-title {
            font-size: 24px;
          }

          .presence-subtitle {
            font-size: 14px;
          }

          .presence-points {
            gap: 10px;
          }

          .presence-point {
            font-size: 13px;
            padding: 8px;
          }

          .presence-cta {
            padding: 14px 24px;
            font-size: 14px;
            width: 100%;
            justify-content: center;
          }

          .stats-section {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .stat-card {
            padding: 14px 10px;
          }

          .stat-value {
            font-size: 22px;
          }

          .stat-label {
            font-size: 10px;
          }

          .map-container {
            height: 300px;
          }

          .map-badge {
            font-size: 11px;
            padding: 6px 12px;
            top: 12px;
            right: 12px;
          }
        }

        /* ─── ANIMATION ──────────────────────────────────────────────── */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .presence-left {
          animation: fadeInUp 0.6s ease-out;
        }

        .presence-right {
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }
      `}</style>

      <div className="presence-container">
        {/* ─── LEFT SECTION ─────────────────────────────────────────── */}
        <div className="presence-left">
          <p className="presence-label">{finalLabel}</p>

          <h2 className="presence-title">
            {finalTitlePrefix}'s <span>{finalTitleHighlight}</span>
          </h2>

          <p className="presence-subtitle">
            {finalSubtitle}
          </p>

          {/* Key Points */}
          <div className="presence-points">
            {finalKeyPoints && finalKeyPoints.map((point, index) => (
              <div key={index} className="presence-point">
                {point}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            className="presence-cta"
            onClick={onCtaClick}
            aria-label={finalCtaText}
          >
            {finalCtaText}
          </button>
        </div>

        {/* ─── RIGHT SECTION ────────────────────────────────────────── */}
        <div className="presence-right">
          {/* Stats Section */}
          {showStats && finalStats && (
            <div className="stats-section">
              {Object.entries(finalStats).map(([key, stat]) => (
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
          <div className="map-card-wrapper">
            <div className="map-container">
              <div className="map-badge">
                {finalMapBadgeText}
              </div>
              <AfricaMap 
                width={mapProps.width}
                height={mapProps.height}
                extrusionDepth={mapProps.extrusionDepth}
                showLegend={mapProps.showLegend}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}