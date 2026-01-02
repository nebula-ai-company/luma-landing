
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import { ServiceHero } from '../components/Services/Detail/ServiceHero';
import { HowItWorks } from '../components/Services/Detail/HowItWorks';
import { ServiceFeatures } from '../components/Services/Detail/ServiceFeatures';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="text-2xl text-white">سرویس یافت نشد</h1>
            <Button onClick={() => navigate('/')} variant="secondary">بازگشت به خانه</Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb - Pushed down to clear fixed navbar */}
      <div className="pt-24 max-w-screen-2xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-white">خانه</Link>
        <ChevronRight size={16} className="rotate-180" />
        <span className="text-white">{service.title}</span>
      </div>

      <ServiceHero service={service} />
      <HowItWorks />
      <ServiceFeatures />
    </div>
  );
};

export default ServiceDetailPage;
