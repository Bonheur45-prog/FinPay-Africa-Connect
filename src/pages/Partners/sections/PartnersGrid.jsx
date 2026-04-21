/**
 * FinPay Africa — Partners Grid Section
 * Filterable grid of partner cards with logo placeholder, category, and description.
 */

import React, { useState } from 'react';
import { Globe, Landmark, Laptop, Smartphone, ShoppingCart } from 'lucide-react';
import styles from './PartnersGrid.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

/* ─── Partner data ─── */
/* Replace logo: null with an actual image path or URL when assets are available */
const PARTNERS = [
  {
    id: 1,
    name: 'BrightLink Technologies',
    category: 'Technology',
    logo: null, // e.g. import logo from './assets/brightlink-logo.png'
    partnershipType: 'Card Infrastructure & API',
    description:
      'BrightLink powers the card issuance infrastructure and payment APIs that underpin the Connect platform, enabling fast, secure transaction processing at scale across our network.',
    since: '2022',
    region: 'Europe & Africa',
  },
  {
    id: 2,
    name: 'NSI-Monétique',
    category: 'Financial',
    logo: null,
    partnershipType: 'Banking & Monetic Solutions',
    description:
      'Our founding financial partner, providing the regulatory framework, banking expertise, and monetic infrastructure that gives FinPay Africa its institutional foundation and credibility.',
    since: '2021',
    region: 'Belgium / Africa',
  },
  {
    id: 3,
    name: 'Pan-African Mobile Network',
    category: 'Mobile Money',
    logo: null,
    partnershipType: 'Mobile Wallet Integration',
    description:
      'Connecting the FinPay platform to mobile wallet ecosystems across Sub-Saharan Africa to ensure last-mile delivery and true financial inclusion for the unbanked population.',
    since: '2023',
    region: 'Sub-Saharan Africa',
  },
  {
    id: 4,
    name: 'African Merchant Alliance',
    category: 'Commerce',
    logo: null,
    partnershipType: 'Merchant Acceptance Network',
    description:
      'A coalition of merchants and retailers who accept FinPay cards and payment terminals, expanding our on-the-ground footprint across key urban markets throughout Africa.',
    since: '2023',
    region: 'West & Central Africa',
  },
  {
    id: 5,
    name: 'EuroConnect Financial',
    category: 'Financial',
    logo: null,
    partnershipType: 'European Diaspora Banking',
    description:
      'Enabling European-based diaspora communities to send money home seamlessly through compliant, competitively priced corridors that meet EU financial regulations.',
    since: '2022',
    region: 'Europe',
  },
  {
    id: 6,
    name: 'SecurePay Technologies',
    category: 'Technology',
    logo: null,
    partnershipType: 'Security & Compliance',
    description:
      'Providing enterprise-grade encryption, real-time fraud detection, and compliance tooling so every FinPay transaction meets the highest international security standards.',
    since: '2023',
    region: 'Global',
  },
  {
    id: 7,
    name: 'Diaspora Connect Europe',
    category: 'Commerce',
    logo: null,
    partnershipType: 'Community & Distribution',
    description:
      'A community-driven distribution network connecting FinPay services to the African diaspora across France, Belgium, and the UK through trusted community touchpoints.',
    since: '2022',
    region: 'France, Belgium, UK',
  },
  {
    id: 8,
    name: 'AfriMobile Solutions',
    category: 'Mobile Money',
    logo: null,
    partnershipType: 'Mobile Banking Infrastructure',
    description:
      'A specialist in USSD and mobile banking technology, allowing FinPay to reach customers even in regions with limited smartphone penetration.',
    since: '2023',
    region: 'East & Central Africa',
  },
];

const CATEGORIES = ['All', 'Financial', 'Technology', 'Mobile Money', 'Commerce'];

/* Category icon map using Lucide React */
const CATEGORY_ICONS = {
  Financial:    <Landmark size={16} strokeWidth={2} />,
  Technology:   <Laptop  size={16} strokeWidth={2} />,
  'Mobile Money': <Smartphone size={16} strokeWidth={2} />,
  Commerce:     <ShoppingCart size={16} strokeWidth={2} />,
};

/* Initials for logo placeholder */
function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/* Logo placeholder gradient per category */
const PLACEHOLDER_GRADIENTS = {
  Financial:    'linear-gradient(135deg, #7a0e0e 0%, #e8760a 100%)',
  Technology:   'linear-gradient(135deg, #1a2e5a 0%, #3a6bba 100%)',
  'Mobile Money': 'linear-gradient(135deg, #1a5a2e 0%, #3aba6b 100%)',
  Commerce:     'linear-gradient(135deg, #5a3a1a 0%, #e8a030 100%)',
};

function PartnerCard({ partner, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <article
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      {/* Logo area */}
      <div className={styles.cardTop}>
        <div
          className={styles.logoBox}
          style={{ background: PLACEHOLDER_GRADIENTS[partner.category] }}
        >
          {partner.logo ? (
            <img src={partner.logo} alt={`${partner.name} logo`} className={styles.logoImg} />
          ) : (
            <span className={styles.logoInitials}>{getInitials(partner.name)}</span>
          )}
        </div>

        <div className={styles.cardMeta}>
          <span className={`${styles.categoryTag} ${styles[`cat${partner.category.replace(/\s/g, '')}`]}`}>
            <span className={styles.categoryIconWrap}>{CATEGORY_ICONS[partner.category]}</span> {partner.category}
          </span>
          <span className={styles.sinceTag}>Since {partner.since}</span>
        </div>
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{partner.name}</h3>
        <p className={styles.cardPartnershipType}>{partner.partnershipType}</p>
        <p className={styles.cardDescription}>{partner.description}</p>
      </div>

      {/* Card footer */}
      <div className={styles.cardFooter}>
        <span className={styles.regionTag}>
          <Globe size={12} strokeWidth={2} aria-hidden="true" />
          {partner.region}
        </span>
      </div>

      {/* Hover accent bar */}
      <div className={styles.cardAccentBar} aria-hidden="true" />
    </article>
  );
}

export default function PartnersGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  const filtered = activeCategory === 'All'
    ? PARTNERS
    : PARTNERS.filter((p) => p.category === activeCategory);

  return (
    <section className={styles.section}>
      {/* Section header */}
      <div
        ref={headerRef}
        className={`${styles.header} ${headerVisible ? styles.headerVisible : ''}`}
      >
        <div className={styles.headerEyebrow}>Who We Work With</div>
        <h2 className={styles.headerTitle}>Our Partner Network</h2>
        <p className={styles.headerSubtitle}>
          A diverse ecosystem of financial institutions, technology providers, mobile
          operators, and merchants — united by a shared mission to transform African payments.
        </p>
      </div>

      {/* Category filter */}
      <div className={styles.filterBar} role="tablist" aria-label="Filter partners by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
          >
            {cat !== 'All' && <span aria-hidden="true" className={styles.filterIconWrap}>{CATEGORY_ICONS[cat]}</span>}
            <span style={{marginLeft: cat === 'All' ? 0 : '8px'}}>{cat}</span>
          </button>
        ))}
      </div>

      {/* Partners grid */}
      <div className={styles.grid}>
        {filtered.map((partner, i) => (
          <PartnerCard key={partner.id} partner={partner} index={i} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className={styles.emptyState}>No partners found in this category yet.</p>
      )}
    </section>
  );
}
