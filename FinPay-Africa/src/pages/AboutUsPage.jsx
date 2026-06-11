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

  return (
    <div>
      <HeadTitle title={title} />
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