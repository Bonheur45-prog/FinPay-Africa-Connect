# FinPay Africa Website - Comprehensive Codebase Analysis

## Executive Summary

FinPay Africa is a modern fintech marketing website built with React, Vite, and internationalization (i18n) support. The application is a content-rich site featuring:
- **6 main pages** with multiple sections each
- **5 product solutions** with detailed landing pages
- **Blog system** with multilingual content (6+ articles)
- **Contact management** with form handling
- **Interactive mapping** showing African country presence
- **Complete English & French translations** (i18n-next)

---

## 1. CONTENT TYPES MANAGED IN THE APPLICATION

### A. **Product Solutions (5 Core Offerings)**
1. **Cross-Border Payments / Instant Payments** (`cross-border` / `payments`)
   - Flagship payment transfer solution
   - Route: `/solutions/cross-border` or `/solutions/payments`
   - Features instant transfers across 54 African markets
   - Unique stats: < 60s, 150+ countries, 0.8% fees, $2M+ volume

2. **Diaspora Money Transfers** (`diaspora`)
   - Remittance solution for diaspora communities
   - Route: `/solutions/diaspora`
   - Features low-fee transfers from Europe, North America, Middle East
   - Stats: < 60s, 99.9% uptime, 24/7 support, Multi-currency

3. **Payment API & Infrastructure** (`api`)
   - Developer-focused API platform
   - Route: `/solutions/api`
   - Features: Unified REST API, PCI-DSS compliance, multiple payment rails
   - Stats: 99.99% uptime, < 50ms latency, 100+ integrations, 24/7 support

4. **Virtual & Physical Cards** (`cards`)
   - Card issuance solution
   - Route: `/solutions/cards`
   - Features: Branded cards, real-time controls, worldwide acceptance
   - Stats: < 30s issuance, 190+ countries, 0% decline rate, Real-time processing

5. **Identity & KYC Verification** (`kyc`)
   - Compliance and verification solution
   - Route: `/solutions/kyc`
   - Features: Automated KYC, AML screening, biometric verification
   - Stats: < 8s verification, 98.4% accuracy, 50+ document types, 22 countries

### B. **Pages (6 Main Pages)**

| Page | Route | Content Type | Key Sections |
|------|-------|--------------|--------------|
| **Home Page** | `/[lang]/` | Marketing Hub | Hero, Core Solutions, Trusted Partners, 3D Fintech Showcase, Blog Section, Africa Presence Map |
| **About Us** | `/[lang]/about` | Company Info | Hero, Company Overview, Timeline, Mission/Vision, Core Strengths, Trust Indicators, Stats/Achievements, CTA |
| **Solutions** | `/[lang]/solutions` | Solution Listing | Grid of 5 solutions with feature cards |
| **Solution Detail** | `/[lang]/solutions/:slug` | Dynamic Solution Page | Hero, Features, Stats, CTAs (generated from data files) |
| **Contact Us** | `/[lang]/contact-us` | User Engagement | Contact Hero, Contact Form, Contact Info/Team |
| **Partners** | `/[lang]/partners` | B2B Content | Partners Hero, Filterable Partner Grid, Become Partner CTA |
| **Investors** | `/[lang]/investors` | Investor Relations | Hero, Market Opportunity, Traction Stats, Why Invest, Investor CTA |
| **Blog Listing** | `/[lang]/blog` | Content Hub | Featured Article Card, Searchable Grid, Filtering, Pagination |
| **Blog Detail** | `/[lang]/blog/:slug` | Article Content | Full article with author info, metadata, content sections |

### C. **Content Components on Pages**

**Hero Sections**
- Rotating background image slideshows
- Badge/eyebrow text
- Headlines with emphasis
- Dual CTAs (primary + secondary)
- Accent color branding

**Feature Grids**
- Icons (from Lucide React library)
- Feature title + description pairs
- Icon types: code, lock, globe, chart, clock, shield, lightning, card, etc.

**Statistics/Metrics**
- Key performance metrics displayed as "value + label"
- Examples: "99.99% uptime", "< 50ms latency", "100+ integrations"
- Used in solution pages and investor page

**Testimonials/Case Studies**
- Blog author cards with avatar, name, role
- Featured article cards with category badges
- Related articles section

