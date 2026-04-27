/**
 * FinPay Africa — Partners Grid Section
 * Filterable grid of partner cards with logo placeholder, category, and description.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Landmark, Laptop, Smartphone, ShoppingCart } from 'lucide-react';
import styles from './PartnersGrid.module.css';
import { useScrollReveal } from '../../../components/shared/useScrollReveal';

/* ─── Partner data ─── */
/* Replace logo: null with an actual image path or URL when assets are available */
const PARTNERS = [
  {
    id: 1,
    key: 'brightlink',
    category: 'Technology',
    logo: null,
  },
  {
    id: 2,
    key: 'nsi',
    category: 'Financial',
    logo: null,
  },
  {
    id: 3,
    key: 'panafricanmobile',
    category: 'Mobile Money',
    logo: null,
  },
  {
    id: 4,
    key: 'africanmerchant',
    category: 'Commerce',
    logo: null,
  },
  {
    id: 5,
    key: 'euroconnect',
    category: 'Financial',
    logo: null,
  },
  {
    id: 6,
    key: 'securepay',
    category: 'Technology',
    logo: null,
  },
  {
    id: 7,
    key: 'diasporaconnect',
    category: 'Commerce',
    logo: null,
  },
  {
    id: 8,
    key: 'afrimobile',
    category: 'Mobile Money',
    logo: null,
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
  const { t } = useTranslation('partners');

  // Get translated partner data
  const partnerData = t(`partners.${partner.key}`, { returnObjects: true });
  const name = partnerData?.name || partner.key;
  const category = partnerData?.category || partner.category;
  const partnershipType = partnerData?.partnershipType || '';
  const description = partnerData?.description || '';
  const since = partnerData?.since || '';
  const region = partnerData?.region || '';

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
            <img src={partner.logo} alt={`${name} logo`} className={styles.logoImg} />
          ) : (
            <span className={styles.logoInitials}>{getInitials(name)}</span>
          )}
        </div>

        <div className={styles.cardMeta}>
          <span className={`${styles.categoryTag} ${styles[`cat${partner.category.replace(/\s/g, '')}`]}`}>
            <span className={styles.categoryIconWrap}>{CATEGORY_ICONS[partner.category]}</span> {category}
          </span>
          <span className={styles.sinceTag}>Since {since}</span>
        </div>
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{name}</h3>
        <p className={styles.cardPartnershipType}>{partnershipType}</p>
        <p className={styles.cardDescription}>{description}</p>
      </div>

      {/* Card footer */}
      <div className={styles.cardFooter}>
        <span className={styles.regionTag}>
          <Globe size={12} strokeWidth={2} aria-hidden="true" />
          {region}
        </span>
      </div>

      {/* Hover accent bar */}
      <div className={styles.cardAccentBar} aria-hidden="true" />
    </article>
  );
}

export default function PartnersGrid() {
  const { t } = useTranslation('partners');
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
        <div className={styles.headerEyebrow}>{t('grid.header.eyebrow')}</div>
        <h2 className={styles.headerTitle}>{t('grid.header.title')}</h2>
        <p className={styles.headerSubtitle}>
          {t('grid.header.subtitle')}
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
            <span style={{marginLeft: cat === 'All' ? 0 : '8px'}}>{t(`categories.${cat.replace(/\s/g, '_').toLowerCase()}`)}</span>
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
        <p className={styles.emptyState}>{t('grid.emptyState')}</p>
      )}
    </section>
  );
}
