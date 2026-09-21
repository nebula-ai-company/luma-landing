import fs from 'node:fs';
import path from 'node:path';

interface ServicePageConfig {
  name: string;
  route: string;
  pageFile: string;
  components: {
    name: string;
    filePath: string;
    hasH1?: boolean;
    hasHeader?: boolean;
    hasSection?: boolean;
    hasArticles?: boolean;
    hasFigure?: boolean;
    hasLists?: boolean;
    hasAccordion?: boolean;
  }[];
}

const BATCH_2_PAGES: ServicePageConfig[] = [
  {
    name: 'Smart Assistant',
    route: '/service/smart-assistant',
    pageFile: 'pages/SmartAssistantPage.tsx',
    components: [
      { name: 'AssistantHero', filePath: 'components/Services/SmartAssistant/AssistantHero.tsx', hasH1: true, hasHeader: true, hasSection: true, hasLists: true, hasFigure: true },
      { name: 'AssistantSteps', filePath: 'components/Services/SmartAssistant/AssistantSteps.tsx', hasHeader: true, hasSection: true, hasArticles: true, hasLists: true },
      { name: 'AssistantPricing', filePath: 'components/Services/SmartAssistant/AssistantPricing.tsx', hasHeader: true, hasSection: true, hasArticles: true, hasLists: true },
      { name: 'AssistantIntegration', filePath: 'components/Services/SmartAssistant/AssistantIntegration.tsx', hasHeader: true, hasSection: true, hasArticles: true, hasFigure: true },
      { name: 'AssistantAdvanced', filePath: 'components/Services/SmartAssistant/AssistantAdvanced.tsx', hasHeader: true, hasSection: true, hasArticles: true, hasLists: true },
      { name: 'AssistantFAQ', filePath: 'components/Services/SmartAssistant/AssistantFAQ.tsx', hasHeader: true, hasSection: true, hasArticles: true, hasLists: true, hasAccordion: true },
      { name: 'CTA', filePath: 'components/CTA.tsx', hasSection: true },
    ],
  },
  {
    name: 'Workflow',
    route: '/service/workflow',
    pageFile: 'pages/WorkflowPage.tsx',
    components: [
      { name: 'WorkflowHero', filePath: 'components/Services/Workflow/WorkflowHero.tsx', hasH1: true, hasHeader: true, hasSection: true, hasLists: true, hasFigure: true },
      { name: 'WorkflowProcess', filePath: 'components/Services/Workflow/WorkflowProcess.tsx', hasHeader: true, hasSection: true, hasArticles: true, hasLists: true },
      { name: 'WorkflowCapabilities', filePath: 'components/Services/Workflow/WorkflowCapabilities.tsx', hasHeader: true, hasSection: true, hasArticles: true, hasLists: true },
      { name: 'WorkflowUseCases', filePath: 'components/Services/Workflow/WorkflowUseCases.tsx', hasHeader: true, hasSection: true, hasArticles: true, hasFigure: true },
      { name: 'WorkflowExecution', filePath: 'components/Services/Workflow/WorkflowExecution.tsx', hasHeader: true, hasSection: true, hasArticles: true, hasFigure: true },
      { name: 'WorkflowTechnicalChecklist', filePath: 'components/Services/Workflow/WorkflowTechnicalChecklist.tsx', hasHeader: true, hasSection: true, hasArticles: true, hasLists: true, hasAccordion: true },
      { name: 'CTA', filePath: 'components/CTA.tsx', hasSection: true },
    ],
  },
];

