import React, { useEffect } from 'react';
import { SubscriptionHero } from '../components/Subscription/SubscriptionHero';
import { StudioPlans } from '../components/Subscription/StudioPlans';
import { AssistantPlans } from '../components/Subscription/AssistantPlans';
import { CreditExplainer } from '../components/Subscription/CreditExplainer';
import { SubscriptionFAQ } from '../components/Subscription/SubscriptionFAQ';
import CTA from '../components/CTA';

const SubscriptionPage: React.FC = () => {
  // Always scroll to top on mount (DESIGN.md section 8)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0a0a0a] text-zinc-950 dark:text-white selection:bg-indigo-600 selection:text-white transition-colors duration-300">
      <SubscriptionHero />
      <StudioPlans />
      <AssistantPlans />
      <CreditExplainer />
      <SubscriptionFAQ />
      <CTA />
    </div>
  );
};

export default SubscriptionPage;
