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

import React from 'react';
import AfricaMap from '../AfricaMap/AfricaMap';

export default function AfricaPresenceSection() {

  // Key points for the left section
  const keyPoints = [
    'Present in 54 African nations with local expertise',
    ' 6 active operations centers driving growth',
    'Strategic expansion into 10 key markets',
    'Trusted by millions across the continent',
    'Committed to financial inclusion'
  ];

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
          <p className="presence-label">Global Reach</p>

          <h2 className="presence-title">
            CONNECT's <span>Presence Across Africa</span>
          </h2>

          <p className="presence-subtitle">
            We are expanding our financial services across the African continent,
            bringing digital solutions to millions of people and businesses.
          </p>

          {/* Key Points */}
          <div className="presence-points">
            {keyPoints.map((point, index) => (
              <div key={index} className="presence-point">
                {point}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            className="presence-cta"
            onClick={() => {
              // Add your navigation or callback here
              console.log('Explore More clicked');
            }}
          >
            Explore More
          </button>
        </div>

        {/* ─── RIGHT SECTION ────────────────────────────────────────── */}
        <div className="presence-right">
          {/* 3D Map Card */}
          <div className="map-card-wrapper">
            <div className="map-container">
              <div className="map-badge">
                Interactive Map
              </div>
              <AfricaMap 
                width={720} 
                height={500} 
                extrusionDepth={3}
                showLegend={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}