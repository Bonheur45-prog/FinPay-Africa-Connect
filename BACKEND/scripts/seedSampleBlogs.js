const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api';
const tokenArg = process.argv.find((arg) => arg.startsWith('--token='));

if (!tokenArg) {
  console.error('Missing token. Run with: node backend/scripts/seedSampleBlogs.js --token=YOUR_TOKEN');
  process.exit(1);
}

const token = tokenArg.split('=')[1];
if (!token) {
  console.error('Invalid token value.');
  process.exit(1);
}

const sampleBlogs = [
  {
    title: { en: 'Accelerating Payments Across Africa', fr: 'Accélération des paiements en Afrique' },
    description: {
      en: 'A practical overview of cross-border payment ecosystems and the role of fintech in Africa.',
      fr: 'Un aperçu pratique des écosystèmes de paiements transfrontaliers et du rôle de la fintech en Afrique.'
    },
    content: {
      en: 'FinPay Africa is transforming the way businesses and consumers send money across borders. With secure infrastructure and local compliance, we create frictionless payment journeys.',
      fr: 'FinPay Africa transforme la façon dont les entreprises et les consommateurs envoient de l'argent à l'international. Avec une infrastructure sécurisée et une conformité locale, nous créons des parcours de paiement fluides.'
    },
    excerpt: {
      en: 'Learn how our payment rails scale across African markets with reliability and compliance.',
      fr: 'Découvrez comment nos réseaux de paiement évoluent sur les marchés africains avec fiabilité et conformité.'
    },
    category: 'product',
    tags: ['payments', 'fintech', 'africa'],
    featured: true,
    status: 'published',
    author: {
      name: 'FinPay Africa Team',
      bio: {
        en: 'A team dedicated to simplifying payments across the continent.',
        fr: 'Une équipe dédiée à la simplification des paiements sur le continent.'
      }
    },
    seoTitle: {
      en: 'FinPay Africa Payment Solutions',
      fr: 'Solutions de paiement FinPay Africa'
    },
    seoDescription: {
      en: 'FinPay Africa enables secure payment flows across African borders.',
      fr: 'FinPay Africa permet des flux de paiement sécurisés à travers les frontières africaines.'
    },
    seoKeywords: {
      en: ['africa payments', 'fintech', 'cross-border'],
      fr: ['paiements afrique', 'fintech', 'transfrontalier']
    }
  },
  {
    title: { en: 'Building Trust with Local Financial Infrastructure', fr: 'Construire la confiance avec l’infrastructure financière locale' },
    description: {
      en: 'Explore how local partnerships and trust are driving financial inclusion on the continent.',
      fr: 'Explorez comment les partenariats locaux et la confiance favorisent l’inclusion financière sur le continent.'
    },
    content: {
      en: 'Our platform supports local currencies and regulatory requirements, helping businesses deploy digital payment services faster and more securely.',
      fr: 'Notre plateforme prend en charge les devises locales et les exigences réglementaires, aidant les entreprises à déployer des services de paiement numérique plus rapidement et en toute sécurité.'
    },
    excerpt: {
      en: 'Understand the power of local infrastructure for financial service delivery.',
      fr: 'Comprenez le pouvoir de l’infrastructure locale pour la fourniture de services financiers.'
    },
    category: 'growth',
    tags: ['trust', 'inclusion', 'local payments'],
    featured: false,
    status: 'published',
    author: {
      name: 'FinPay Strategy',
      bio: {
        en: 'Strategists focused on inclusive payment innovation.',
        fr: 'Stratèges axés sur l’innovation de paiement inclusive.'
      }
    },
    seoTitle: {
      en: 'Local Payments and Trust',
      fr: 'Paiements locaux et confiance'
    },
    seoDescription: {
      en: 'FinPay Africa helps companies deliver trusted local payment solutions.',
      fr: 'FinPay Africa aide les entreprises à proposer des solutions de paiement locales de confiance.'
    },
    seoKeywords: {
      en: ['financial inclusion', 'local payments', 'trust'],
      fr: ['inclusion financière', 'paiements locaux', 'confiance']
    }
  }
];

const createBlog = async (blogData) => {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(blogData)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create blog: ${response.status} ${error}`);
  }

  return response.json();
};

const seedBlogs = async () => {
  console.log('Seeding sample blogs...');

  for (const blog of sampleBlogs) {
    try {
      const created = await createBlog(blog);
      console.log('Created:', created.blog?._id || created.blog?.id || 'unknown');
    } catch (error) {
      console.error(error.message);
    }
  }

  console.log('Seed complete.');
};

seedBlogs().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
