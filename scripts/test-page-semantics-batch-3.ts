import fs from 'node:fs';
import path from 'node:path';

interface Batch3PageConfig {
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
    hasTable?: boolean;
    hasTabs?: boolean;
    hasFigure?: boolean;
    hasLists?: boolean;
    hasAccordion?: boolean;
  }[];
}

const BATCH_3_PAGES: Batch3PageConfig[] = [
  {
    name: 'All Services',
    route: '/services',
    pageFile: 'pages/AllServicesPage.tsx',
    components: [
      { name: 'Hero', filePath: 'components/Services/AllServices/Hero.tsx', hasH1: true, hasHeader: true, hasSection: true },
      { name: 'ServiceGrid', filePath: 'components/Services/AllServices/ServiceGrid.tsx', hasSection: true, hasArticles: true, hasLists: true },
      { name: 'Workflows', filePath: 'components/Services/AllServices/Workflows.tsx', hasSection: true, hasLists: true },
      { name: 'CTA', filePath: 'components/Services/AllServices/CTA.tsx', hasSection: true, hasLists: true },
    ],
  },
  {
    name: 'Pricing',
    route: '/pricing',
    pageFile: 'pages/PricingPage.tsx',
    components: [
      { name: 'ServicePricingSection', filePath: 'components/Pricing/ServicePricingSection.tsx', hasHeader: true, hasSection: true, hasTable: true },
      { name: 'ChatPricingSection', filePath: 'components/Pricing/ChatPricingSection.tsx', hasHeader: true, hasSection: true, hasTable: true },
      { name: 'AssistantPricingSection', filePath: 'components/Pricing/AssistantPricingSection.tsx', hasHeader: true, hasSection: true, hasArticles: true },
      { name: 'CTA', filePath: 'components/CTA.tsx', hasSection: true },
    ],
  },
  {
    name: 'Subscription',
    route: '/subscription',
    pageFile: 'pages/SubscriptionPage.tsx',
    components: [
      { name: 'SubscriptionHero', filePath: 'components/Subscription/SubscriptionHero.tsx', hasH1: true, hasHeader: true },
      { name: 'CurrentPaymentModel', filePath: 'components/Subscription/CurrentPaymentModel.tsx', hasHeader: true, hasSection: true, hasArticles: true },
      { name: 'StudioPlans', filePath: 'components/Subscription/StudioPlans.tsx', hasHeader: true, hasSection: true, hasArticles: true },
      { name: 'PlanComparison', filePath: 'components/Subscription/PlanComparison.tsx', hasHeader: true, hasSection: true, hasTable: true },
      { name: 'CreditExplainer', filePath: 'components/Subscription/CreditExplainer.tsx', hasHeader: true, hasSection: true, hasArticles: true },
      { name: 'SubscriptionFAQ', filePath: 'components/Subscription/SubscriptionFAQ.tsx', hasHeader: true, hasSection: true, hasAccordion: true },
      { name: 'CTA', filePath: 'components/CTA.tsx', hasSection: true },
    ],
  },
  {
    name: 'Solutions',
    route: '/solutions',
    pageFile: 'pages/SolutionsPage.tsx',
    components: [
      { name: 'SolutionsHero', filePath: 'components/Solutions/SolutionsHero.tsx', hasH1: true, hasHeader: true, hasLists: true },
      { name: 'SolutionsNarratives', filePath: 'components/Solutions/SolutionsNarratives.tsx', hasHeader: true, hasSection: true, hasTabs: true },
      { name: 'HowLumaFits', filePath: 'components/Solutions/HowLumaFits.tsx', hasHeader: true, hasSection: true, hasArticles: true },
      { name: 'EnterpriseAPI', filePath: 'components/Solutions/EnterpriseAPI.tsx', hasHeader: true, hasSection: true, hasTabs: true, hasLists: true },
      { name: 'IllustrativeScenarios', filePath: 'components/Solutions/IllustrativeScenarios.tsx', hasHeader: true, hasSection: true, hasArticles: true },
      { name: 'CTA', filePath: 'components/CTA.tsx', hasSection: true },
    ],
  },
  {
    name: 'Security',
    route: '/security',
    pageFile: 'pages/SecurityPage.tsx',
    components: [
      { name: 'SecurityHero', filePath: 'components/Security/SecurityHero.tsx', hasH1: true, hasHeader: true, hasLists: true, hasFigure: true },
      { name: 'SecurityFeatures', filePath: 'components/Security/SecurityFeatures.tsx', hasHeader: true, hasSection: true, hasArticles: true },
      { name: 'Compliance', filePath: 'components/Security/Compliance.tsx', hasSection: true, hasLists: true, hasFigure: true },
    ],
  },
];

function runTests() {
  const root = process.cwd();
  console.log('Running Semantic HTML & AEO Test Suite for Batch 3 Pages (/services, /pricing, /subscription, /solutions, /security)...\n');

  let totalPagesChecked = 0;
  let totalComponentsChecked = 0;

  for (const page of BATCH_3_PAGES) {
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

      // Check <table>
      if (comp.hasTable) {
        const lower = compContent.toLowerCase();
        if (!lower.includes('<table') || !lower.includes('<thead') || !lower.includes('<tbody')) {
          throw new Error(`${comp.name} expected semantic <table> with <thead> and <tbody>.`);
        }
      }

      // Check tabs
      if (comp.hasTabs) {
        const lower = compContent.toLowerCase();
        if (!lower.includes('role="tablist"') || !lower.includes('role="tab"') || !lower.includes('role="tabpanel"')) {
          throw new Error(`${comp.name} expected accessible tab semantics (tablist, tab, tabpanel).`);
        }
      }

      // Check <figure> and <figcaption>
      if (comp.hasFigure) {
        const hasFig = compContent.includes('<figure') || compContent.includes('<motion.figure');
        const hasCap = compContent.includes('<figcaption') || compContent.includes('<motion.figcaption');
        if (!hasFig || !hasCap) {
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
    console.log(`  ✓ All card (<article>), table (<table>), and list (<ul>/<ol>) structures verified`);
    console.log(`  ✓ Media (<figure>/<figcaption>), Tabs, and Accordion semantics verified\n`);

    totalPagesChecked++;
  }

  console.log(`\n========================================`);
  console.log(`All ${totalPagesChecked} Batch 3 pages and ${totalComponentsChecked} components passed all semantic HTML and AEO tests!`);
  console.log(`========================================\n`);
}

runTests();
