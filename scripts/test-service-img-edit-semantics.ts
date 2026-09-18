import fs from 'node:fs';
import path from 'node:path';

function runTest() {
  const root = process.cwd();
  const pagePath = path.join(root, 'pages', 'ImageEditingPage.tsx');
  const heroPath = path.join(root, 'components', 'Services', 'ImageEditing', 'EditingHero.tsx');
  const animPath = path.join(root, 'components', 'Services', 'ImageEditing', 'EditingHeroAnim.tsx');
  const stepsPath = path.join(root, 'components', 'Services', 'ImageEditing', 'EditingSteps.tsx');
  const featuresPath = path.join(root, 'components', 'Services', 'ImageEditing', 'EditingFeatures.tsx');
  const faqPath = path.join(root, 'components', 'Services', 'ImageEditing', 'EditingFAQ.tsx');
  const ctaPath = path.join(root, 'components', 'CTA.tsx');

  console.log('Testing Image Editing Service (/service/img-edit) Semantic HTML and AEO Structure...\n');

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
    { name: 'EditingHeroAnim', content: animContent },
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
    throw new Error('EditingSteps.tsx is missing <header> element for section title.');
  }
  if (!featuresContent.includes('<header') || !featuresContent.includes('</header>')) {
    throw new Error('EditingFeatures.tsx is missing <header> element for section title.');
  }
  if (!faqContent.includes('<header') || !faqContent.includes('</header>')) {
    throw new Error('EditingFAQ.tsx is missing <header> element for section title.');
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
  console.log('  ✓ Sequential steps are structured with <ol> and <li>.');

  // 6. Check lists for features and FAQs
  console.log('6. Checking <ul> / <li> for lists in EditingHero, EditingFeatures, and EditingFAQ...');
  if (!heroContent.includes('<ul') || !heroContent.includes('</ul>')) {
    throw new Error('EditingHero.tsx must use <ul> for key features list.');
  }
  if (!featuresContent.includes('<ul') || !featuresContent.includes('</ul>')) {
    throw new Error('EditingFeatures.tsx must use <ul> for models or features grid.');
  }
  if (!faqContent.includes('<ul') || !faqContent.includes('</ul>')) {
    throw new Error('EditingFAQ.tsx must use <ul> for FAQ items.');
  }
  console.log('  ✓ Non-sequential items use semantic <ul> and <li>.');

  // 7. Check <article> for standalone cards
  console.log('7. Checking <article> for standalone cards...');
  if (!heroContent.includes('<article') || !heroContent.includes('</article>')) {
    throw new Error('EditingHero.tsx must use <article> for hero feature cards.');
  }
  if (!stepsContent.includes('<article') || !stepsContent.includes('</article>')) {
    throw new Error('EditingSteps.tsx must use <article> for step cards.');
  }
  if (!featuresContent.includes('<article') || !featuresContent.includes('</article>')) {
    throw new Error('EditingFeatures.tsx must use <article> for feature blocks or cards.');
  }
  if (!faqContent.includes('<article') || !faqContent.includes('</article>')) {
    throw new Error('EditingFAQ.tsx must use <article> for FAQ item cards.');
  }
  console.log('  ✓ Feature, step, and FAQ cards use semantic <article> tags.');

  // 8. Check <figure> and <figcaption> for visual demonstrations
  console.log('8. Checking <figure> and <figcaption> for visual demonstrations...');
  if (!animContent.match(/<figure|<motion\.figure/) || !animContent.match(/<\/figure>|<\/motion\.figure>/)) {
    throw new Error('EditingHeroAnim.tsx must use <figure> for image previews.');
  }
  if (!animContent.match(/<figcaption|<motion\.figcaption/) || !animContent.match(/<\/figcaption>|<\/motion\.figcaption>/)) {
    throw new Error('EditingHeroAnim.tsx must include <figcaption> describing image editing results.');
  }
  if (!featuresContent.includes('<figure') || !featuresContent.includes('</figure>')) {
    throw new Error('EditingFeatures.tsx must use <figure> for visual previews.');
  }
  console.log('  ✓ Visual demonstrations use <figure> and <figcaption>.');

  // 9. Check image alt attributes are meaningful
  console.log('9. Checking image alt text quality...');
  const emptyAltRegex = /alt=["']\s*["']/;
  if (emptyAltRegex.test(animContent)) {
    throw new Error('EditingHeroAnim.tsx contains empty alt text.');
  }
  if (emptyAltRegex.test(featuresContent)) {
    throw new Error('EditingFeatures.tsx contains empty alt text.');
  }
  console.log('  ✓ All images have descriptive, non-empty alt text.');

  // 10. Check accessibility attributes (aria-label, aria-expanded, aria-controls, aria-hidden)
  console.log('10. Checking accessibility attributes...');
  if (!faqContent.includes('aria-expanded')) {
    throw new Error('EditingFAQ.tsx accordion buttons must include aria-expanded.');
  }
  if (!faqContent.includes('aria-controls')) {
    throw new Error('EditingFAQ.tsx accordion buttons must include aria-controls.');
  }
  if (!faqContent.includes('role="region"')) {
    throw new Error('EditingFAQ.tsx accordion panels must include role="region".');
  }
  if (!animContent.includes('aria-expanded')) {
    throw new Error('EditingHeroAnim.tsx model selector must include aria-expanded.');
  }
  console.log('  ✓ Interactive controls have appropriate ARIA attributes.');

  // 11. Check no hidden SEO text or keyword stuffing
  console.log('11. Checking for hidden SEO text...');
  if (pageContent.includes('sr-only') || heroContent.includes('sr-only') || featuresContent.includes('sr-only')) {
    throw new Error('Found sr-only in image editing components. Hidden text should not be added.');
  }
  console.log('  ✓ No hidden SEO text or keyword stuffing found.');

  console.log('\nAll Image Editing semantic HTML and AEO tests passed successfully!\n');
}

runTest();
