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
import { useTranslation } from 'react-i18next';
import HeadTitle from '../../components/HeadTitle';
import PartnersHero from './sections/PartnersHero';
import PartnersGrid from './sections/PartnersGrid';
import BecomePartner from './sections/BecomePartner';
import styles from './Partners.module.css';

export default function Partners() {
  const { t } = useTranslation('partners');
  const title = `${t('grid.header.title') || 'Partners'} — FinPay Africa`;

  return (
    <>
      <HeadTitle title={title} />
      <main className={styles.page}>
        <PartnersHero />
        <PartnersGrid />
        <BecomePartner />
      </main>
    </>
  );
}
