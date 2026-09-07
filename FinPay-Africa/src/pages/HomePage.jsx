import React from 'react';
import { useTranslation } from 'react-i18next';
import HeadTitle from '../components/HeadTitle';
import { Hero } from '../components/HomePageCompts/Hero'
import { CoreSolutions } from '../components/HomePageCompts/CoreSolutions';
import { FintechShowcase } from '../components/HomePageCompts/FinTechShowCase';
import { TrustedPartners } from '../components/HomePageCompts/TrustedPartners';
import BlogSection from '../components/HomePageCompts/BlogsSection';
import AfricaPresenceSection from '../components/HomePageCompts/AfricaPresence';

export function HomePage() {
  const { t } = useTranslation('home');
  const title = `${t('hello.eyebrow') || 'Home'} — FinPay Africa`;
  const description = t('hello.paragraph');
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const canonical = `https://finpay-africa.com${pathname}`;
  const hreflangs = [
    { lang: 'en', href: `https://finpay-africa.com/en${pathname.startsWith('/en') ? pathname.slice(3) : pathname}` },
    { lang: 'fr', href: `https://finpay-africa.com/fr${pathname.startsWith('/fr') ? pathname.slice(3) : pathname}` },
  ];

  const og = { title, description, url: canonical, image: 'https://finpay-africa.com/assets/og-home.jpg' };

  return (
    <div>
      <HeadTitle title={title} description={description} canonical={canonical} og={og} twitter={{ card: 'summary_large_image', title, description, image: og.image }} hreflangs={hreflangs} jsonLd={{ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description }} />
      <Hero />
      <CoreSolutions />
      <TrustedPartners />
      <FintechShowcase />
      <BlogSection />
      <AfricaPresenceSection />
    </div>
  )
}