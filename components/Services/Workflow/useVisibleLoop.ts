import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * A hook that returns whether the referenced element is visible in the viewport.
 */
export function useIsVisible(ref: RefObject<HTMLElement | null>, threshold: number = 0.1): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [ref, threshold]);

  return isVisible;
}

/**
 * A hook that runs an interval callback only when the referenced element is visible.
 * Ensures cleanup on unmount or invisibility.
 */
export function useVisibleInterval(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  delay: number,
  enabled: boolean = true
) {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    let isVisible = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startInterval = () => {
      if (!intervalId) {
        intervalId = setInterval(() => {
          callbackRef.current();
        }, delay);
      }
    };

    const stopInterval = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startInterval();
        } else {
          stopInterval();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      stopInterval();
    };
  }, [ref, delay, enabled]);
}
