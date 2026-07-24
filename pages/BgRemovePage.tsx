import React, { useEffect } from 'react';
import { BgRemoveHero } from '../components/Services/BgRemove/BgRemoveHero';
import { BgRemoveSteps } from '../components/Services/BgRemove/BgRemoveSteps';
import { BgRemoveUseCases } from '../components/Services/BgRemove/BgRemoveUseCases';
import { BgRemoveFeatures } from '../components/Services/BgRemove/BgRemoveFeatures';
import { BgRemoveFAQ } from '../components/Services/BgRemove/BgRemoveFAQ';
import CTA from '../components/CTA';

const BgRemovePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-gray-200 selection:bg-luma-pink selection:text-white transition-colors duration-300">
      <BgRemoveHero />
      <BgRemoveSteps />
      <BgRemoveUseCases />
      <BgRemoveFeatures />
      <BgRemoveFAQ />
      <CTA />
    </div>
  );
};

export default BgRemovePage;
