import React from 'react';
import HeadTitle from '../components/HeadTitle';
import SolutionsHero from '../components/solutions/SolutionsHero';
import CrossBorderPayments from '../components/solutions/CrossBorderPayments';
import SmartDriverCard from '../components/solutions/SmartDriverCard';
import PaymentGateway from '../components/solutions/PaymentGateway';
import MobileMoneyCards from '../components/solutions/MobileMoneyCards';

export function SolutionsPage() {
  const title = 'Solutions — FinPay Africa';
  const description = 'Explore FinPay Africa product solutions for cross-border payments, cards, API and KYC.';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/solutions';
  const canonical = `https://finpay-africa.com${pathname}`;
  const hreflangs = [
    { lang: 'en', href: `https://finpay-africa.com/en${pathname.startsWith('/en') ? pathname.slice(3) : pathname}` },
    { lang: 'fr', href: `https://finpay-africa.com/fr${pathname.startsWith('/fr') ? pathname.slice(3) : pathname}` },
  ];
  const og = { title, description, url: canonical, image: 'https://finpay-africa.com/assets/og-solutions.jpg' };

  return (
    <div>
      <HeadTitle title={title} description={description} canonical={canonical} og={og} twitter={{ card: 'summary_large_image', title, description, image: og.image }} hreflangs={hreflangs} jsonLd={{ '@context': 'https://schema.org', '@type': 'ItemList', name: title, description }} />
      <SolutionsHero />
      <CrossBorderPayments />
      <SmartDriverCard />
      <MobileMoneyCards />
      <PaymentGateway />
    </div>
  )
}
