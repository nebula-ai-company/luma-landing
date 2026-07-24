import React, { useEffect } from 'react';
import { WorkflowHero } from '../components/Services/Workflow/WorkflowHero';
import { WorkflowProcess } from '../components/Services/Workflow/WorkflowProcess';
import { WorkflowCapabilities } from '../components/Services/Workflow/WorkflowCapabilities';
import { WorkflowUseCases } from '../components/Services/Workflow/WorkflowUseCases';
import { WorkflowExecution } from '../components/Services/Workflow/WorkflowExecution';
import { WorkflowTechnicalChecklist } from '../components/Services/Workflow/WorkflowTechnicalChecklist';
import CTA from '../components/CTA';

const WorkflowPage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO / Browser Title update
    document.title = 'لوما | ورک‌فلوها - بوم بصری ساخت فرآیندهای چندمرحله‌ای';
  }, []);

  return (
    <main className="overflow-x-hidden w-full max-w-full">
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
