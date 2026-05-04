/**
 * FinPay Africa — Market Opportunity Section
 * Presents the problem (high costs, underserved Africa) and
 * FinPay's solution. White background, bold data points.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingDown, Banknote, Landmark } from 'lucide-react';
import styles from './MarketOpportunity.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

const iconMap = {
  trendingDown: TrendingDown,
  banknote: Banknote,
  landmark: Landmark,
};

function PainCard({ point, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const IconComponent = iconMap[point.icon] || TrendingDown;
  
  return (
    <div
      ref={ref}
      className={`${styles.painCard} ${isVisible ? styles.painCardVisible : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={styles.painIcon} aria-hidden="true">
        <IconComponent size={32} strokeWidth={1.5} />
      </div>
      <div className={styles.painValue}>{point.value}</div>
      <div className={styles.painLabel}>{point.label}</div>
      <div className={styles.painNote}>{point.note}</div>
    </div>
  );
}

function SolutionItem({ sp, i }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`${styles.solutionItem} ${isVisible ? styles.solutionItemVisible : ''}`}
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className={styles.solutionDot} aria-hidden="true" />
      <div className={styles.solutionItemText}>
        <strong className={styles.solutionItemTitle}>{sp.title}</strong>
        <p className={styles.solutionItemDesc}>{sp.desc}</p>
      </div>
    </div>
  );
}

export default function MarketOpportunity() {
  const { t } = useTranslation('investors');
  const { ref: hRef, isVisible: hVis } = useScrollReveal();
  const { ref: sRef, isVisible: sVis } = useScrollReveal({ threshold: 0.1 });

  const painPoints = t('market.painPoints', { returnObjects: true });
  const painPointsArray = Array.isArray(painPoints) ? painPoints : [];

  const solutionPoints = t('market.solutionPoints', { returnObjects: true });
  const solutionPointsArray = Array.isArray(solutionPoints) ? solutionPoints : [];

  const chartData = t('market.chartData', { returnObjects: true });
  const chartDataArray = Array.isArray(chartData) ? chartData : [];

  return (
    <section className={styles.section}>
      {/* ── Problem block ── */}
      <div className={styles.problemBlock}>
        <div
          ref={hRef}
          className={`${styles.sectionHeader} ${hVis ? styles.headerVisible : ''}`}
        >
          <div className={styles.eyebrow}>{t('market.problem.label')}</div>
          <h2 className={styles.sectionTitle}>
            {t('market.problem.title.part1')}<br />{t('market.problem.title.part2')}
          </h2>
          <p className={styles.sectionSub}>
            {t('market.problem.subtitle')}
          </p>
        </div>

        <div className={styles.painGrid}>
          {painPointsArray.map((p, i) => (
            <PainCard key={p.value} point={p} index={i} />
          ))}
        </div>
      </div>

      {/* ── Solution block ── */}
      <div className={styles.solutionBlock}>
        <div className={styles.solutionLeft}>
          <div
            ref={sRef}
            className={`${styles.solutionTextWrap} ${sVis ? styles.solutionVisible : ''}`}
          >
            <div className={styles.eyebrowDark}>{t('market.solution.label')}</div>
            <h2 className={styles.solutionTitle}>
              {t('market.solution.title')}
            </h2>
            <p className={styles.solutionSub}>
              {t('market.solution.subtitle')}
            </p>
          </div>

          <div className={styles.solutionList}>
            {solutionPointsArray.map((sp, i) => (
              <SolutionItem key={sp.title} sp={sp} i={i} />
            ))}
          </div>
        </div>

        {/* Visual right side: corridor cost comparison bar */}
        <div className={styles.solutionRight}>
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>{t('market.chart.title')}</h3>
            <div className={styles.chartBars}>
              {chartDataArray.map((bar) => (
                <div key={bar.region} className={styles.chartRow}>
                  <span className={styles.chartLabel}>{bar.region}</span>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${(bar.pct / 10) * 100}%`,
                        background: bar.color,
                      }}
                    />
                  </div>
                  <span className={styles.chartPct} style={{ color: bar.color }}>
                    {bar.pct}%
                  </span>
                </div>
              ))}
            </div>
            <p className={styles.chartCaption}>
              {t('market.chart.caption')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}