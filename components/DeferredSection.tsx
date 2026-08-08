import React, { useState, useEffect, useRef } from 'react';

interface DeferredSectionProps {
  id?: string;
  minHeight?: string | number;
  rootMargin?: string;
  component: React.ComponentType<any>;
  componentProps?: Record<string, any>;
  fallback?: React.ReactNode;
}

export const DeferredSection: React.FC<DeferredSectionProps> = ({
  id,
  minHeight = '600px',
  rootMargin = '800px 0px',
  component: Component,
  componentProps = {},
  fallback,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [hasLoaded, setHasLoaded] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    // Immediate load if anchor in URL matches section id
    if (id && window.location.hash.toLowerCase().includes(id.toLowerCase())) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (hasLoaded) return;

    const checkHashMatch = () => {
      if (id && window.location.hash.toLowerCase().includes(id.toLowerCase())) {
        setHasLoaded(true);
      }
    };

    checkHashMatch();

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (target && target.hash && id && target.hash.toLowerCase().includes(id.toLowerCase())) {
        setHasLoaded(true);
      }
    };

    window.addEventListener('hashchange', checkHashMatch);
    window.addEventListener('popstate', checkHashMatch);
    document.addEventListener('click', handleAnchorClick);

    // IntersectionObserver for proximity preloading before user reaches section
    const element = containerRef.current;
    let observer: IntersectionObserver | null = null;

    if (element && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasLoaded(true);
            if (observer) observer.disconnect();
          }
        },
        { rootMargin, threshold: 0 }
      );
      observer.observe(element);
    } else {
      // Fallback if IntersectionObserver is not supported
      setHasLoaded(true);
    }

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('hashchange', checkHashMatch);
      window.removeEventListener('popstate', checkHashMatch);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [id, rootMargin, hasLoaded]);

  const minHeightStyle = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;

  return (
    <div
      ref={containerRef}
      id={id}
      style={{ minHeight: hasLoaded ? undefined : minHeightStyle }}
      className="bg-[#FAFAFA] dark:bg-[#0a0a0a] transition-colors duration-300 w-full"
    >
      {hasLoaded ? (
        <React.Suspense fallback={fallback || <div style={{ minHeight: minHeightStyle }} className="w-full bg-[#FAFAFA] dark:bg-[#0a0a0a]" />}>
          <Component {...componentProps} />
        </React.Suspense>
      ) : (
        fallback || <div style={{ minHeight: minHeightStyle }} className="w-full bg-[#FAFAFA] dark:bg-[#0a0a0a]" />
      )}
    </div>
  );
};

export default DeferredSection;
