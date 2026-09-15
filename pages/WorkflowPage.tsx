import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { WorkflowHero } from '../components/Services/Workflow/WorkflowHero';
import { WorkflowProcess } from '../components/Services/Workflow/WorkflowProcess';
import { WorkflowCapabilities } from '../components/Services/Workflow/WorkflowCapabilities';
import { WorkflowUseCases } from '../components/Services/Workflow/WorkflowUseCases';
import { WorkflowExecution } from '../components/Services/Workflow/WorkflowExecution';
import { WorkflowTechnicalChecklist } from '../components/Services/Workflow/WorkflowTechnicalChecklist';
import CTA from '../components/CTA';

const WorkflowPage: React.FC = () => {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <SEOHead title="لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای" />
      <WorkflowHero />
      <WorkflowProcess />
      <WorkflowCapabilities />
      <WorkflowUseCases />
      <WorkflowExecution />
      <WorkflowTechnicalChecklist />
      <CTA />
    </main>
  );
};

export default WorkflowPage;