**Trust Indicators**
- Partner/bank logos (10+ financial institutions listed)
- Certificate/compliance badges
- Timeline showing company milestones
- Statistics showing market reach

**Maps & Visualizations**
- Interactive Africa map showing country presence
- 3D carousel showcase of fintech products
- Color-coded country status: presence (red), expansion (orange), inactive (dark red)
- 54 African countries mapped with metadata

---

## 2. CONTENT DATA STORAGE & STRUCTURE

### A. **Data File Organization**

```
src/data/
├── cards.js                    # Empty (content in solutions/)
├── countryData.js              # Africa map data (all 54 countries)
└── solutions/
    ├── index.js                # Exports all solutions
    ├── api.js                  # Payment API solution config
    ├── cards.js                # Virtual & Physical Cards config
    ├── crossBorder.js          # Cross-border payments config
    ├── diaspora.js             # Diaspora transfers config
    └── kyc.js                  # KYC verification config
```

### B. **Solution Data Structure**

Each solution file follows a standard schema:

```javascript
const solution = {
  namespace: "api",              // Used for i18n translation keys
  slug: "api",                   // URL slug
  meta: {
    title: "i18n_key",           // SEO title (translated)
    description: "i18n_key",     // SEO description (translated)
  },
  sections: [
    {
      type: "hero|features|stats|cta",  // Component type
      background: "particles|gradient", // Visual style
      data: {
        // Content specific to section type
        // Uses i18n keys for all text (e.g., "hero.headline")
        badge: "hero.badge",
        headline: "hero.headline",
        items: [
          {
            icon: "code|lock|globe|chart|etc",
            title: "features.items.0.title",
            body: "features.items.0.body"
          }
        ]
      }
    }
  ]
};
```

### C. **Africa Map Data**

**File**: `src/data/countryData.js`

**Structure**:
- `COLOR_PRESETS`: Defines colors (presence: red, expansion: orange, inactive: dark red)
- `AFRICA_NUMERIC_IDS`: Set of 54 ISO 3166-1 numeric IDs for all African countries
- `DEFAULT_COUNTRIES`: Array of country objects with:
  - `id`: 3-letter ISO code (e.g., 'RWA')
  - `numericId`: ISO numeric ID
  - `name`: Display name
  - `status`: 'presence' | 'expansion' | 'inactive'
  - `color`: Hex color override
  - `coordinates`: [longitude, latitude] for label placement
  - `labelOffset`: [dx, dy] for label positioning
  - `labelAnchor`: 'start' | 'middle' | 'end'
  - `showLabel`: Boolean to show/hide label
  - `metadata`: Company-specific info shown in modal

### D. **Blog Data Structure**

**File**: `src/features/blog/constants/blogData.js`

**MOCK_BLOG_POSTS Array** with structure:

```javascript
{
  id: 1,
  slug: "building-secure-fintech-platform",
  category: "security|product|engineering|growth|design|culture",
  image: "https://...",           // Featured image
  thumbnail: "https://...",       // Card thumbnail
  featured: true|false,
  readTime: 5,                    // Minutes
  publishedAt: "2025-06-12",
  author: {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://...",
    role: "Security Engineer"
  },
  title: {
    en: "English title",
    fr: "French title"
  },
  description: {
    en: "English description",
    fr: "French description"
  },
  content: {
    en: "Full markdown content...",
    fr: "Contenu markdown complet..."
  }
}
```

**CATEGORY_METADATA** defines styling per category:
- `product`, `engineering`, `growth`, `security`, `design`, `culture`
- Each has: `bg` (background color), `text` (text color)

### E. **Partners Data**

**File**: `src/pages/Partners/sections/PartnersGrid.jsx`

**PARTNERS Array** (minimal data):
```javascript
{
  id: 1,
  key: 'brightlink',
  category: 'Technology|Financial|Mobile Money|Commerce',
  logo: null  // Populated from i18n translations
}
```

**Partner Fields** (via i18n lookup):
- `name`
- `category`
- `partnershipType`
- `description`
- `since` (year)
- `region` (geographic region)

### F. **Company Data Sources**

- **About Page**: Text stored in i18n files, static components
- **Investors Page**: Stats and opportunity data hardcoded in components
- **Timeline**: Milestone data in component state
- **Team Cards**: Contact info in ContactInfo component
- **Trusted Partners**: Bank logos array in TrustedPartners.jsx (10 banks)

