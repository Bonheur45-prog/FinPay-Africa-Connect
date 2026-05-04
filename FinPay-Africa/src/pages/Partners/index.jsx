/**
 * FinPay Africa — Partners Page
 * Route: /partners
 *
 * Sections:
 *  1. PartnersHero     — crimson hero with stats
 *  2. PartnersGrid     — filterable partner cards
 *  3. BecomePartner    — CTA to join the ecosystem
 *
 * All section styles are isolated via CSS Modules.
 * No global classes are used or emitted.
 */

import React from 'react';
import PartnersHero from './sections/PartnersHero';
import PartnersGrid from './sections/PartnersGrid';
import BecomePartner from './sections/BecomePartner';
import styles from './Partners.module.css';

export default function Partners() {
  return (
    <>
      <main className={styles.page}>
      <PartnersHero />
      <PartnersGrid />
      <BecomePartner />
      </main>
    </>

  );
}
