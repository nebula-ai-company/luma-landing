import { useState, useEffect, useRef, RefObject } from 'react';

export interface UseSectionVisibilityOptions<T extends HTMLElement = HTMLDivElement> {
  rootMargin?: string;
  threshold?: number | number[];
  externalRef?: RefObject<T | null>;
}

export interface UseSectionVisibilityResult<T extends HTMLElement = HTMLDivElement> {
  ref: RefObject<T | null>;
  targetRef: RefObject<T | null>;
  isSectionVisible: boolean;
  isPageVisible: boolean;
  prefersReducedMotion: boolean;
  shouldAnimate: boolean;
}

/**
 * Custom hook to detect section visibility in viewport, browser tab active state,
 * and reduced-motion preferences to pause expensive animations when not visible.
 */
export function useSectionVisibility<T extends HTMLElement = HTMLDivElement>(
  options: UseSectionVisibilityOptions<T> = {}
): UseSectionVisibilityResult<T> {
  const { rootMargin = '200px 0px', threshold = 0, externalRef } = options;
  const internalRef = useRef<T>(null);
  const targetRef = externalRef || internalRef;

  // Default to true so SSR or initial render displays element correctly
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(true);
  const [isPageVisible, setIsPageVisible] = useState<boolean>(() => {
    return typeof document !== 'undefined' ? document.visibilityState === 'visible' : true;
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // 1. IntersectionObserver for viewport proximity
  useEffect(() => {
    const element = targetRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [targetRef, rootMargin, threshold]);

  // 2. Tab visibility listener (document.visibilityState)
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 3. Prefers-reduced-motion listener
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      // Compatibility for older Safari
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const shouldAnimate = isSectionVisible && isPageVisible && !prefersReducedMotion;

  return {
    ref: targetRef,
    targetRef,
    isSectionVisible,
    isPageVisible,
    prefersReducedMotion,
    shouldAnimate,
  };
}

export const useInViewportAnimation = useSectionVisibility;
