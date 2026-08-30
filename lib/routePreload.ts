// Reusable loader functions for route-level code splitting and intent-based preloading
export const loadServiceDetailPage = () => import('../pages/ServiceDetailPage');
export const loadSolutionsPage = () => import('../pages/SolutionsPage');
export const loadAllServicesPage = () => import('../pages/AllServicesPage');
export const loadPricingPage = () => import('../pages/PricingPage');
export const loadSecurityPage = () => import('../pages/SecurityPage');
export const loadImageEditingPage = () => import('../pages/ImageEditingPage');
export const loadImageGenerationPage = () => import('../pages/ImageGenerationPage');
export const loadBgRemovePage = () => import('../pages/BgRemovePage');
export const loadSmartAssistantPage = () => import('../pages/SmartAssistantPage');
export const loadUpscalePage = () => import('../pages/UpscalePage');
export const loadSmartChatPage = () => import('../pages/SmartChatPage');
export const loadVideoGenerationPage = () => import('../pages/VideoGenerationPage');
export const loadVirtualTryOnPage = () => import('../pages/VirtualTryOnPage');
export const loadGalleryPage = () => import('../pages/GalleryPage');
export const loadDocsPage = () => import('../pages/DocsPage');
export const loadTutorialsPage = () => import('../pages/TutorialsPage');
export const loadBlogPage = () => import('../pages/BlogPage');
export const loadBlogPostPage = () => import('../pages/BlogPostPage');
export const loadAboutPage = () => import('../pages/AboutPage');
export const loadContactPage = () => import('../pages/ContactPage');
export const loadPrivacyPage = () => import('../pages/PrivacyPage');
export const loadTermsPage = () => import('../pages/TermsPage');
export const loadSubscriptionPage = () => import('../pages/SubscriptionPage');
export const loadWorkflowPage = () => import('../pages/WorkflowPage');
export const loadTextToSpeechPage = () => import('../pages/TextToSpeechPage');
export const loadVideoEnhancementPage = () => import('../pages/VideoEnhancementPage');

// Registry of preloaded routes to avoid duplicate execution
const preloadedRoutes = new Set<string>();

const routeMap: Record<string, () => Promise<any>> = {
  '/solutions': loadSolutionsPage,
  '/services': loadAllServicesPage,
  '/pricing': loadPricingPage,
  '/subscription': loadSubscriptionPage,
  '/security': loadSecurityPage,
  '/gallery': loadGalleryPage,
  '/docs': loadDocsPage,
  '/tutorials': loadTutorialsPage,
  '/blog': loadBlogPage,
  '/about': loadAboutPage,
  '/contact': loadContactPage,
  '/privacy': loadPrivacyPage,
  '/terms': loadTermsPage,
  '/service/img-edit': loadImageEditingPage,
  '/service/img-gen': loadImageGenerationPage,
  '/service/bg-remove': loadBgRemovePage,
  '/service/assistant': loadSmartAssistantPage,
  '/service/upscale': loadUpscalePage,
  '/service/chat': loadSmartChatPage,
  '/service/video': loadVideoGenerationPage,
  '/service/video-enhancement': loadVideoEnhancementPage,
  '/service/text-to-speech': loadTextToSpeechPage,
  '/service/try-on': loadVirtualTryOnPage,
  '/service/workflow': loadWorkflowPage,
};

/**
 * Normalizes any route path or anchor string into a clean route path.
 */
export function normalizePath(rawPath?: string): string {
  if (!rawPath) return '';
  if (
    rawPath.startsWith('http://') ||
    rawPath.startsWith('https://') ||
    rawPath.startsWith('//') ||
    rawPath.startsWith('mailto:') ||
    rawPath.startsWith('tel:')
  ) {
    return '';
  }
  let path = rawPath;
  if (path.startsWith('/#')) {
    path = path.slice(2);
    if (!path.startsWith('/')) path = '/' + path;
  }
  if (path.startsWith('#/')) {
    path = path.slice(1);
  } else if (path.startsWith('#')) {
    return '';
  }
  path = path.split('?')[0].split('#')[0];
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return path;
}

/**
 * Preloads the chunk for a destination route on user intent.
 * Safe against duplicate triggers and safe on failures.
 */
export function preloadRoute(path?: string): void {
  if (!path) return;
  const cleanPath = normalizePath(path);
  if (!cleanPath || cleanPath === '/') return;

  if (preloadedRoutes.has(cleanPath)) return;

  let loader = routeMap[cleanPath];

  if (!loader) {
    if (cleanPath.startsWith('/blog/')) {
      loader = loadBlogPostPage;
    } else if (cleanPath.startsWith('/service/')) {
      loader = loadServiceDetailPage;
    }
  }

  if (loader) {
    preloadedRoutes.add(cleanPath);
    loader().catch(() => {
      // Allow retry if speculative preload failed
      preloadedRoutes.delete(cleanPath);
    });
  }
}

/**
 * Returns event handlers for desktop hover, focus, and touch intent.
 */
export function getPreloadHandlers(path?: string) {
  if (!path) return {};
  const cleanPath = normalizePath(path);
  if (!cleanPath || cleanPath === '/') return {};

  const trigger = () => preloadRoute(cleanPath);

  return {
    onMouseEnter: trigger,
    onFocus: trigger,
    onTouchStart: trigger,
  };
}
