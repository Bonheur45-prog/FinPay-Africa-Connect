import React from 'react';
import { Hero } from '../components/HomePageCompts/Hero'
import { CoreSolutions } from '../components/HomePageCompts/CoreSolutions';
import { FintechShowcase } from '../components/HomePageCompts/FinTechShowCase';
import { TrustedPartners } from '../components/HomePageCompts/TrustedPartners';
import BlogSection from '../components/HomePageCompts/BlogsSection';
import AfricaPresenceSection from '../components/HomePageCompts/AfricaPresence';

export function HomePage() {
  return (
    <div>
        <Hero />
        <CoreSolutions />
        <TrustedPartners />
        <FintechShowcase />
        <BlogSection />
        <AfricaPresenceSection />
    </div>
  )
}