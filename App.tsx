
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
    <HashRouter>
      <div className="min-h-screen bg-background text-white selection:bg-luma-pink selection:text-white">
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

          {/* Docs & Tutorials Route */}
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
