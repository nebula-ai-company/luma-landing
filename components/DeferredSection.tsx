import React, { useState, useEffect, useRef } from 'react';

class SectionErrorBoundary extends React.Component<
  { children: React.ReactNode; minHeightStyle?: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; minHeightStyle?: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn('DeferredSection failed to load chunk:', error);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{ minHeight: this.props.minHeightStyle || '300px' }}
          className="w-full flex flex-col items-center justify-center p-8 text-center bg-[#FAFAFA] dark:bg-[#0a0a0a] transition-colors duration-300"
        >
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 font-mono">
            خطا در بارگذاری این بخش
          </p>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 text-xs rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            تلاش مجدد
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
  rootMargin = '1400px 0px',
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

    // Safety timer: ensure section loads even if IntersectionObserver fails or never fires
    const fallbackTimer = setTimeout(() => {
      setHasLoaded(true);
    }, 7000);

    // IntersectionObserver with defensive handling
    const element = containerRef.current;
    let observer: IntersectionObserver | null = null;

    if (element && typeof IntersectionObserver !== 'undefined') {
      try {
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
      } catch (err) {
        console.warn('IntersectionObserver error in DeferredSection:', err);
        setHasLoaded(true);
      }
    } else {
      // Fallback if IntersectionObserver is not supported
      setHasLoaded(true);
    }

    return () => {
      clearTimeout(fallbackTimer);
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
        <SectionErrorBoundary minHeightStyle={minHeightStyle}>
          <React.Suspense fallback={fallback || <div style={{ minHeight: minHeightStyle }} className="w-full bg-[#FAFAFA] dark:bg-[#0a0a0a]" />}>
            <Component {...componentProps} />
          </React.Suspense>
        </SectionErrorBoundary>
      ) : (
        fallback || <div style={{ minHeight: minHeightStyle }} className="w-full bg-[#FAFAFA] dark:bg-[#0a0a0a]" />
      )}
    </div>
  );
};

export default DeferredSection;
