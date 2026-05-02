/**
 * FinPay Africa — Investors Page
 * Route: /investors
 *
 * Sections:
 *  1. InvestorsHero       — full-crimson hero, market size, primary CTA
 *  2. MarketOpportunity   — the problem, why Africa, data points
 *  3. TractionStats       — animated live counters, proof of momentum
 *  4. WhyInvest           — 5 compelling investment reasons
 *  5. InvestorsCTA        — pitch deck download + schedule call
 *
 * All section styles are isolated via CSS Modules.
 */

import React from 'react';
import styles from './Investors.module.css';
import InvestorsHero from './sections/InvestorsHero';
import MarketOpportunity from './sections/MarketOpportunity';
import TractionStats from './sections/TractionStats';
import WhyInvest from './sections/WhyInvest';
import InvestorsCTA from './sections/InvestorsCTA';

export default function Investors() {
  return (
    <main className={styles.page}>
      <InvestorsHero />
      <MarketOpportunity />
      <TractionStats />
      <WhyInvest />
      <InvestorsCTA />
    </main>
  );
}
