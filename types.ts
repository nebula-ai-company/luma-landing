
import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  badge?: string;
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
  type: 'image' | 'video' | 'comparison' | 'vton';
  imageUrl: string;
  videoUrl?: string | null; 
  thumbnailUrlBefore?: string | null; // Added for comparisons (Edit/Upscale)
  clothingImageUrl?: string | null;   // Added for VTON
  title: string;
  prompt: string;
  category: string;
  model: string;
  date: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  dimensions: string;
}