---

## 3. PAGES & THEIR CONTENT

### A. **Home Page** (`/[lang]/`)

**Composition**: 6 main sections
1. **Hero Section**
   - Rotating 4-image background carousel
   - Headline: "Move money faster across every corner of Africa"
   - Sub: "Secure, instant, accessible payment infrastructure"
   - Dual CTAs: "Explore Our Platform" + "Watch Demo"

2. **Core Solutions Section**
   - Grid of 5 solution cards
   - Each shows: Tag, Title, Description
   - Links to individual solution detail pages
   - Trust statement: "Trusted by businesses across 12+ countries"

3. **Trusted Partners Section**
   - Displays 10 bank/financial institution logos
   - Text: "Our Platform Trusted by Leading Financial Institutions"
   - CTA: Join the ranks

4. **FinTech Showcase Section** (3D Carousel)
   - Interactive 3D carousel with 5 rotating products:
     - Bank Card (gold accent)
     - POS Terminal (crimson accent)
     - Digital ID (red accent)
     - Mobile Banking (light accent)
     - Secure Document (green accent)
   - Each product shows annotations and features

5. **Blog Section**
   - Featured articles grid
   - Shows 6 blog cards
   - Displays: category badge, title, description, author, date, read time

6. **Africa Presence Section**
   - Interactive map showing 54 African countries
   - Color-coded by status (presence/expansion/inactive)
   - Click to view country metadata in modal

### B. **About Us Page** (`/[lang]/about`)

**Sections**:
1. **About Hero** - Dark crimson hero with headline
2. **Company Overview** - Text + visual card showing company mission
3. **Timeline** - Milestone progression (dates and descriptions)
4. **Mission & Vision** - Two-column layout with company values
5. **Core Strengths** - Icon grid (5+ key strengths)
6. **Trust Indicators** - Compliance badges, certifications
7. **Stats & Achievements** - Large metric displays (users, countries, volume)
8. **Call to Action** - Final CTA to explore solutions

### C. **Solutions Page** (`/[lang]/solutions`)

- Grid display of 5 solutions
- Each card shows:
  - Solution name
  - Description
  - Feature icon
  - "Learn More" link
  - Colored accent badge

### D. **Solution Detail Pages** (`/[lang]/solutions/:slug`)

**Dynamic rendering** using solution config files. Each page includes:

1. **Hero Section**
   - Badge (e.g., "Payment API")
   - Headline
   - Subtitle
   - Primary + Secondary CTAs
   - Accent color (unique per solution)
   - Particle background animation

2. **Features Section**
   - Eyebrow label
   - Headline
   - 6-item grid with icons and descriptions
   - Gradient background

3. **Stats Section**
   - 4 key metrics
   - Value + label format
   - Bold typography

4. **CTA Section**
   - Final call to action
   - Links to signup, docs, or contact

**Solution Slugs** (routes):
- `/solutions/cross-border` (or `/solutions/payments`)
- `/solutions/diaspora`
- `/solutions/api`
- `/solutions/cards`
- `/solutions/kyc`

### E. **Contact Us Page** (`/[lang]/contact-us`)

**Sections**:
1. **Contact Hero** - Headline: "Get In Touch", tagline about 24-hour response
2. **Contact Form** - Full-featured form with:
   - Background slideshow (5 African fintech images)
   - Subject tabs (General, Partnership, Investor)
   - Input fields: First Name, Last Name, Email, Phone, Organization, Message
   - Form validation + success state
   - Placeholder text changes per subject
3. **Contact Info** - Team cards with names, titles, direct contacts, office info

**Form Features**:
- Controlled form state (React hooks)
- Validation: Required fields, email format, org required for partnerships
- Error display per field
- Success message display
- Mock submission (1.6s delay) - needs backend integration

### F. **Partners Page** (`/[lang]/partners`)

**Sections**:
1. **Partners Hero** - Headline: "Strategic Partnerships Powering Growth"
2. **Partners Grid** - Filterable grid with:
   - 8 partner cards (minimal data, names from i18n)
   - Category filter buttons: All, Financial, Technology, Mobile Money, Commerce
   - Logo placeholders (gradient per category)
   - Partner initials
   - Descriptions and metadata from i18n
