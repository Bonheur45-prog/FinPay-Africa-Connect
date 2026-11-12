import { useParams } from "react-router";
import { solutions } from "../data/solutions";
import HeadTitle from '../components/HeadTitle';
import { useTranslation } from 'react-i18next';

import SolutionHero from "../components/solutionDetail/SolutionHero";
//import ProblemSolution from "../components/solutionDetail/ProblemSolution/ProblemSolution";
import FeatureGrid from "../components/solutionDetail/FeatureGrid";
import StatsBand from "../components/solutionDetail/StatsBand";
import SolutionCTA from "../components/solutionDetail/SolutionCTA";

const componentMap = {
  hero: SolutionHero,
  //problemSolution: ProblemSolution,
  features: FeatureGrid,
  stats: StatsBand,
  cta: SolutionCTA,
};

export default function SolutionPage() {
  const { slug } = useParams();
  const data = solutions[slug];

  if (!data) return <div>Solution not found</div>;

  const { t } = useTranslation();

  const title = data?.meta?.title
    ? t(data.meta.title, { ns: data.namespace })
    : `${data?.namespace || slug} — Solutions — FinPay Africa`;

  const description = data?.meta?.description ? t(data.meta.description, { ns: data.namespace }) : undefined;
  const pathname = typeof window !== 'undefined' ? window.location.pathname : `/solutions/${slug}`;
  const canonical = `https://finpay-africa.com${pathname}`;
  const hreflangs = [
    { lang: 'en', href: `https://finpay-africa.com/en${pathname.startsWith('/en') ? pathname.slice(3) : pathname}` },
    { lang: 'fr', href: `https://finpay-africa.com/fr${pathname.startsWith('/fr') ? pathname.slice(3) : pathname}` },
  ];
  const og = { title, description, url: canonical, image: `https://finpay-africa.com/assets/og-${data.slug || slug}.jpg` };

  return (
    <>
      <HeadTitle title={title} description={description} canonical={canonical} og={og} twitter={{ card: 'summary_large_image', title, description, image: og.image }} hreflangs={hreflangs} jsonLd={{ '@context': 'https://schema.org', '@type': 'Product', name: title, description }} />
      {data.sections.map((section, index) => {
          const Component = componentMap[section.type];
          if (!Component) return null;

          return <Component key={`${slug}-${index}`} {...section.data} namespace={data.namespace} />;
        })}
    </>
  );
}