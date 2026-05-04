/**
 * Blog Data Structure & Constants
 * This file defines the data models and mock data for the blog module
 * Ready for backend API integration
 */

export const BLOG_CATEGORIES = {
  PRODUCT: "product",
  ENGINEERING: "engineering",
  GROWTH: "growth",
  SECURITY: "security",
  DESIGN: "design",
  CULTURE: "culture",
};

export const CATEGORY_METADATA = {
  product: {
    bg: "#8C1A13",
    text: "#fff",
    label: "latest-insight.categories.product",
  },
  engineering: {
    bg: "#0f172a",
    text: "#fff",
    label: "latest-insight.categories.engineering",
  },
  growth: {
    bg: "#065f46",
    text: "#fff",
    label: "latest-insight.categories.growth",
  },
  security: {
    bg: "#7c2d12",
    text: "#fff",
    label: "latest-insight.categories.security",
  },
  design: {
    bg: "#4c1d95",
    text: "#fff",
    label: "latest-insight.categories.design",
  },
  culture: {
    bg: "#1e3a5f",
    text: "#fff",
    label: "latest-insight.categories.culture",
  },
};

// Mock blog posts - Replace with API calls in production
export const MOCK_BLOG_POSTS = [
  {
    id: 1,
    slug: "building-secure-fintech-platform",
    category: "security",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    featured: true,
    readTime: 5,
    publishedAt: "2025-06-12",
    author: {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      role: "Security Engineer",
    },
    title: {
      en: "Building Secure Fintech Platforms: Best Practices",
      fr: "Construire des plateformes Fintech sécurisées : meilleures pratiques",
    },
    description: {
      en: "Learn the essential security protocols and best practices for building robust fintech platforms that protect user data and prevent fraud.",
      fr: "Apprenez les protocoles de sécurité essentiels et les meilleures pratiques pour construire des plateformes fintech robustes.",
    },
    content: {
      en: `# Building Secure Fintech Platforms: Best Practices

Security is the foundation of any successful fintech platform. In this comprehensive guide, we explore the essential protocols, encryption standards, and architectural patterns that protect user data and prevent fraud.

## Understanding the Threat Landscape

The financial services industry faces unprecedented security challenges. From sophisticated phishing attacks to zero-day vulnerabilities, your platform must be prepared for multi-layered threats.

### Key Threats:
- Account takeover attacks
- Payment fraud
- Data breaches
- DDoS attacks
- Regulatory compliance violations

## Security Fundamentals

### 1. End-to-End Encryption
All sensitive data must be encrypted both in transit and at rest. We recommend:
- TLS 1.3 for transport security
- AES-256 for data at rest
- HSM (Hardware Security Module) for key management

### 2. Authentication & Authorization
Implement multi-factor authentication (MFA) as a baseline requirement. Consider:
- FIDO2/WebAuthn for passwordless authentication
- OAuth 2.0 for third-party integrations
- Role-based access control (RBAC)

### 3. Compliance Standards
Ensure compliance with:
- PCI DSS (Payment Card Industry Data Security Standard)
- GDPR (General Data Protection Regulation)
- SOC 2 Type II certification
- Local regulatory requirements

## Implementation Strategy

Building a secure platform is an ongoing process. Start with the fundamentals and progressively enhance your security posture through regular audits, penetration testing, and team training.

Remember: Security is not a feature, it's a requirement.`,
      fr: `# Construire des plateformes Fintech sécurisées : meilleures pratiques

La sécurité est le fondement de toute plateforme fintech réussie. Dans ce guide complet, nous explorons les protocoles essentiels, les normes de chiffrement et les modèles architecturaux qui protègent les données utilisateur et préviennent la fraude.

## Comprendre le paysage des menaces

L'industrie des services financiers fait face à des défis de sécurité sans précédent. De plus en plus d'attaques de phishing sophistiquées aux vulnérabilités zero-day, votre plateforme doit être préparée aux menaces multicouches.

### Menaces clés :
- Attaques de prise de contrôle de compte
- Fraude aux paiements
- Violations de données
- Attaques DDoS
- Violations de conformité réglementaire

## Principes fondamentaux de la sécurité

### 1. Chiffrement de bout en bout
Toutes les données sensibles doivent être chiffrées en transit et au repos. Nous recommandons :
- TLS 1.3 pour la sécurité du transport
- AES-256 pour les données au repos
- HSM (Hardware Security Module) pour la gestion des clés

### 2. Authentification et autorisation
Implémentez l'authentification multifacteur (MFA) comme exigence de base. Considérez :
- FIDO2/WebAuthn pour l'authentification sans mot de passe
- OAuth 2.0 pour les intégrations tierces
- Contrôle d'accès basé sur les rôles (RBAC)

### 3. Normes de conformité
Assurez-conformité avec :
- PCI DSS (Norme de sécurité des données du secteur des cartes de paiement)
- RGPD (Règlement général sur la protection des données)
- Certification SOC 2 Type II
- Exigences réglementaires locales

## Stratégie de mise en œuvre

Construire une plateforme sécurisée est un processus continu. Commencez par les principes fondamentaux et améliorez progressivement votre posture de sécurité par le biais d'audits réguliers, de tests de pénétration et de formations d'équipe.

N'oubliez pas : la sécurité n'est pas une fonctionnalité, c'est une exigence.`,
    },
    mediaGallery: [
      {
        id: "m1",
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        caption: {
          en: "Security encryption illustration",
          fr: "Illustration du chiffrement de sécurité",
        },
      },
      {
        id: "m2",
        type: "image",
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
        caption: {
          en: "Data protection concept",
          fr: "Concept de protection des données",
        },
      },
    ],
    tags: ["security", "encryption", "compliance", "fintech"],
    comments: [
      {
        id: 1,
        authorName: "John Doe",
        authorEmail: "john@example.com",
        content: {
          en: "Great insights on security practices!",
          fr: "Excellentes informations sur les pratiques de sécurité !",
        },
        createdAt: "2025-06-13",
        replies: [],
      },
    ],
    relatedPosts: [2, 4],
  },
  {
    id: 2,
    slug: "fintech-payment-innovation",
    category: "engineering",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    featured: false,
    readTime: 8,
    publishedAt: "2025-05-28",
    author: {
      id: 2,
      name: "Alex Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      role: "Backend Engineer",
    },
    title: {
      en: "Payment Processing Architecture at Scale",
      fr: "Architecture de traitement des paiements à l'échelle",
    },
    description: {
      en: "Deep dive into building scalable payment processing systems that handle millions of transactions reliably.",
      fr: "Analyse approfondie de la construction de systèmes de traitement des paiements évolutifs.",
    },
    content: {
      en: `# Payment Processing Architecture at Scale

Building a payment processing system that handles millions of transactions requires careful architectural planning, robust error handling, and intelligent queue management.

## Key Architectural Principles

### 1. Asynchronous Processing
Never block payment requests. Use message queues and event-driven architecture.

### 2. Idempotency
Ensure every operation is idempotent to handle retries safely.

### 3. Monitoring & Alerts
Real-time monitoring of transaction flows is critical for detecting anomalies.`,
      fr: `# Architecture de traitement des paiements à l'échelle

La construction d'un système de traitement des paiements qui gère des millions de transactions nécessite une planification architecturale soignée.`,
    },
    mediaGallery: [],
    tags: ["engineering", "payments", "architecture"],
    comments: [],
    relatedPosts: [1, 3],
  },
  {
    id: 3,
    slug: "african-fintech-growth",
    category: "growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    featured: true,
    readTime: 6,
    publishedAt: "2025-05-14",
    author: {
      id: 3,
      name: "Amara Okonkwo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      role: "Growth Lead",
    },
    title: {
      en: "The Future of African Fintech: Trends & Opportunities",
      fr: "L'avenir de la Fintech africaine : tendances et opportunités",
    },
    description: {
      en: "Explore the fast-moving African fintech landscape, opportunity zones, and what growth-ready companies must master.",
      fr: "Explorez le paysage fintech africain en pleine mutation, les zones d'opportunité et ce que les entreprises doivent maîtriser.",
    },
    content: {
      en: `# The Future of African Fintech: Trends & Opportunities

Africa is the world's fastest-growing fintech market. New digital services are being built around mobile wallets, remittances, and financial inclusion.

## Growth Drivers

- Digital identity platforms
- Mobile-first payment services
- Cross-border settlement innovation
- Embedded finance

## What to Watch

Companies that combine localized design with secure, scalable infrastructure will win the next decade.`,
      fr: `# L'avenir de la Fintech africaine : tendances et opportunités

L'Afrique est le marché fintech à la croissance la plus rapide au monde. De nouveaux services numériques se développent autour des portefeuilles mobiles, des transferts et de l'inclusion financière.

## Facteurs de croissance

- Plateformes d'identité numérique
- Services de paiement mobiles
- Innovation dans le règlement transfrontalier
- Finance embarquée

## À surveiller

Les entreprises qui combinent une conception localisée avec une infrastructure sécurisée et évolutive gagneront la prochaine décennie.`,
    },
    mediaGallery: [],
    tags: ["growth", "africa", "fintech"],
    comments: [],
    relatedPosts: [2, 4],
  },
  {
    id: 4,
    slug: "ux-for-fintech-trust",
    category: "design",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
    featured: false,
    readTime: 7,
    publishedAt: "2025-04-30",
    author: {
      id: 4,
      name: "Maya Lefèvre",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      role: "Product Designer",
    },
    title: {
      en: "Designing Trust: UX for Fintech Customers",
      fr: "Concevoir la confiance : UX pour les clients fintech",
    },
    description: {
      en: "User experience choices can make or break fintech adoption. Learn how to design for trust, transparency, and clarity.",
      fr: "Les choix d'expérience utilisateur peuvent déterminer l'adoption fintech. Apprenez à concevoir la confiance, la transparence et la clarté.",
    },
    content: {
      en: `# Designing Trust: UX for Fintech Customers

Customer trust is earned through clear interfaces, predictable payment flows, and strong security cues.

## UX Principles for Fintech

- Keep onboarding short and contextual
- Surface transaction details clearly
- Use consistent visual language
- Provide trust signals at every step

## Why it matters

Users are more likely to complete a payment or signup when they feel confident the product is safe and easy to use.`,
      fr: `# Concevoir la confiance : UX pour les clients fintech

La confiance des clients se gagne par des interfaces claires, des flux de paiement prévisibles et des signaux de sécurité forts.

## Principes UX pour la fintech

- Gardez l'intégration courte et contextuelle
- Affichez clairement les détails des transactions
- Utilisez un langage visuel cohérent
- Fournissez des signaux de confiance à chaque étape

## Pourquoi c'est important

Les utilisateurs sont plus susceptibles de compléter un paiement ou une inscription lorsqu'ils se sentent en confiance.`,
    },
    mediaGallery: [],
    tags: ["design", "ux", "trust"],
    comments: [],
    relatedPosts: [1, 3],
  },
  {
    id: 5,
    slug: "culture-of-compliance",
    category: "product",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    featured: false,
    readTime: 4,
    publishedAt: "2025-04-18",
    author: {
      id: 5,
      name: "Nadia Mensah",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      role: "Product Manager",
    },
    title: {
      en: "Building a Culture of Compliance in Fintech",
      fr: "Construire une culture de conformité dans la fintech",
    },
    description: {
      en: "Compliance should be built into product decisions, not added later. Discover how to embed risk controls into your roadmap.",
      fr: "La conformité doit être intégrée aux décisions produit, pas ajoutée après coup. Découvrez comment intégrer les contrôles de risque à votre feuille de route.",
    },
    content: {
      en: `# Building a Culture of Compliance in Fintech

Compliance must be an active part of product strategy, not a checkbox at launch.

## Embed risk thinking into product design

- Model edge cases early
- Use data-driven validation
- Keep audit trails transparent

## Product leadership

Strong product leadership budgets time for regulatory review and aligns teams around trust.`,
      fr: `# Construire une culture de conformité dans la fintech

La conformité doit faire partie intégrante de la stratégie produit, pas être un simple point à cocher au lancement.

## Intégrer la réflexion sur les risques dans la conception du produit

- Modéliser les cas limites dès le départ
- Utiliser une validation basée sur les données
- Garder des pistes d'audit transparentes

## Leadership produit

Un leadership produit solide prépare du temps pour la révision réglementaire et aligne les équipes autour de la confiance.`,
    },
    mediaGallery: [],
    tags: ["product", "compliance", "risk"],
    comments: [],
    relatedPosts: [1, 2],
  },
  {
    id: 6,
    slug: "fintech-culture-and-team",
    category: "culture",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    featured: false,
    readTime: 5,
    publishedAt: "2025-04-05",
    author: {
      id: 6,
      name: "Kofi Mensah",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      role: "People Operations",
    },
    title: {
      en: "How Culture Shapes High-Performing Fintech Teams",
      fr: "Comment la culture façonne les équipes fintech performantes",
    },
    description: {
      en: "A strong team culture helps fintech companies move faster and stay aligned across product, engineering, and compliance.",
      fr: "Une forte culture d'équipe aide les entreprises fintech à avancer plus vite et à rester alignées sur le produit, l'ingénierie et la conformité.",
    },
    content: {
      en: `# How Culture Shapes High-Performing Fintech Teams

The right culture accelerates decision-making and keeps teams aligned during rapid growth.

## Culture ingredients

- Clear mission and values
- Cross-functional trust
- Continuous learning

## Build for scale

Great culture balances speed with governance so teams can move confidently.`,
      fr: `# Comment la culture façonne les équipes fintech performantes

La bonne culture accélère la prise de décision et maintient l'alignement des équipes pendant la croissance rapide.

## Ingrédients de la culture

- Mission et valeurs claires
- Confiance interfonctionnelle
- Apprentissage continu

## Construire pour l'échelle

Une excellente culture équilibre la vitesse et la gouvernance pour que les équipes avancent en confiance.`,
    },
    mediaGallery: [],
    tags: ["culture", "team", "growth"],
    comments: [],
    relatedPosts: [3, 5],
  },
];
