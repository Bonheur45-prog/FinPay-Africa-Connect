/**
 * FinPay Africa — Market Opportunity Section
 * Presents the problem (high costs, underserved Africa) and
 * FinPay's solution. White background, bold data points.
 */

import React from 'react';
import { TrendingDown, Banknote, Landmark } from 'lucide-react';
import styles from './MarketOpportunity.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

const PAIN_POINTS = [
  {
    value: '9.1%',
    label: 'Average transaction cost to Sub-Saharan Africa',
    note: 'vs 7.2% global average and 5.4% in South Asia',
    icon: TrendingDown,
  },
  {
    value: '$40B+',
    label: 'Annual remittances to Sub-Saharan Africa',
    note: 'Representing 10%+ of GDP for several African nations',
    icon: Banknote,
  },
  {
    value: '57%',
    label: 'Of adults in Sub-Saharan Africa remain unbanked',
    note: 'The largest unbanked population of any world region',
    icon: Landmark,
  },
];

const SOLUTION_POINTS = [
  {
    title: 'Instant, low-cost transfers',
    desc: 'Our platform reduces transfer costs to approach the 3% G20 target, saving families real money on every transaction.',
  },
  {
    title: 'IBAN account + bank card',
    desc: 'Every user receives a certified bank card and IBAN account, granting access to the global financial system.',
  },
  {
    title: 'Mobile-first, diaspora-ready',
    desc: 'Designed for the African diaspora in Europe — simple, fast, and available wherever they are.',
  },
  {
    title: 'Event & tontine management',
    desc: 'Community financial pooling tools that reflect real African social and economic practices.',
  },
];

function PainCard({ point, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`${styles.painCard} ${isVisible ? styles.painCardVisible : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={styles.painIcon} aria-hidden="true">
        <point.icon size={32} strokeWidth={1.5} />
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
  const { ref: hRef, isVisible: hVis } = useScrollReveal();
  const { ref: sRef, isVisible: sVis } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.section}>
      {/* ── Problem block ── */}
      <div className={styles.problemBlock}>
        <div
          ref={hRef}
          className={`${styles.sectionHeader} ${hVis ? styles.headerVisible : ''}`}
        >
          <div className={styles.eyebrow}>The Problem</div>
          <h2 className={styles.sectionTitle}>
            Africa Pays the Most<br />to Transfer its Own Money
          </h2>
          <p className={styles.sectionSub}>
            Despite being one of the most active remittance regions in the world,
            Sub-Saharan Africa consistently pays the highest fees, suffers the slowest
            transfers, and has the least financial infrastructure to support its people.
          </p>
        </div>

        <div className={styles.painGrid}>
          {PAIN_POINTS.map((p, i) => (
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
            <div className={styles.eyebrowDark}>Our Answer</div>
            <h2 className={styles.solutionTitle}>
              A Complete Financial Ecosystem, Built for Africa
            </h2>
            <p className={styles.solutionSub}>
              FinPay Africa goes beyond simple transfers. We are building the financial
              infrastructure that connects the diaspora to their home countries —
              quickly, simply, and affordably.
            </p>
          </div>

          <div className={styles.solutionList}>
            {SOLUTION_POINTS.map((sp, i) => (
              <SolutionItem key={sp.title} sp={sp} i={i} />
            ))}
          </div>
        </div>

        {/* Visual right side: corridor cost comparison bar */}
        <div className={styles.solutionRight}>
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Transaction Cost by Region</h3>
            <div className={styles.chartBars}>
              {[
                { region: 'Sub-Saharan Africa', pct: 9.1, color: '#7a0e0e' },
                { region: 'Global Average',     pct: 7.2, color: '#e8760a' },
                { region: 'South Asia',         pct: 5.4, color: '#4a4a6a' },
                { region: 'FinPay Target',      pct: 3.0, color: '#2d7a3a' },
              ].map((bar) => (
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
              FinPay Africa targets the G20 5% commitment, undercut to 3%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
