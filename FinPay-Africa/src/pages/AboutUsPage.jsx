import AboutHero from "../components/AboutUsPage/AboutHero";
import CompanyOverview from "../components/AboutUsPage/CompanyOverview";
import Timeline from "../components/AboutUsPage/Timeline";
import MissionVision from "../components/AboutUsPage/MissionVision";
import CoreStrengths from "../components/AboutUsPage/CoreStrengths";
import TrustIndicators from "../components/AboutUsPage/TrustIndicators";
import StatsAchievements from "../components/AboutUsPage/StatsAchievements";
import CallToAction from "../components/AboutUsPage/CallToAction";
import styles from './AboutUsPage.module.css';
import { useTranslation } from 'react-i18next';
import HeadTitle from '../components/HeadTitle';

export function AboutUsPage() {
  const { t } = useTranslation('about');
  const title = `${t('hero.badge') || 'About Us'} — FinPay Africa`;
  const description = t('company.description.p1') || t('hero.subtitle');
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/about';
  const canonical = `https://finpay-africa.com${pathname}`;
  const hreflangs = [
    { lang: 'en', href: `https://finpay-africa.com/en${pathname.startsWith('/en') ? pathname.slice(3) : pathname}` },
    { lang: 'fr', href: `https://finpay-africa.com/fr${pathname.startsWith('/fr') ? pathname.slice(3) : pathname}` },
  ];

  const og = { title, description, url: canonical, image: 'https://finpay-africa.com/assets/og-about.jpg' };

  return (
    <div>
      <HeadTitle title={title} description={description} canonical={canonical} og={og} twitter={{ card: 'summary_large_image', title, description, image: og.image }} hreflangs={hreflangs} jsonLd={{ '@context': 'https://schema.org', '@type': 'AboutPage', name: title, description }} />
      <main className={styles["about-page"]}>
        <AboutHero />
        <CompanyOverview />
        <Timeline />
        <MissionVision />
        <CoreStrengths />
        <TrustIndicators />
        <StatsAchievements />
        <CallToAction />
      </main>
    </div>
  );
}