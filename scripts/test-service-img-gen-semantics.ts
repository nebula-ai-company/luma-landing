import fs from 'node:fs';
import path from 'node:path';

function runTest() {
  const root = process.cwd();
  const pagePath = path.join(root, 'pages', 'ImageGenerationPage.tsx');
  const heroPath = path.join(root, 'components', 'Services', 'ImageGeneration', 'GenHero.tsx');
  const animPath = path.join(root, 'components', 'Services', 'ImageGeneration', 'GenHeroAnim.tsx');
  const stepsPath = path.join(root, 'components', 'Services', 'ImageGeneration', 'GenSteps.tsx');
  const featuresPath = path.join(root, 'components', 'Services', 'ImageGeneration', 'GenFeatures.tsx');
  const faqPath = path.join(root, 'components', 'Services', 'ImageGeneration', 'GenFAQ.tsx');
  const ctaPath = path.join(root, 'components', 'CTA.tsx');

  console.log('Testing Image Generation Service (/service/img-gen) Semantic HTML and AEO Structure...\n');

  const files = [pagePath, heroPath, animPath, stepsPath, featuresPath, faqPath, ctaPath];
  for (const f of files) {
    if (!fs.existsSync(f)) {
      throw new Error(`File not found: ${f}`);
    }
  }

  const pageContent = fs.readFileSync(pagePath, 'utf8');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  const animContent = fs.readFileSync(animPath, 'utf8');
  const stepsContent = fs.readFileSync(stepsPath, 'utf8');
  const featuresContent = fs.readFileSync(featuresPath, 'utf8');
  const faqContent = fs.readFileSync(faqPath, 'utf8');
  const ctaContent = fs.readFileSync(ctaPath, 'utf8');

  // 1. Check <main> landmark
  console.log('1. Checking page landmark <main>...');
  if (!pageContent.includes('<main') || !pageContent.includes('</main>')) {
    throw new Error('ImageGenerationPage.tsx is missing <main> landmark.');
  }
  const mainMatches = pageContent.match(/<main/g) || [];
  if (mainMatches.length !== 1) {
    throw new Error(`ImageGenerationPage.tsx must have exactly one <main> landmark, found ${mainMatches.length}`);
  }
  console.log('  ✓ Page has exactly one <main> landmark.');

  // 2. Check single H1 on the page
  console.log('2. Checking H1 count across page components...');
  const heroH1Matches = heroContent.match(/<h1|<motion\.h1/g) || [];
  if (heroH1Matches.length !== 1) {
    throw new Error(`GenHero.tsx must have exactly one H1, found ${heroH1Matches.length}`);
  }

  // Ensure no other component renders an H1
  const otherComponents = [
    { name: 'GenHeroAnim', content: animContent },
    { name: 'GenSteps', content: stepsContent },
    { name: 'GenFeatures', content: featuresContent },
    { name: 'GenFAQ', content: faqContent },
    { name: 'CTA', content: ctaContent },
    { name: 'ImageGenerationPage', content: pageContent }
  ];

  for (const comp of otherComponents) {
    const compH1Matches = comp.content.match(/<h1|<motion\.h1/g) || [];
    if (compH1Matches.length > 0) {
      throw new Error(`${comp.name} unexpectedly contains an H1 tag. Only GenHero should contain the single H1.`);
    }
  }
  console.log('  ✓ Exactly one meaningful H1 found across the entire page (in GenHero).');

  // 3. Check <header> for hero content
  console.log('3. Checking <header> landmark in hero...');
  if (!heroContent.includes('<header>') || !heroContent.includes('</header>')) {
    throw new Error('GenHero.tsx is missing <header> element for hero title and intro.');
  }
  console.log('  ✓ Hero introductory content is wrapped in <header>.');

  // 4. Check <section> wrappers for major content areas
  console.log('4. Checking <section> usage across components...');
  if (!heroContent.includes('<section') || !heroContent.includes('</section>')) {
    throw new Error('GenHero.tsx must be enclosed in a <section>.');
  }
  if (!stepsContent.includes('<section') || !stepsContent.includes('</section>')) {
    throw new Error('GenSteps.tsx must be enclosed in a <section>.');
  }
  if (!featuresContent.includes('<section') || !featuresContent.includes('</section>')) {
    throw new Error('GenFeatures.tsx must use <section> for major feature sections.');
  }
  if (!faqContent.includes('<section') || !faqContent.includes('</section>')) {
    throw new Error('GenFAQ.tsx must be enclosed in a <section>.');
  }
  if (!ctaContent.includes('<section') || !ctaContent.includes('</section>')) {
    throw new Error('CTA.tsx must be enclosed in a <section>.');
  }
  console.log('  ✓ Major content areas use semantic <section> landmarks.');

  // 5. Check sequential steps use <ol> and <li>
  console.log('5. Checking <ol> / <li> for sequential steps in GenSteps...');
  if (!stepsContent.includes('<ol') || !stepsContent.includes('</ol>')) {
    throw new Error('GenSteps.tsx must use an ordered list <ol> for sequential steps.');
  }
  if (!stepsContent.includes('<motion.li') && !stepsContent.includes('<li')) {
    throw new Error('GenSteps.tsx must use <li> elements for steps.');
  }
  console.log('  ✓ Sequential steps are structured with <ol> and <li>.');

  // 6. Check lists for features and models
  console.log('6. Checking <ul> / <li> for lists in GenHero and GenFeatures...');
  if (!heroContent.includes('<ul') || !heroContent.includes('</ul>')) {
    throw new Error('GenHero.tsx must use <ul> for key features list.');
  }
  if (!featuresContent.includes('<ul') || !featuresContent.includes('</ul>')) {
    throw new Error('GenFeatures.tsx must use <ul> for compact models list.');
  }
  console.log('  ✓ Features and models lists use semantic <ul>.');

  // 7. Check <article> for standalone model feature cards
  console.log('7. Checking <article> for standalone model cards...');
  if (!featuresContent.includes('<motion.article') && !featuresContent.includes('<article')) {
    throw new Error('GenFeatures.tsx must use <article> for standalone featured model cards.');
  }
  console.log('  ✓ Model cards use semantic <article> tags.');

  // 8. Check <figure> and <figcaption> for visual demonstrations and styles gallery
  console.log('8. Checking <figure> and <figcaption> for visual examples...');
  if ((!animContent.includes('<figure') && !animContent.includes('<motion.figure')) || (!animContent.includes('</figure>') && !animContent.includes('</motion.figure>'))) {
    throw new Error('GenHeroAnim.tsx must use <figure> for the generated image result.');
  }
  if ((!animContent.includes('<figcaption') && !animContent.includes('<motion.figcaption')) || (!animContent.includes('</figcaption>') && !animContent.includes('</motion.figcaption>'))) {
    throw new Error('GenHeroAnim.tsx must include <figcaption> describing the generated result.');
  }
  if ((!featuresContent.includes('<motion.figure') && !featuresContent.includes('<figure')) || (!featuresContent.includes('</motion.figure>') && !featuresContent.includes('</figure>'))) {
    throw new Error('GenFeatures.tsx must use <figure> for style gallery cards.');
  }
  if (!featuresContent.includes('<figcaption') || !featuresContent.includes('</figcaption>')) {
    throw new Error('GenFeatures.tsx must include <figcaption> for style gallery cards.');
  }
  console.log('  ✓ Visual examples and styles gallery use <figure> and <figcaption>.');

  // 9. Check image alt attributes are meaningful
  console.log('9. Checking image alt text quality...');
  const emptyAltRegex = /alt=["']\s*["']/;
  if (emptyAltRegex.test(animContent)) {
    throw new Error('GenHeroAnim.tsx contains empty alt text.');
  }
  if (emptyAltRegex.test(featuresContent)) {
    throw new Error('GenFeatures.tsx contains empty alt text.');
  }
  if (!featuresContent.includes('alt={`نمونه تصویر سبک ${style.faName}')) {
    throw new Error('GenFeatures.tsx should have descriptive alt text for style posters.');
  }
  console.log('  ✓ All images have descriptive, non-empty alt text.');

  // 10. Check accessibility attributes (aria-label, aria-expanded, aria-controls, aria-hidden)
  console.log('10. Checking accessibility attributes...');
  if (!faqContent.includes('aria-expanded')) {
    throw new Error('GenFAQ.tsx accordion buttons must include aria-expanded.');
  }
  if (!faqContent.includes('aria-controls')) {
    throw new Error('GenFAQ.tsx accordion buttons must include aria-controls.');
  }
  if (!faqContent.includes('role="region"')) {
    throw new Error('GenFAQ.tsx accordion panels must include role="region".');
  }
  if (!featuresContent.includes('aria-label=')) {
    throw new Error('GenFeatures.tsx sections and buttons should include aria-labels.');
  }
  console.log('  ✓ Interactive and expandable controls have appropriate ARIA attributes.');

  // 11. Check no hidden SEO text or keyword stuffing
  console.log('11. Checking for hidden SEO text...');
  const hiddenTextPatterns = [
    /display:\s*none/i,
    /visibility:\s*hidden/i,
    /opacity-0\s+absolute/i,
    /sr-only/i
  ];
  // Verify we did not add hidden spam sections in the target files
  if (pageContent.includes('sr-only') || heroContent.includes('sr-only') || featuresContent.includes('sr-only')) {
    throw new Error('Found sr-only in image generation components. Hidden text should not be added.');
  }
  console.log('  ✓ No hidden SEO text or keyword stuffing found.');

  console.log('\nAll Image Generation semantic HTML and AEO tests passed successfully!\n');
}

runTest();