3. **Become Partner CTA** - Benefits list + form to join

### G. **Investors Page** (`/[lang]/investors`)

**Sections**:
1. **Investors Hero** - Headline emphasizing market opportunity
2. **Market Opportunity** - Problem/solution narrative, African market data
3. **Traction Stats** - Animated counters showing:
   - Active users
   - Countries served
   - Transaction volume
   - Revenue/GMV
4. **Why Invest** - 5 compelling reasons with icons
5. **Investor CTA** - Pitch deck download + "Schedule Call" button

### H. **Blog Listing Page** (`/[lang]/blog`)

**Features**:
- **Featured Card**: Large featured article card
- **Search Box**: Search articles by title/content
- **Category Filter**: Filter by category (Product, Engineering, Growth, Security, Design, Culture)
- **Sort Options**: Newest First, Oldest First, Most Read
- **Pagination**: Previous/Next with page indicators
- **Blog Grid**: Scrollable grid of article cards showing:
  - Thumbnail image
  - Category badge (color-coded)
  - Title
  - Description
  - Author avatar + name/role
  - Publication date
  - Reading time (in minutes)
  - "Read Article" link

**Translations**: All UI text is i18n-enabled for en/fr

### I. **Blog Detail Page** (`/[lang]/blog/:slug`)

**Content**:
- Full article content (markdown rendered as HTML)
- Author information (avatar, name, role)
- Published date, update date, reading time
- Share buttons
- Table of Contents (from markdown headings)
- Related articles (linked articles from same category)
- Comment section (placeholder)
- Download PDF + Print options
- Back to articles link

---

## 4. WEBSITE FEATURES & COMPONENTS

### A. **Visual Features**

| Feature | Implementation | Location |
|---------|-----------------|----------|
| **Rotating Image Carousel** | useEffect + useState with interval timer | Hero, ContactForm |
| **3D Product Carousel** | @react-three/fiber, Three.js, rotating geometry | FinTechShowCase |
| **Interactive Map** | TopoJSON data, D3.js, custom modals | AfricaMap, AfricaPresence |
| **Scroll Animations** | Intersection Observer, CSS modules | All sections with useScrollReveal hook |
| **Gradient Backgrounds** | CSS linear-gradient overlays | Solution pages, stats sections |
| **Frosted Glass Panels** | CSS backdrop-filter | ContactForm panel |
| **Particle Animation** | Canvas-based particles (likely custom or Lucide) | Solution hero backgrounds |
| **Icon Library** | Lucide React (code, lock, globe, chart, shield, etc.) | Throughout app |
| **Animated Counters** | GSAP or useEffect-based tween animations | Investor stats |
| **Slide Transitions** | CSS fade + transform animations | Hero, carousel, contact form |

### B. **UI Components & Sections**

**Hero Components**:
- Hero with image carousel
- Hero with particles background
- Hero with gradient background
- Solution hero with accent colors

**Content Grids**:
- Feature grids (2-3 columns, icon + title + body)
- Solution cards grid (5 items)
- Blog article grid (with pagination)
- Partner cards grid (with filtering)

**Statistics Displays**:
- Stats band (4 columns of value + label)
- Animated counter stats (investors page)
- Timeline with milestones

**Forms**:
- Contact form with subject switching
- Form validation with error messages
- Success state after submission

**Navigation**:
- Horizontal section navigation
- Tab-based subject selection
- Filter button groups
- Pagination controls

**Cards**:
- Feature cards (icon + title + description)
- Blog cards (image + title + metadata)
- Partner cards (logo + name + details)
- Solution cards (title + description + cta)
- Author cards (avatar + name + role)
- Bank/partner logo cards

### C. **Interactive Elements**

1. **Buttons & CTAs**
   - Primary buttons (crimson/red)
   - Secondary buttons (outlined)
   - Text links with arrow icons
   - Icon buttons (hamburger, language selector)

2. **Form Elements**
   - Text inputs with labels
   - Error state styling
   - Validation messages
   - Tab buttons (subject selection)
   - Placeholder text

3. **Modals**
   - Country metadata modal (on map click)
   - Language selection modal
   - Potentially: Schedule call modal

4. **Navigation**
   - Mobile menu (hamburger)
   - Language switcher
   - Main navigation (Home, Solutions, About, Blog, Contact, Partners, Investors)
   - Breadcrumb/back links

