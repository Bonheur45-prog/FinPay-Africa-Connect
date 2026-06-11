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
  const description = t('grid.header.subtitle') || '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/partners';
  const canonical = `https://finpay-africa.com${pathname}`;
  const hreflangs = [
    { lang: 'en', href: `https://finpay-africa.com/en${pathname.startsWith('/en') ? pathname.slice(3) : pathname}` },
    { lang: 'fr', href: `https://finpay-africa.com/fr${pathname.startsWith('/fr') ? pathname.slice(3) : pathname}` },
  ];
  const og = { title, description, url: canonical, image: 'https://finpay-africa.com/assets/og-partners.jpg' };

  return (
    <>
      <HeadTitle title={title} description={description} canonical={canonical} og={og} twitter={{ card: 'summary_large_image', title, description, image: og.image }} hreflangs={hreflangs} jsonLd={{ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description }} />
      <main className={styles.page}>
        <PartnersHero />
        <PartnersGrid />
        <BecomePartner />
      </main>
    </>
  );
}
