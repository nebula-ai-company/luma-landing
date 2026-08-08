
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

// Lazy-loaded Below-The-Fold Homepage Sections
const Solutions = lazy(() => import('./components/Solutions'));
const Gallery = lazy(() => import('./components/Gallery'));
const Features = lazy(() => import('./components/Features'));
const Testimonials = lazy(() => import('./components/Testimonials'));

// Route-level Code Splitting for Pages
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const AllServicesPage = lazy(() => import('./pages/AllServicesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const ImageEditingPage = lazy(() => import('./pages/ImageEditingPage'));
const ImageGenerationPage = lazy(() => import('./pages/ImageGenerationPage'));
const BgRemovePage = lazy(() => import('./pages/BgRemovePage'));
const SmartAssistantPage = lazy(() => import('./pages/SmartAssistantPage'));
const UpscalePage = lazy(() => import('./pages/UpscalePage'));
const SmartChatPage = lazy(() => import('./pages/SmartChatPage'));
const VideoGenerationPage = lazy(() => import('./pages/VideoGenerationPage'));
const VirtualTryOnPage = lazy(() => import('./pages/VirtualTryOnPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const TutorialsPage = lazy(() => import('./pages/TutorialsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const SubscriptionPage = lazy(() => import('./pages/SubscriptionPage'));
const WorkflowPage = lazy(() => import('./pages/WorkflowPage'));
const TextToSpeechPage = lazy(() => import('./pages/TextToSpeechPage'));

const LandingPage: React.FC = () => (
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

const PageFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-[#FAFAFA] dark:bg-background text-zinc-900 dark:text-white transition-colors duration-300">
    <div className="w-8 h-8 border-2 border-zinc-300 dark:border-white/10 border-t-zinc-700 dark:border-t-white/60 rounded-full animate-spin" />
  </div>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-background text-zinc-900 dark:text-white selection:bg-luma-pink selection:text-white transition-colors duration-300">
          <Navbar />
          <Suspense fallback={<PageFallback />}>
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
          </Suspense>
          <Footer />
          <ScrollToTopButton />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