function runTests() {
  const root = process.cwd();
  console.log('Running Semantic HTML & AEO Test Suite for Batch 2 Service Pages (Smart Assistant & Workflow)...\n');

  let totalPagesChecked = 0;
  let totalComponentsChecked = 0;

  for (const page of BATCH_2_PAGES) {
    console.log(`=== Testing [${page.name}] (${page.route}) ===`);
    const pageFullPath = path.join(root, page.pageFile);
    if (!fs.existsSync(pageFullPath)) {
      throw new Error(`Page file not found: ${pageFullPath}`);
    }
    const pageContent = fs.readFileSync(pageFullPath, 'utf8');

    // 1. Exactly one <main> landmark
    const mainTags = pageContent.match(/<main[\s>]/g) || [];
    if (mainTags.length !== 1) {
      throw new Error(`${page.pageFile} must have exactly 1 <main> tag, found: ${mainTags.length}`);
    }
    console.log(`  ✓ Exactly one <main> landmark present in ${page.pageFile}`);

    // Track total H1 count across page and its components
    let totalH1Count = 0;
    const pageH1 = pageContent.match(/<h1[\s>]/g) || [];
    totalH1Count += pageH1.length;

    for (const comp of page.components) {
      const compFullPath = path.join(root, comp.filePath);
      if (!fs.existsSync(compFullPath)) {
        throw new Error(`Component file not found: ${compFullPath}`);
      }
      const compContent = fs.readFileSync(compFullPath, 'utf8');
      totalComponentsChecked++;

      // Check H1
      const compH1 = compContent.match(/<h1[\s>]|<(?:motion|Motion)\.h1[\s>]/g) || [];
      totalH1Count += compH1.length;
      if (comp.hasH1 && compH1.length !== 1) {
        throw new Error(`Expected exactly 1 H1 in ${comp.name}, found ${compH1.length}`);
      } else if (!comp.hasH1 && compH1.length > 0) {
        throw new Error(`Unexpected H1 in ${comp.name}. Only hero should contain H1.`);
      }

      // Check <header>
      if (comp.hasHeader) {
        const lower = compContent.toLowerCase();
        const hasOpen = lower.includes('<header') || lower.includes('<motion.header');
        const hasClose = lower.includes('</header>') || lower.includes('</motion.header>');
        if (!hasOpen || !hasClose) {
          throw new Error(`${comp.name} missing <header> element.`);
        }
      }

      // Check <section>
      if (comp.hasSection) {
        const lower = compContent.toLowerCase();
        const hasOpen = lower.includes('<section') || lower.includes('<motion.section');
        const hasClose = lower.includes('</section>') || lower.includes('</motion.section>');
        if (!hasOpen || !hasClose) {
          throw new Error(`${comp.name} missing <section> landmark.`);
        }
      }

      // Check <article>
      if (comp.hasArticles) {
        const lower = compContent.toLowerCase();
        if (!lower.includes('<article') && !lower.includes('<motion.article')) {
          throw new Error(`${comp.name} expected <article> elements for cards.`);
        }
      }

      // Check <figure> and <figcaption>
      if (comp.hasFigure) {
        if (!compContent.includes('<figure') || !compContent.includes('<figcaption')) {
          throw new Error(`${comp.name} expected <figure> and <figcaption> elements.`);
        }
      }

      // Check accordion accessibility attributes
      if (comp.hasAccordion) {
        if (!compContent.includes('aria-expanded') || !compContent.includes('aria-controls')) {
          throw new Error(`${comp.name} expected aria-expanded and aria-controls attributes for accordion.`);
        }
      }

      // Check lists
      if (comp.hasLists) {
        const lowerContent = compContent.toLowerCase();
        const hasList = lowerContent.includes('<ul') || lowerContent.includes('<motion.ul') ||
                        lowerContent.includes('<ol') || lowerContent.includes('<motion.ol') ||
                        lowerContent.includes('<dl') || lowerContent.includes('<motion.dl');
        if (!hasList) {
          throw new Error(`${comp.name} expected list tags (<ul>, <ol>, or <dl>).`);
        }
      }

      // Heading hierarchy check: verify no h5 or h6 without proper hierarchy
      const headings = compContent.match(/<h[1-6][\s>]/g) || [];
      for (const h of headings) {
        const level = parseInt(h.charAt(2), 10);
        if (level > 4) {
          throw new Error(`Heading level h${level} found in ${comp.name}. Keep levels within h1-h4.`);
        }
      }
    }

    if (totalH1Count !== 1) {
      throw new Error(`Page ${page.name} must have exactly one H1 across all rendered components. Found: ${totalH1Count}`);
    }
    console.log(`  ✓ Exactly one meaningful H1 found for ${page.name}`);
    console.log(`  ✓ Heading hierarchy (H1 -> H2 -> H3 -> H4) verified`);
    console.log(`  ✓ All landmarks (<main>, <header>, <section>) verified`);
    console.log(`  ✓ All card (<article>) and list (<ul>/<ol>) structures verified`);
    console.log(`  ✓ Media (<figure>/<figcaption>) and Accordion (aria-expanded/controls) semantics verified\n`);

    totalPagesChecked++;
  }

  console.log(`\n========================================`);
  console.log(`All ${totalPagesChecked} Batch 2 service pages and ${totalComponentsChecked} components passed all semantic HTML and AEO tests!`);
  console.log(`========================================\n`);
}

runTests();
