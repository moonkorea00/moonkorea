import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

const useIsIntersected = <T extends HTMLElement>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
) => {
  const [isIntersected, setIsIntersected] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersected(
        options?.once ? entry.isIntersecting : !entry.isIntersecting
      );
      
      if (options?.once && entry.isIntersecting) observer.disconnect();
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersected;
};

export default useIsIntersected;
