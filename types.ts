import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

export interface PricingTier {
  name: string;
  price: number; // in Luma tokens
  features: string[];
  isPopular?: boolean;
  cta: string;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  points: string[];
  imageBefore: string;
  imageAfter: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  category: string;
}