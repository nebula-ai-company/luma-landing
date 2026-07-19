
import React, { useEffect } from 'react';
import { SolutionsHero } from '../components/Solutions/SolutionsHero';
import { SolutionsNarratives } from '../components/Solutions/SolutionsNarratives';
import { HowLumaFits } from '../components/Solutions/HowLumaFits';
import { EnterpriseAPI } from '../components/Solutions/EnterpriseAPI';
import { IllustrativeScenarios } from '../components/Solutions/IllustrativeScenarios';
import CTA from '../components/CTA';

const SolutionsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#080808] text-zinc-900 dark:text-white selection:bg-luma-pink selection:text-white transition-colors duration-300">
      <SolutionsHero />
      <SolutionsNarratives />
      <HowLumaFits />
      <EnterpriseAPI />
      <IllustrativeScenarios />
      <CTA />
    </div>
  );
};

export default SolutionsPage;
