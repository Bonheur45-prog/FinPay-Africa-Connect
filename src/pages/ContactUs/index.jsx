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
import styles from './ContactUs.module.css';
import ContactHero from './sections/ContactHero';
import ContactForm from './sections/ContactForm';
import ContactInfo from './sections/ContactInfo';

export default function ContactUs() {
  return (
    <main className={styles.page}>
      <ContactHero />
      <ContactForm />
      <ContactInfo />
    </main>
  );
}
