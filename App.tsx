
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './lib/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import CTA from './components/CTA';
import DeferredSection from './components/DeferredSection';
import ScrollToTop from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ScrollToTopButton';

// Lazy-loaded Below-The-Fold Homepage Sections with explicit loader functions for idle preloading
const loadSolutions = () => import('./components/Solutions');
const loadGallery = () => import('./components/Gallery');
const loadFeatures = () => import('./components/Features');
const loadTestimonials = () => import('./components/Testimonials');

const Solutions = lazy(loadSolutions);
const Gallery = lazy(loadGallery);
const Features = lazy(loadFeatures);
const Testimonials = lazy(loadTestimonials);

import {
  loadServiceDetailPage,
  loadSolutionsPage,
  loadAllServicesPage,
  loadPricingPage,
  loadSecurityPage,
  loadImageEditingPage,
  loadImageGenerationPage,
  loadBgRemovePage,
  loadSmartAssistantPage,
  loadUpscalePage,
  loadSmartChatPage,
  loadVideoGenerationPage,
  loadVirtualTryOnPage,
  loadGalleryPage,
  loadDocsPage,
  loadTutorialsPage,
  loadBlogPage,
  loadBlogPostPage,
  loadAboutPage,
  loadContactPage,
  loadPrivacyPage,
  loadTermsPage,
  loadSubscriptionPage,
  loadWorkflowPage,
  loadTextToSpeechPage,
  loadVideoEnhancementPage,
} from './lib/routePreload';

// Route-level Code Splitting for Pages using shared loader functions
const ServiceDetailPage = lazy(loadServiceDetailPage);
const SolutionsPage = lazy(loadSolutionsPage);
const AllServicesPage = lazy(loadAllServicesPage);
const PricingPage = lazy(loadPricingPage);
const SecurityPage = lazy(loadSecurityPage);
const ImageEditingPage = lazy(loadImageEditingPage);
const ImageGenerationPage = lazy(loadImageGenerationPage);
const BgRemovePage = lazy(loadBgRemovePage);
const SmartAssistantPage = lazy(loadSmartAssistantPage);
const UpscalePage = lazy(loadUpscalePage);
const SmartChatPage = lazy(loadSmartChatPage);
const VideoGenerationPage = lazy(loadVideoGenerationPage);
const VideoEnhancementPage = lazy(loadVideoEnhancementPage);
const VirtualTryOnPage = lazy(loadVirtualTryOnPage);
const GalleryPage = lazy(loadGalleryPage);
const DocsPage = lazy(loadDocsPage);
const TutorialsPage = lazy(loadTutorialsPage);
const BlogPage = lazy(loadBlogPage);
const BlogPostPage = lazy(loadBlogPostPage);
const AboutPage = lazy(loadAboutPage);
const ContactPage = lazy(loadContactPage);
const PrivacyPage = lazy(loadPrivacyPage);
const TermsPage = lazy(loadTermsPage);
const SubscriptionPage = lazy(loadSubscriptionPage);
const WorkflowPage = lazy(loadWorkflowPage);
const TextToSpeechPage = lazy(loadTextToSpeechPage);

const LandingPage: React.FC = () => {
  // Idle-time progressive preloading of homepage sections
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const loaders = [loadSolutions, loadGallery, loadFeatures, loadTestimonials];
    let index = 0;
    let timeoutId: number | null = null;
    let idleId: number | null = null;

    const scheduleNext = () => {
      if (index >= loaders.length) return;
      const loader = loaders[index++];

      const runLoader = () => {
        loader().catch(() => {});
        timeoutId = window.setTimeout(scheduleNext, 800);
      };

      if ('requestIdleCallback' in window) {
        idleId = (window as any).requestIdleCallback(runLoader, { timeout: 3000 });
      } else {
        timeoutId = window.setTimeout(runLoader, 1000);
      }
    };

    // Stagger preload after initial critical render settles
    timeoutId = window.setTimeout(scheduleNext, 1200);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (idleId && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <DeferredSection id="solutions" minHeight="800px" component={Solutions} />
      <DeferredSection id="gallery" minHeight="750px" component={Gallery} />
      <DeferredSection id="features" minHeight="850px" component={Features} />
      <DeferredSection id="testimonials" minHeight="600px" component={Testimonials} />
      <CTA />
    </>
  );
};

const PageFallback: React.FC = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-background text-zinc-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {show && (
        <div className="flex flex-col items-center justify-center relative z-10">
          {/* Subtle ambient glow */}
          <div className="absolute w-48 h-48 bg-luma-purple/10 dark:bg-luma-purple/15 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="w-8 h-8 border-2 border-zinc-300 dark:border-white/10 border-t-luma-purple dark:border-t-luma-purple rounded-full animate-spin" />
          <p className="mt-4 text-xs font-medium text-zinc-400 dark:text-zinc-500 tracking-wide select-none">
            در حال بارگذاری...
          </p>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-background text-zinc-900 dark:text-white selection:bg-luma-pink selection:text-white transition-colors duration-300">
          <Navbar />
          <Suspense fallback={<PageFallback />}>
            <>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/services" element={<AllServicesPage />} />
                
                {/* Specific Routes for Main Services */}
                <Route path="/service/img-edit" element={<ImageEditingPage />} />
                <Route path="/service/img-gen" element={<ImageGenerationPage />} />
                <Route path="/service/bg-remove" element={<BgRemovePage />} />
                <Route path="/service/assistant" element={<SmartAssistantPage />} />
                <Route path="/service/upscale" element={<UpscalePage />} />
                <Route path="/service/chat" element={<SmartChatPage />} />
                <Route path="/service/video" element={<VideoGenerationPage />} />
                <Route path="/service/video-enhancement" element={<VideoEnhancementPage />} />
                <Route path="/service/text-to-speech" element={<TextToSpeechPage />} />
                <Route path="/service/try-on" element={<VirtualTryOnPage />} />
                <Route path="/service/workflow" element={<WorkflowPage />} />
                
                {/* Generic Route for other services */}
                <Route path="/service/:id" element={<ServiceDetailPage />} />
                
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/security" element={<SecurityPage />} />
                
                {/* Gallery Route */}
                <Route path="/gallery" element={<GalleryPage />} />

                {/* Docs & Tutorials & Blog Route */}
                <Route path="/docs" element={<DocsPage />} />
                <Route path="/tutorials" element={<TutorialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />

                {/* Footer Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
              </Routes>
              <Footer />
            </>
          </Suspense>
          <ScrollToTopButton />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
