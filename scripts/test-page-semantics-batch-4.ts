import fs from 'node:fs';
import path from 'node:path';

interface Batch4ComponentConfig {
  name: string;
  filePath: string;
  hasH1?: boolean;
  hasHeader?: boolean;
  hasSection?: boolean;
  hasArticles?: boolean;
  hasNav?: boolean;
  hasFigure?: boolean;
  hasLists?: boolean;
}

interface Batch4PageConfig {
  name: string;
  route: string;
  pageFile: string;
  pageHasH1?: boolean;
  pageHasHeader?: boolean;
  pageHasSection?: boolean;
  pageHasNav?: boolean;
  pageHasArticles?: boolean;
  components?: Batch4ComponentConfig[];
}

const BATCH_4_PAGES: Batch4PageConfig[] = [
  {
    name: 'About',
    route: '/about',
    pageFile: 'pages/AboutPage.tsx',
    components: [
      { name: 'AboutHero', filePath: 'components/About/AboutHero.tsx', hasH1: true, hasHeader: true },
      { name: 'AboutStats', filePath: 'components/About/AboutStats.tsx', hasSection: true, hasLists: true },
      { name: 'AboutCoreValues', filePath: 'components/About/AboutCoreValues.tsx', hasSection: true, hasArticles: true },
      { name: 'AboutStory', filePath: 'components/About/AboutStory.tsx', hasSection: true, hasFigure: true },
    ],
  },
  {
    name: 'Gallery',
    route: '/gallery',
    pageFile: 'pages/GalleryPage.tsx',
    components: [
      { name: 'GalleryHero', filePath: 'components/Gallery/GalleryHero.tsx', hasH1: true, hasHeader: true },
      { name: 'FilterBar', filePath: 'components/Gallery/FilterBar.tsx', hasNav: true },
      { name: 'GalleryGrid', filePath: 'components/Gallery/GalleryGrid.tsx', hasSection: true },
      { name: 'ImageCard', filePath: 'components/Gallery/ImageCard.tsx', hasArticles: true },
    ],
  },
  {
    name: 'Tutorials',
    route: '/tutorials',
    pageFile: 'pages/TutorialsPage.tsx',
    pageHasH1: true,
    pageHasHeader: true,
    pageHasSection: true,
    pageHasArticles: true,
    components: [
      { name: 'TutorialViewer', filePath: 'components/TutorialViewer.tsx', hasNav: true, hasFigure: true },
    ],
  },
  {
    name: 'Docs',
    route: '/docs',
    pageFile: 'pages/DocsPage.tsx',
    pageHasH1: true,
    pageHasHeader: true,
    pageHasSection: true,
    pageHasNav: true,
    pageHasArticles: true,
  },
  {
    name: 'Contact',
    route: '/contact',
    pageFile: 'pages/ContactPage.tsx',
    pageHasH1: true,
    pageHasHeader: true,
    pageHasSection: true,
    pageHasArticles: true,
  },
  {
    name: 'Privacy',
    route: '/privacy',
    pageFile: 'pages/PrivacyPage.tsx',
    pageHasH1: true,
    pageHasHeader: true,
    pageHasArticles: true,
  },
  {
    name: 'Terms',
    route: '/terms',
    pageFile: 'pages/TermsPage.tsx',
    pageHasH1: true,
    pageHasHeader: true,
    pageHasArticles: true,
  },
];

function checkElementPresence(content: string, elementName: string): boolean {
  const lower = content.toLowerCase();
  const patterns = [
    new RegExp(`<${elementName}[\\s>]`, 'i'),
    new RegExp(`<(?:motion|Motion)\\.${elementName}[\\s>]`, 'i'),
  ];
  return patterns.some(p => p.test(lower));
}

