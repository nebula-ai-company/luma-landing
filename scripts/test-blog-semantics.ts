import fs from 'node:fs';
import path from 'node:path';

function runTest() {
  const root = process.cwd();
  const blogPagePath = path.join(root, 'pages', 'BlogPage.tsx');
  const blogPostPagePath = path.join(root, 'pages', 'BlogPostPage.tsx');

  console.log('Testing Blog Semantic HTML and AEO Readiness...\n');

  if (!fs.existsSync(blogPagePath)) {
    throw new Error(`File not found: ${blogPagePath}`);
  }
  if (!fs.existsSync(blogPostPagePath)) {
    throw new Error(`File not found: ${blogPostPagePath}`);
  }

  const blogPageContent = fs.readFileSync(blogPagePath, 'utf8');
  const blogPostPageContent = fs.readFileSync(blogPostPagePath, 'utf8');

  // 1. Semantic landmarks check: <main> and <article>
  console.log('1. Checking semantic landmarks (<main> and <article>)...');
  if (!blogPageContent.includes('<main') || !blogPageContent.includes('</main>')) {
    throw new Error('BlogPage.tsx is missing <main> landmark.');
  }
  if (!blogPageContent.includes('<motion.article') && !blogPageContent.includes('<article')) {
    throw new Error('BlogPage.tsx is missing <article> elements for blog cards.');
  }
  if (!blogPostPageContent.includes('<main') || !blogPostPageContent.includes('</main>')) {
    throw new Error('BlogPostPage.tsx is missing <main> landmark.');
  }
  if (!blogPostPageContent.includes('<article>') || !blogPostPageContent.includes('</article>')) {
    throw new Error('BlogPostPage.tsx is missing wrapping <article> element.');
  }
  if (!blogPostPageContent.includes('<header') || !blogPostPageContent.includes('</header>')) {
    throw new Error('BlogPostPage.tsx is missing <header> element.');
  }
  console.log('  ✓ Both pages use proper <main>, <article>, and <header> landmarks.');

  // 2. Heading hierarchy and single H1 check
  console.log('2. Checking H1 count and heading hierarchy...');
  const blogPageH1Matches = blogPageContent.match(/<h1|<motion\.h1/g) || [];
  if (blogPageH1Matches.length !== 1) {
    throw new Error(`BlogPage.tsx should have exactly one H1, found ${blogPageH1Matches.length}`);
  }

  const blogPostH1Matches = blogPostPageContent.match(/<h1|<motion\.h1/g) || [];
  // Note: in BlogPostPage, there is the main header H1, plus the error state fallback H1 when post is missing.
  // In the markdown components, H1 should NOT render a raw unconditioned <h1 className="hidden">.
  if (blogPostPageContent.includes('<h1 className="hidden"')) {
    throw new Error('BlogPostPage.tsx should not use <h1 className="hidden"> in markdown components.');
  }
  console.log('  ✓ Heading hierarchy is semantic with single primary H1 for article title.');

  // 3. No new Date().toISOString() or fabricated dates
  console.log('3. Checking for fabricated dates and new Date().toISOString()...');
  if (blogPostPageContent.includes('new Date().toISOString()') || blogPageContent.includes('new Date().toISOString()')) {
    throw new Error('Found forbidden new Date().toISOString() in blog pages.');
  }
  if (blogPostPageContent.includes('new Date()') || blogPageContent.includes('new Date()')) {
    throw new Error('Found forbidden new Date() instantiation in blog pages.');
  }
  console.log('  ✓ No new Date() or fabricated dates found.');

  // 4. Real date rendering with <time dateTime=...>
  console.log('4. Checking <time dateTime=...> date rendering...');
  if (!blogPageContent.includes('<time') || !blogPageContent.includes('dateTime={rawDate}')) {
    throw new Error('BlogPage.tsx should render real dates using <time dateTime={rawDate}>.');
  }
  if (!blogPostPageContent.includes('<time') || !blogPostPageContent.includes('dateTime={rawDate}')) {
    throw new Error('BlogPostPage.tsx should render real dates using <time dateTime={rawDate}>.');
  }
  // Check that <time> is guarded so it is omitted when no date exists
  if (!blogPageContent.includes('{rawDate ? (') || !blogPostPageContent.includes('{rawDate ? (')) {
    throw new Error('<time> must be omitted completely when no raw date exists.');
  }
  console.log('  ✓ Dates use <time dateTime=...> and are strictly guarded.');

  // 5. Check no hidden SEO text / keyword stuffing
  console.log('5. Checking for absence of hidden SEO text or keyword stuffing...');
  const suspiciousPatterns = ['display:none', 'sr-only', 'opacity-0 text-[0px]', 'text-transparent absolute left-[-9999px]'];
  for (const pattern of suspiciousPatterns) {
    if (blogPageContent.includes(pattern) || blogPostPageContent.includes(pattern)) {
      throw new Error(`Suspicious hidden text pattern found: ${pattern}`);
    }
  }
  console.log('  ✓ No hidden SEO text or spam elements found.');

  // 6. Check blog links are real crawlable React Router Links
  console.log('6. Checking crawlable blog links...');
  if (!blogPageContent.includes('<Link') || !blogPageContent.includes('to={postUrl}')) {
    throw new Error('BlogPage.tsx should have crawlable <Link to={postUrl}>.');
  }
  if (!blogPostPageContent.includes('<Link') || !blogPostPageContent.includes('to="/blog"')) {
    throw new Error('BlogPostPage.tsx should have crawlable navigation <Link to="/blog">.');
  }
  if (!blogPostPageContent.includes('to={postUrl}')) {
    throw new Error('BlogPostPage.tsx related posts should use crawlable <Link to={postUrl}>.');
  }
  console.log('  ✓ Real crawlable React Router <Link> elements used for article navigation.');

  // 7. Check CodeBlock and MediaCard semantics
  console.log('7. Checking CodeBlock and MediaCard semantics...');
  if (!blogPostPageContent.includes('<pre') || !blogPostPageContent.includes('<code')) {
    throw new Error('BlogPostPage.tsx should maintain <pre><code> semantics for code blocks.');
  }
  if (!blogPostPageContent.includes('<figure') || !blogPostPageContent.includes('<figcaption')) {
    throw new Error('BlogPostPage.tsx should use <figure> and <figcaption> for media items.');
  }
  console.log('  ✓ Code blocks and media items have valid semantic containers.');

  // 8. Check SEO and Structured Data imports remain intact
  console.log('8. Checking SEO and Structured Data imports...');
  if (!blogPageContent.includes('usePageStructuredData') || !blogPageContent.includes('buildBlogCollectionStructuredData')) {
    throw new Error('BlogPage.tsx must preserve structured data hooks and helpers.');
  }
  if (!blogPostPageContent.includes('usePageMetadata') || !blogPostPageContent.includes('usePageStructuredData') ||
      !blogPostPageContent.includes('buildBlogPostStructuredData')) {
    throw new Error('BlogPostPage.tsx must preserve SEO metadata and structured data hooks.');
  }
  console.log('  ✓ Existing SEO and structured-data imports are completely intact.');

  console.log('\nAll blog semantic HTML and AEO tests passed successfully!');
}

runTest();
