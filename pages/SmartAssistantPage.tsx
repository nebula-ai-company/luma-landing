
import React, { useEffect } from 'react';
import { AssistantHero } from '../components/Services/SmartAssistant/AssistantHero';
import { AssistantSteps } from '../components/Services/SmartAssistant/AssistantSteps';
import { AssistantPricing } from '../components/Services/SmartAssistant/AssistantPricing';
import { AssistantIntegration } from '../components/Services/SmartAssistant/AssistantIntegration';
import { AssistantAdvanced } from '../components/Services/SmartAssistant/AssistantAdvanced';
import CTA from '../components/CTA';

const SmartAssistantPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-luma-yellow selection:text-black">
      <AssistantHero />
      <AssistantSteps />
      <AssistantPricing />
      <AssistantIntegration />
      <AssistantAdvanced />
      <CTA />
    </div>
  );
};

export default SmartAssistantPage;
