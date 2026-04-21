import { useParams } from "react-router";
import { solutions } from "../data/solutions";

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

  return (
    <>
        {data.sections.map((section, index) => {
          const Component = componentMap[section.type];
          if (!Component) return null;

          return <Component key={index} {...section.data} />;
        })}
    </>
  );
}