/**
 * FinPay Africa — Contact Us Page
 * Route: /contact
 *
 * Sections:
 *  1. ContactHero   — white hero with bold headline & sub-navigation tabs
 *  2. ContactForm   — inquiry form with auto-cycling full-bleed background images
 *  3. ContactInfo   — team cards with direct contacts + office info
 *
 * All section styles are isolated via CSS Modules.
 * No global classes are used or emitted.
 */

import React from 'react';
import HeadTitle from '../../components/HeadTitle';
import styles from './ContactUs.module.css';
import ContactHero from './sections/ContactHero';
import ContactForm from './sections/ContactForm';
import ContactInfo from './sections/ContactInfo';

export default function ContactUs() {
  const title = 'Contact — FinPay Africa';
  const description = 'Contact the FinPay Africa team for sales, support, and partnerships.';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/contact';
  const canonical = `https://finpay-africa.com${pathname}`;
  const hreflangs = [
    { lang: 'en', href: `https://finpay-africa.com/en${pathname.startsWith('/en') ? pathname.slice(3) : pathname}` },
    { lang: 'fr', href: `https://finpay-africa.com/fr${pathname.startsWith('/fr') ? pathname.slice(3) : pathname}` },
  ];
  const og = { title, description, url: canonical, image: 'https://finpay-africa.com/assets/og-contact.jpg' };

  return (
    <>
      <HeadTitle title={title} description={description} canonical={canonical} og={og} twitter={{ card: 'summary_large_image', title, description, image: og.image }} hreflangs={hreflangs} jsonLd={{ '@context': 'https://schema.org', '@type': 'ContactPage', name: title, description }} />
      <main className={styles.page}>
        <ContactHero />
        <ContactForm />
        <ContactInfo />
      </main>
    </>
  );
}