---

## 5. LOCALIZATION & I18N SETUP

### A. **Languages Supported**

1. **English** (en)
2. **French** (fr)

### B. **I18n Configuration**

**Setup File**: `src/i18n.js`

**Technology**: 
- `i18next` - Core i18n library
- `react-i18next` - React bindings
- `i18next-browser-languagedetector` - Auto-detect user language

**Language Detection**: Browser language preference detection enabled

### C. **Translation File Structure**

**Location**: `src/locales/{en|fr}/`

**Files** (12 namespace files):

```
common.json         # Global UI strings (buttons, common labels)
home.json          # Home page content
about.json         # About page content
solutions.json     # Solutions detail pages (api, cards, crossBorder, diaspora, kyc)
contact.json       # Contact form + info
partners.json      # Partners page (grid, hero, CTA, 8 partners data)
investors.json     # Investors page
crossBorder.json   # Cross-border solution strings
diaspora.json      # Diaspora solution strings
api.json           # API solution strings
cards.json         # Cards solution strings
kyc.json           # KYC solution strings
```

**Plus**: `src/features/blog/constants/translations.js`
- Blog-specific i18n strings (categories, UI text, pagination labels)

### D. **Usage Pattern**

In components:
```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation('namespace');
  
  // String lookup
  return <h1>{t('key.path')}</h1>
  
  // Object lookup
  const items = t('features', { returnObjects: true });
  
  // Current language
  console.log(i18n.language); // 'en' or 'fr'
}
```

### E. **Routing with Language**

**URL Structure**: `/:lang/[route]`

Default routing:
- `/` → redirects to `/fr` (default language)
- `/en` → English home
- `/fr` → French home
- `/en/solutions` → English solutions page
- `/fr/blog/article-slug` → French blog detail

**Component**: `LangWrapper.jsx` handles language context

### F. **Translation Key Inventory**

**Namespaces & Keys** (sample):
```
home.hello.headline
home.solutions.*.tag, .title, .desc
home.core-solutions-heading.*
about.company.label, .title, .description.*
about.timeline.*.year, .title, .description
contact.form.subjects, .labels.*, .validation.*
partners.hero.*, partners.grid.*, partners.benefits.*
partners.[8 partner keys].name, .category, .description
investors.hero.*, .market.*, .stats.*
solutions.{namespace}.hero.*, .features.*, .stats.*
blogs.listing.*, blogs.detail.*, blogs.categories.*
```

---

## 6. BACKEND INTEGRATION & API CALLS

### A. **Current API Integration Status**

**Finding**: ❌ **NO ACTIVE API INTEGRATION**

All external data is currently:
- Static/mock data in files
- Placeholder comments in code
- Ready for backend integration (not yet implemented)

### B. **API Integration Points Ready for Implementation**

#### 1. **Contact Form Submission**

**Current State**: 
- File: `src/pages/ContactUs/sections/ContactForm.jsx`
- Validation: ✅ Working (client-side)
- Submission: 🚫 Mock only (1.6s timeout)

