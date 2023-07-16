import { useState, useEffect, RefObject } from 'react';

const useIsIntersected = <T extends HTMLElement>(
  ref: RefObject<T>,
  options = {}
) => {
  const [isIntersected, setIsIntersected] = useState(false);
  const shouldStopObserving = 'once' in options;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersected(
        shouldStopObserving ? entry.isIntersecting : !entry.isIntersecting
      );
      if (shouldStopObserving && entry.isIntersecting) observer.disconnect();
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersected;
};

export default useIsIntersected;
