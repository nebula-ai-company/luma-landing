
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './lib/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Solutions from './components/Solutions';
import Gallery from './components/Gallery';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import ServiceDetailPage from './pages/ServiceDetailPage';
import SolutionsPage from './pages/SolutionsPage';
import PricingPage from './pages/PricingPage';
import SecurityPage from './pages/SecurityPage';
import ImageEditingPage from './pages/ImageEditingPage';
import ImageGenerationPage from './pages/ImageGenerationPage';
import BgRemovePage from './pages/BgRemovePage';
import SmartAssistantPage from './pages/SmartAssistantPage';
import UpscalePage from './pages/UpscalePage';
import SmartChatPage from './pages/SmartChatPage';
import VideoGenerationPage from './pages/VideoGenerationPage';
import VirtualTryOnPage from './pages/VirtualTryOnPage';
import GalleryPage from './pages/GalleryPage';
import DocsPage from './pages/DocsPage';
import TutorialsPage from './pages/TutorialsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ScrollToTop from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ScrollToTopButton';

const LandingPage: React.FC = () => (
  <>
    <Hero />
    <Services />
    <Solutions />
    <Gallery />
    <Features />
    <Testimonials />
    <CTA />
  </>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-background text-zinc-900 dark:text-white selection:bg-luma-pink selection:text-white transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            
            {/* Specific Routes for Main Services */}
            <Route path="/service/img-edit" element={<ImageEditingPage />} />
            <Route path="/service/img-gen" element={<ImageGenerationPage />} />
            <Route path="/service/bg-remove" element={<BgRemovePage />} />
            <Route path="/service/assistant" element={<SmartAssistantPage />} />
            <Route path="/service/upscale" element={<UpscalePage />} />
            <Route path="/service/chat" element={<SmartChatPage />} />
            <Route path="/service/video" element={<VideoGenerationPage />} />
            <Route path="/service/try-on" element={<VirtualTryOnPage />} />
            
            {/* Generic Route for other services */}
            <Route path="/service/:id" element={<ServiceDetailPage />} />
            
            <Route path="/pricing" element={<PricingPage />} />
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
          <ScrollToTopButton />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
