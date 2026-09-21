import fs from 'node:fs';
import path from 'node:path';

function runTest() {
  const root = process.cwd();
  const pagePath = path.join(root, 'pages', 'ImageEditingPage.tsx');
  const heroPath = path.join(root, 'components', 'Services', 'ImageEditing', 'EditingHero.tsx');
  const stepsPath = path.join(root, 'components', 'Services', 'ImageEditing', 'EditingSteps.tsx');
  const featuresPath = path.join(root, 'components', 'Services', 'ImageEditing', 'EditingFeatures.tsx');
  const faqPath = path.join(root, 'components', 'Services', 'ImageEditing', 'EditingFAQ.tsx');
  const ctaPath = path.join(root, 'components', 'CTA.tsx');

  console.log('Testing Image Editing Service (/service/img-edit) Semantic HTML and AEO Structure...\n');

  const files = [pagePath, heroPath, stepsPath, featuresPath, faqPath, ctaPath];
  for (const f of files) {
    if (!fs.existsSync(f)) {
      throw new Error(`File not found: ${f}`);
    }
  }

  const pageContent = fs.readFileSync(pagePath, 'utf8');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  const stepsContent = fs.readFileSync(stepsPath, 'utf8');
  const featuresContent = fs.readFileSync(featuresPath, 'utf8');
  const faqContent = fs.readFileSync(faqPath, 'utf8');
  const ctaContent = fs.readFileSync(ctaPath, 'utf8');

  // 1. Check <main> landmark
  console.log('1. Checking page landmark <main>...');
  if (!pageContent.includes('<main') || !pageContent.includes('</main>')) {
    throw new Error('ImageEditingPage.tsx is missing <main> landmark.');
  }
  const mainMatches = pageContent.match(/<main/g) || [];
  if (mainMatches.length !== 1) {
    throw new Error(`ImageEditingPage.tsx must have exactly one <main> landmark, found ${mainMatches.length}`);
  }
  console.log('  ✓ Page has exactly one <main> landmark.');

  // 2. Check single H1 on the page
  console.log('2. Checking H1 count across page components...');
  const heroH1Matches = heroContent.match(/<h1|<motion\.h1/g) || [];
  if (heroH1Matches.length !== 1) {
    throw new Error(`EditingHero.tsx must have exactly one H1, found ${heroH1Matches.length}`);
  }

  // Ensure no other component renders an H1
  const otherComponents = [
    { name: 'EditingSteps', content: stepsContent },
    { name: 'EditingFeatures', content: featuresContent },
    { name: 'EditingFAQ', content: faqContent },
    { name: 'CTA', content: ctaContent },
    { name: 'ImageEditingPage', content: pageContent }
  ];

  for (const comp of otherComponents) {
    const compH1Matches = comp.content.match(/<h1|<motion\.h1/g) || [];
    if (compH1Matches.length > 0) {
      throw new Error(`${comp.name} unexpectedly contains an H1 tag. Only EditingHero should contain the single H1.`);
    }
  }
  console.log('  ✓ Exactly one meaningful H1 found across the entire page (in EditingHero).');

  // 3. Check <header> landmarks
  console.log('3. Checking <header> landmarks...');
  if (!heroContent.includes('<header') || !heroContent.includes('</header>')) {
    throw new Error('EditingHero.tsx is missing <header> element for hero title and intro.');
  }
  if (!stepsContent.includes('<header') || !stepsContent.includes('</header>')) {
    throw new Error('EditingSteps.tsx is missing <header> element.');
  }
  if (!featuresContent.includes('<header') || !featuresContent.includes('</header>')) {
    throw new Error('EditingFeatures.tsx is missing <header> element.');
  }
  if (!faqContent.includes('<header') || !faqContent.includes('</header>')) {
    throw new Error('EditingFAQ.tsx is missing <header> element.');
  }
  console.log('  ✓ Section and hero headers use semantic <header> elements.');

  // 4. Check <section> wrappers for major content areas
  console.log('4. Checking <section> usage across components...');
  if (!heroContent.includes('<section') || !heroContent.includes('</section>')) {
    throw new Error('EditingHero.tsx must be enclosed in a <section>.');
  }
  if (!stepsContent.includes('<section') || !stepsContent.includes('</section>')) {
    throw new Error('EditingSteps.tsx must be enclosed in a <section>.');
  }
  if (!featuresContent.includes('<section') || !featuresContent.includes('</section>')) {
    throw new Error('EditingFeatures.tsx must be enclosed in a <section>.');
  }
  if (!faqContent.includes('<section') || !faqContent.includes('</section>')) {
    throw new Error('EditingFAQ.tsx must be enclosed in a <section>.');
  }
  if (!ctaContent.includes('<section') || !ctaContent.includes('</section>')) {
    throw new Error('CTA.tsx must be enclosed in a <section>.');
  }
  console.log('  ✓ Major content areas use semantic <section> landmarks.');

  // 5. Check sequential steps use <ol> and <li>
  console.log('5. Checking <ol> / <li> for sequential steps in EditingSteps...');
  if (!stepsContent.includes('<ol') || !stepsContent.includes('</ol>')) {
    throw new Error('EditingSteps.tsx must use an ordered list <ol> for sequential steps.');
  }
  if (!stepsContent.includes('<motion.li') && !stepsContent.includes('<li')) {
    throw new Error('EditingSteps.tsx must use <li> elements for steps.');
  }
  console.log('  ✓ Sequential workflow steps use ordered list semantics.');

  // 6. Check <article> for standalone feature cards
  console.log('6. Checking <article> for standalone cards...');
  if (!featuresContent.includes('<article') && !featuresContent.includes('<motion.article')) {
    throw new Error('EditingFeatures.tsx must use <article> elements for feature cards.');
  }
  console.log('  ✓ Standalone cards use <article> semantics.');

  // 7. Check <figure> and <figcaption> for visual media
  console.log('7. Checking <figure> and <figcaption> for visual media...');
  if (!heroContent.includes('<figure') || !heroContent.includes('<figcaption')) {
    throw new Error('EditingHero.tsx must use <figure> and <figcaption> for visual preview frame.');
  }
  console.log('  ✓ Visual media elements wrapped in <figure> with <figcaption>.');

  // 8. Check FAQ structure (<dl>, <dt>, <dd>)
  console.log('8. Checking FAQ definition list structure...');
  if (!faqContent.includes('<dl') || !faqContent.includes('<dt') || !faqContent.includes('<dd')) {
    throw new Error('EditingFAQ.tsx must use <dl>, <dt>, and <dd> semantics.');
  }
  console.log('  ✓ FAQ uses semantic <dl>, <dt>, and <dd> definition list structure.');

  console.log('\nAll Image Editing semantic checks passed successfully!');
}

runTest();
