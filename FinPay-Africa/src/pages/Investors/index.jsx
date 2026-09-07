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
import HeadTitle from '../../components/HeadTitle';
import styles from './Investors.module.css';
import InvestorsHero from './sections/InvestorsHero';
import MarketOpportunity from './sections/MarketOpportunity';
import TractionStats from './sections/TractionStats';
import WhyInvest from './sections/WhyInvest';
import InvestorsCTA from './sections/InvestorsCTA';

export default function Investors() {
  const title = 'Investors — FinPay Africa';
  const description = 'FinPay Africa investor relations, traction, and market opportunity information.';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/investors';
  const canonical = `https://finpay-africa.com${pathname}`;
  const hreflangs = [
    { lang: 'en', href: `https://finpay-africa.com/en${pathname.startsWith('/en') ? pathname.slice(3) : pathname}` },
    { lang: 'fr', href: `https://finpay-africa.com/fr${pathname.startsWith('/fr') ? pathname.slice(3) : pathname}` },
  ];
  const og = { title, description, url: canonical, image: 'https://finpay-africa.com/assets/og-investors.jpg' };

  return (
    <>
      <HeadTitle title={title} description={description} canonical={canonical} og={og} twitter={{ card: 'summary_large_image', title, description, image: og.image }} hreflangs={hreflangs} jsonLd={{ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description }} />
      <main className={styles.page}>
        <InvestorsHero />
        <MarketOpportunity />
        <TractionStats />
        <WhyInvest />
        <InvestorsCTA />
      </main>
    </>
  );
}