**Code Placeholder**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  // ── Replace this block with your real API call / form service ──
  // e.g. fetch('/api/contact', { method: 'POST', body: JSON.stringify({subject, ...fields}) })
  await new Promise((res) => setTimeout(res, 1600)); // mock delay
  // ───────────────────────────────────────────────────────────────
  setSubmitted(true);
};
```

**Expected Payload**:
```json
{
  "subject": "general|partnership|investor",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string (optional)",
  "organization": "string (required for partnership)",
  "message": "string"
}
```

**Expected Response**: 201 Created or 200 OK

#### 2. **Blog Posts / Articles**

**Current State**: 
- Mock data in `src/features/blog/constants/blogData.js`
- Comment in file: "Replace with API calls in production"

**Data Ready for API**:
```javascript
// Fetch endpoint suggestion:
GET /api/blog/posts?language=en&category=security&sort=newest&page=1
GET /api/blog/posts/{slug}?language=en
```

**Payload Structure**: MOCK_BLOG_POSTS array (see section 2.D)

#### 3. **Partners Grid Data**

**Current State**: 
- Minimal data in component, full data in i18n files
- No API integration planned currently
- Logo URLs hardcoded as `null` with placeholder gradients

**Potential API**:
```javascript
GET /api/partners?category=technology
GET /api/partners/{key}
```

#### 4. **Solutions Data**

**Current State**: 
- All data in `src/data/solutions/*.js` files
- No API integration needed (static marketing content)
- Data is used for rendering via componentMap

#### 5. **Country/Presence Data**

**Current State**: 
- Static data in `src/data/countryData.js`
- All 54 countries hardcoded with coordinates
- No API integration needed (geographical reference data)

### C. **External Dependencies Used**

From package.json dependencies:
- `d3` (v7.9.0) - Used for data visualization (potentially maps)
- `@react-three/fiber` & `@react-three/drei` - 3D rendering
- `three` (v0.183.2) - 3D graphics library
- `topojson-client` (v3.1.0) - TopoJSON data format (used in maps)
- `lucide-react` - Icon library
- `i18next` + `react-i18next` - i18n
- `react-router` (v7.14.0) - Routing
- No HTTP client (axios/fetch) pre-configured

**Missing**: No API client library installed. When integrating:
- Use native `fetch()` or
- Install `axios` for HTTP requests

### D. **Third-Party Images & Assets**

**External Image URLs** (Unsplash, Picsum, NSI Monetique):
- Contact form slideshow: 5 Unsplash images
- Hero carousel: 4 Unsplash + FT CDN images
- 3D Showcase: 5 Picsum placeholder images
- Partner bank logos: 10 NSI Monetique hosted images
- Blog author avatars: Unsplash images
- Blog article images: Unsplash images

These URLs should be replaced with hosted assets when deploying.

---

## 7. DATA STRUCTURES & CONTENT SCHEMAS

### A. **Solution Schema**

```javascript
{
  namespace: string,           // i18n namespace key
  slug: string,               // URL slug
  meta: {
    title: string,            // i18n key
    description: string       // i18n key
  },
  sections: [
    {
      type: 'hero'|'features'|'stats'|'cta',
      background: 'particles'|'gradient',
      data: {
        // Type-specific fields
        // All text uses i18n keys
      }
    }
  ]
}
```

### B. **Hero Section Schema**

```javascript
{
  type: 'hero',
  background: 'particles',
  data: {
    badge: string,                    // i18n key
    headline: string,                 // i18n key
    sub: string,                      // i18n key
    primaryCta: { label: string, href: string },
    secondaryCta: { label: string, href: string },
    accent: string                    // Hex color for accent elements
  }
}
```

### C. **Feature Grid Section Schema**

```javascript
{
  type: 'features',
  background: 'gradient',
  data: {
    eyebrow: string,                  // i18n key
    headline: string,                 // i18n key
    items: [
      {
        icon: string,                 // Lucide icon name
        title: string,                // i18n key
        body: string                  // i18n key
      }
    ]
  }
}
```

### C. **Stats Band Schema**

```javascript
{
  type: 'stats',
  background: 'gradient',
  data: {
    items: [
      {
        value: string,                // e.g., "99.99%"
        label: string                 // i18n key
      }
    ]
  }
}
```

### D. **Blog Post Schema**

```javascript
{
  id: number,
  slug: string,
  category: string,                   // product|engineering|growth|security|design|culture
  image: string,                      // Full featured image URL
  thumbnail: string,                  // Card image URL
  featured: boolean,
  readTime: number,                   // Minutes
  publishedAt: string,                // YYYY-MM-DD
  updatedAt: string,                  // YYYY-MM-DD
  author: {
    id: number,
    name: string,
    avatar: string,                   // Avatar image URL
    role: string                      // Job title
  },
  title: { en: string, fr: string },
  description: { en: string, fr: string },
  content: { en: string, fr: string } // Markdown or HTML
}
```

### E. **Contact Form Schema**

```javascript
{
  subject: 'general'|'partnership'|'investor',
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  organization: string,
  message: string
}
```

### F. **Partner Schema**

```javascript
{
  id: number,
  key: string,                        // Used for i18n lookup
  category: string,                   // Technology|Financial|Mobile Money|Commerce
  logo: string|null                   // Logo image URL
  // From i18n translation:
  name: string,
  partnershipType: string,
  description: string,
  since: number,                      // Year
  region: string
}
```

### G. **Country (Map) Schema**

```javascript
{
  id: string,                         // 3-letter ISO code (e.g., 'RWA')
  numericId: number,                  // ISO 3166-1 numeric
  name: string,
  status: 'presence'|'expansion'|'inactive',
  color: string,                      // Hex color
  coordinates: [longitude, latitude],
  labelOffset: [dx, dy],
  labelAnchor: 'start'|'middle'|'end',
  showLabel: boolean,
  metadata: {
    // Company-specific info for modal
  }
}
```

---

## 8. CONTENT MANAGEMENT FLOWS

### A. **Static Content Flow**

1. **Data Storage**: `/src/data/` and `/src/locales/`
2. **Component Import**: Components import data files or use i18n
3. **Translation Lookup**: i18next translates keys at render time
4. **Display**: Rendered as JSX with styling

**Example Flow**:
```
solutions/api.js 
→ SolutionPage.jsx (imports, maps sections)
→ FeatureGrid component (renders features)
→ i18next.t('api.features.items.0.title')
→ "Unified payment endpoints" (en) / "Points de terminaison de paiement unifiés" (fr)
```

### B. **Blog Content Flow** (Current Mock)

1. **Data Storage**: `src/features/blog/constants/blogData.js` (MOCK_BLOG_POSTS)
2. **Blog Listing**: `BlogListingPage.jsx` queries and filters posts
3. **Blog Detail**: `BlogDetailPage.jsx` renders full article
4. **Routing**: `/:lang/blog/:slug` → matches post by slug

**Needed for Production**:
```
API /api/blog/posts 
→ BlogListingPage hooks
→ Fetch and filter
→ Display grid with pagination
```

### C. **Contact Form Flow**

1. **Form Render**: ContactForm component with validation
2. **User Input**: Form state managed in React hooks
3. **Validation**: Client-side validation before submit
4. **Submission**: 
   - Current: Mock 1.6s delay
   - Needed: POST to `/api/contact` endpoint
5. **Success State**: Show success message

### D. **Localization Flow**

1. **Language Detection**: i18next-browser-languagedetector
2. **URL Parameter**: `/:lang` in route
3. **i18n Context**: useTranslation hook in components
4. **Key Lookup**: `t('namespace.key')` resolves from translation files
5. **Rendering**: Translated text displayed

---

## 9. INTEGRATION POINTS REQUIRING BACKEND SUPPORT

### Priority 1: **Critical for Operation**

1. **Contact Form Endpoint**
   - **Route**: POST `/api/contact` (or `/api/contact-us`)
   - **Purpose**: Submit inquiry forms
   - **Field Mapping**: subject, firstName, lastName, email, phone, organization, message
   - **Response**: Success message, confirmation email trigger
   - **Current**: Mock placeholder ready

2. **Blog Content API**
   - **Routes**:
     - GET `/api/blog/posts` - List with filters
     - GET `/api/blog/posts/:slug` - Single article
   - **Purpose**: Fetch blog articles with metadata
   - **Field Mapping**: Matches MOCK_BLOG_POSTS structure
   - **Response**: Article data with translated content (en/fr)
   - **Current**: Mock data in file, ready for replacement

### Priority 2: **Content Management**

3. **Partners Management**
   - **Route**: GET `/api/partners` (optional, can stay static)
   - **Purpose**: Fetch partner data
   - **Fields**: name, category, description, logo, region, since
   - **Current**: Hardcoded in i18n, works as-is

4. **Solutions Data API** (Optional)
   - **Route**: GET `/api/solutions/:slug`
   - **Purpose**: Fetch solution content dynamically
   - **Current**: Static files, no urgent need for API

### Priority 3: **Additional Services**

5. **Media/Asset CDN**
   - **Purpose**: Host all images, replace Unsplash/Picsum URLs
   - **Current**: External URLs hardcoded in components

6. **Email Notifications**
   - **Purpose**: Send confirmation emails on form submit
   - **Integrated with**: Contact form API

7. **Analytics** (Optional)
   - **Purpose**: Track user behavior
   - **Can be**: Third-party (GA4, Mixpanel, etc.)

---

## 10. MULTI-LANGUAGE REQUIREMENTS SUMMARY

### A. **Language Support**

✅ **Fully Bilingual**:
- English (en)
- French (fr)

### B. **Translation Scope**

**Complete Coverage**:
- ✅ All UI labels and buttons
- ✅ Page content (headings, descriptions)
- ✅ Solution pages (6 solutions × multiple sections)
- ✅ Blog metadata (categories, controls, placeholders)
- ✅ Form labels and validation messages
- ✅ Partner data (names, descriptions)
- ✅ Investor/About page content

**File Count**: 12 namespace files + 1 constants file = 13 translation sources

### C. **Language-Specific Behavior**

- **Date Formatting**: `toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR')`
- **Reading Time**: Uses language-specific formatting
- **Content Structure**: Multilingual object structure (title.en, title.fr)

### D. **URL-Based Language Selection**

- Router enforces `/:lang` in URL
- Supports lang parameter throughout routing
- Default to `/fr` if not specified

### E. **Translation File Maintenance Notes**

**Key Naming Convention**:
```
namespace.section.subsection.key

Examples:
- home.hello.headline
- solutions.api.meta.title
- contact.form.labels.firstName
- blogs.listing.title
```

**Bilingual Structure** in files:
```json
{
  "en": { /* English content */ },
  "fr": { /* French content */ }
}
```

Or inline:
```json
{
  "title": { "en": "...", "fr": "..." }
}
```

---

## SUMMARY TABLE: CONTENT INVENTORY

| Content Type | Count | Storage | Status | Backend Needed |
|--------------|-------|---------|--------|----------------|
| Pages | 8 | Components + i18n | ✅ Complete | No |
| Solutions | 5 | `/src/data/solutions/` | ✅ Complete | Optional |
| Solution Sections | 18+ | Solution config files | ✅ Complete | No |
| Blog Articles | 6+ | Mock data file | 🚫 Mock | Yes |
| Blog Categories | 6 | Constants + i18n | ✅ Complete | No |
| Partners | 8 | i18n translations | ✅ Complete | Optional |
| Partner Categories | 5 | Constants + i18n | ✅ Complete | No |
| Countries (Map) | 54 | `countryData.js` | ✅ Complete | No |
| Banks/Trusted Partners | 10 | Component array | ✅ Complete | No |
| Hero Sections | 8+ | Components | ✅ Complete | No |
| Feature Grids | 10+ | Solution configs | ✅ Complete | No |
| Stats Displays | 8+ | Solution configs | ✅ Complete | No |
| Forms | 1 | Component (Contact) | ✅ Built, 🚫 Backend | Yes |
| **Namespaces (i18n)** | **13** | `/src/locales/` | ✅ Complete | No |
| **Languages** | **2** | en + fr | ✅ Complete | No |

---

## ARCHITECTURE NOTES

### Stack Summary
- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.4
- **Routing**: React Router 7.14.0
- **Internationalization**: i18next 26.0.5 + react-i18next 17.0.3
- **3D Graphics**: Three.js + @react-three/fiber
- **Data Viz**: D3.js 7.9.0, TopoJSON
- **Icons**: Lucide React 1.8.0
- **Styling**: CSS Modules (component-scoped)
- **Styling Preprocessor**: PostCSS + Autoprefixer

### Key Design Patterns
1. **Component-Driven**: Each page is a composition of reusable sections
2. **Data-Driven Content**: Solutions use config files + i18n
3. **Mock Data Ready**: All APIs have placeholder comments for integration
4. **CSS Modules Isolation**: No global style bleeding
5. **Scroll Animations**: Intersection Observer for on-scroll effects
6. **Responsive Design**: Mobile-first CSS with breakpoints

---

## RECOMMENDATIONS FOR BACKEND INTEGRATION

1. **Immediate** (Week 1-2):
   - Create `/api/contact` endpoint for form submissions
   - Set up email notification service

2. **Short-term** (Week 2-4):
   - Create `/api/blog/posts` endpoint for articles
   - Migrate MOCK_BLOG_POSTS from file to database
   - Add CMS or admin interface for blog management

3. **Medium-term** (Month 2):
   - Optional: Migrate solutions data to API
   - Optional: Create admin panel for partners, investors data
   - Add analytics tracking

4. **Long-term** (Month 3+):
   - User authentication system (for potential dashboard)
   - Payment integration endpoints
   - Admin content management system

---

**Analysis Complete** | Generated: May 2026
