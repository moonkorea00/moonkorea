import { useState, useRef, useEffect } from 'react';

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

const useIsIntersected = <T extends HTMLElement>(
  options?: IntersectionObserverInit
) => {
  const [isIntersected, setIsIntersected] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      const isObservered = options?.once
        ? entry.isIntersecting
        : !entry.isIntersecting;
      setIsIntersected(isObservered);

      if (options?.once && entry.isIntersecting) observer.disconnect();
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { isIntersected, ref };
};

export default useIsIntersected;
