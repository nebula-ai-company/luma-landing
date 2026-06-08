
import React, { useEffect } from 'react';
import { Hero } from '../components/Services/AllServices/Hero';
import { ServiceGrid } from '../components/Services/AllServices/ServiceGrid';
import { Workflows } from '../components/Services/AllServices/Workflows';
import { CTA } from '../components/Services/AllServices/CTA';

const SolutionsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-white selection:bg-luma-pink selection:text-white transition-colors duration-300">
      <Hero />
      <ServiceGrid />
      <Workflows />
      <CTA />
    </div>
  );
};

export default SolutionsPage;
