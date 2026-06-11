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

  return (
    <div>
      <HeadTitle title={title} />
      <Hero />
      <CoreSolutions />
      <TrustedPartners />
      <FintechShowcase />
      <BlogSection />
      <AfricaPresenceSection />
    </div>
  )
}