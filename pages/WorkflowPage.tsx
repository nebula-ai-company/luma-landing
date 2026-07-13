import React, { useEffect } from 'react';
import { WorkflowHero } from '../components/Services/Workflow/WorkflowHero';
import { WorkflowProcess } from '../components/Services/Workflow/WorkflowProcess';
import { WorkflowCapabilities } from '../components/Services/Workflow/WorkflowCapabilities';
import { WorkflowUseCases } from '../components/Services/Workflow/WorkflowUseCases';
import { WorkflowExecution } from '../components/Services/Workflow/WorkflowExecution';
import CTA from '../components/CTA';

const WorkflowPage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO / Browser Title update
    document.title = 'لوما | Workflow - بوم بصری ساخت فرآیندهای هوش مصنوعی';
  }, []);

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <WorkflowHero />
      <WorkflowProcess />
      <WorkflowCapabilities />
      <WorkflowUseCases />
      <WorkflowExecution />
      <CTA />
    </main>
  );
};

export default WorkflowPage;
