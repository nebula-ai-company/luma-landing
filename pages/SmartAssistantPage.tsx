import React, { useEffect } from 'react';
import { AssistantHero } from '../components/Services/SmartAssistant/AssistantHero';
import { AssistantSteps } from '../components/Services/SmartAssistant/AssistantSteps';
import { AssistantPricing } from '../components/Services/SmartAssistant/AssistantPricing';
import { AssistantIntegration } from '../components/Services/SmartAssistant/AssistantIntegration';
import { AssistantAdvanced } from '../components/Services/SmartAssistant/AssistantAdvanced';
import { AssistantFAQ } from '../components/Services/SmartAssistant/AssistantFAQ';
import CTA from '../components/CTA';

const SmartAssistantPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-950 dark:text-white transition-colors duration-300 selection:bg-luma-yellow selection:text-black">
      <AssistantHero />
      <AssistantSteps />
      <AssistantPricing />
      <AssistantIntegration />
      <AssistantAdvanced />
      <AssistantFAQ />
      <CTA />
    </div>
  );
};

export default SmartAssistantPage;
