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
import PricingPage from './pages/PricingPage';
import SecurityPage from './pages/SecurityPage';

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
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/security" element={<SecurityPage />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;