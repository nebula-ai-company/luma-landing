import React, { useEffect } from 'react';
import { SubscriptionHero } from '../components/Subscription/SubscriptionHero';
import { CurrentPaymentModel } from '../components/Subscription/CurrentPaymentModel';
import { StudioPlans } from '../components/Subscription/StudioPlans';
import { PlanComparison } from '../components/Subscription/PlanComparison';
import { CreditExplainer } from '../components/Subscription/CreditExplainer';
import { SubscriptionFAQ } from '../components/Subscription/SubscriptionFAQ';
import { SubscriptionBgAnimation } from '../components/Subscription/SubscriptionBgAnimation';
import CTA from '../components/CTA';

const SubscriptionPage: React.FC = () => {
  // Always scroll to top on mount (DESIGN.md section 8)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-[#0a0a0a] text-zinc-950 dark:text-white selection:bg-indigo-600 selection:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Floating high-fidelity background animation across full scrollable area */}
      <SubscriptionBgAnimation />

      <div className="relative z-10">
        <SubscriptionHero />
        <CurrentPaymentModel />
        <StudioPlans />
        <PlanComparison />
        <CreditExplainer />
        <SubscriptionFAQ />
        <CTA />
      </div>
    </div>
  );
};

export default SubscriptionPage;