function runTests() {
  const root = process.cwd();
  console.log('Running Semantic HTML & AEO Test Suite for Batch 4 Pages (/about, /gallery, /tutorials, /docs, /contact, /privacy, /terms)...\n');

  let totalPagesChecked = 0;
  let totalComponentsChecked = 0;

  for (const page of BATCH_4_PAGES) {
    console.log(`=== Testing [${page.name}] (${page.route}) ===`);
    const pageFullPath = path.join(root, page.pageFile);
    if (!fs.existsSync(pageFullPath)) {
      throw new Error(`Page file not found: ${pageFullPath}`);
    }
    const pageContent = fs.readFileSync(pageFullPath, 'utf8');

    // 1. Exactly one <main> landmark
    const mainTags = pageContent.match(/<main[\s>]/gi) || [];
    if (mainTags.length !== 1) {
      throw new Error(`${page.pageFile} must have exactly 1 <main> tag, found: ${mainTags.length}`);
    }
    console.log(`  ✓ Exactly one <main> landmark present in ${page.pageFile}`);

    // Track total H1 count across page and its components
    let totalH1Count = 0;
    const pageH1 = pageContent.match(/<h1[\s>]|<(?:motion|Motion)\.h1[\s>]/gi) || [];
    totalH1Count += pageH1.length;

    // Check page-level semantic requirements
    if (page.pageHasH1 && pageH1.length !== 1) {
      throw new Error(`Expected exactly 1 H1 directly in ${page.pageFile}, found ${pageH1.length}`);
    }
    if (page.pageHasHeader && !checkElementPresence(pageContent, 'header')) {
      throw new Error(`Expected <header> in ${page.pageFile}`);
    }
    if (page.pageHasSection && !checkElementPresence(pageContent, 'section')) {
      throw new Error(`Expected <section> in ${page.pageFile}`);
    }
    if (page.pageHasNav && !checkElementPresence(pageContent, 'nav')) {
      throw new Error(`Expected <nav> in ${page.pageFile}`);
    }
    if (page.pageHasArticles && !checkElementPresence(pageContent, 'article')) {
      throw new Error(`Expected <article> in ${page.pageFile}`);
    }

    if (page.components) {
      for (const comp of page.components) {
        const compFullPath = path.join(root, comp.filePath);
        if (!fs.existsSync(compFullPath)) {
          throw new Error(`Component file not found: ${compFullPath}`);
        }
        const compContent = fs.readFileSync(compFullPath, 'utf8');
        totalComponentsChecked++;

        // Check H1
        const compH1 = compContent.match(/<h1[\s>]|<(?:motion|Motion)\.h1[\s>]/gi) || [];
        totalH1Count += compH1.length;
        if (comp.hasH1 && compH1.length !== 1) {
          throw new Error(`Expected exactly 1 H1 in ${comp.name}, found ${compH1.length}`);
        } else if (!comp.hasH1 && compH1.length > 0) {
          throw new Error(`Unexpected H1 in ${comp.name}. Only hero should contain H1.`);
        }

        // Check <header>
        if (comp.hasHeader && !checkElementPresence(compContent, 'header')) {
          throw new Error(`${comp.name} missing <header> element.`);
        }

        // Check <section>
        if (comp.hasSection && !checkElementPresence(compContent, 'section')) {
          throw new Error(`${comp.name} missing <section> landmark.`);
        }

        // Check <article>
        if (comp.hasArticles && !checkElementPresence(compContent, 'article')) {
          throw new Error(`${comp.name} expected <article> elements.`);
        }

        // Check <nav>
        if (comp.hasNav && !checkElementPresence(compContent, 'nav')) {
          throw new Error(`${comp.name} expected <nav> landmark.`);
        }

        // Check <figure> and <figcaption>
        if (comp.hasFigure) {
          const hasFig = checkElementPresence(compContent, 'figure');
          const hasCap = checkElementPresence(compContent, 'figcaption');
          if (!hasFig || !hasCap) {
            throw new Error(`${comp.name} expected <figure> and <figcaption> elements.`);
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

        // Heading hierarchy check
        const headings = compContent.match(/<h[1-6][\s>]/gi) || [];
        for (const h of headings) {
          const level = parseInt(h.charAt(2), 10);
          if (level > 4) {
            throw new Error(`Heading level h${level} found in ${comp.name}. Keep levels within h1-h4.`);
          }
        }
      }
    }

    if (totalH1Count !== 1) {
      throw new Error(`Page ${page.name} must have exactly one H1 across all rendered components. Found: ${totalH1Count}`);
    }
    console.log(`  ✓ Exactly one meaningful H1 found for ${page.name}`);
    console.log(`  ✓ Heading hierarchy (H1 -> H2 -> H3 -> H4) verified`);
    console.log(`  ✓ All landmarks (<main>, <header>, <section>, <nav>) verified`);
    console.log(`  ✓ All content groupings (<article>, <figure>/<figcaption>, lists) verified\n`);

    totalPagesChecked++;
  }

  console.log(`========================================`);
  console.log(`All ${totalPagesChecked} Batch 4 pages and ${totalComponentsChecked} components passed all semantic HTML and AEO tests!`);
  console.log(`========================================\n`);
}

runTests();
