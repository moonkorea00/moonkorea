import { useState, useEffect } from 'react';
import { RefObject } from 'react';

const useIsIntersected = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [isIntersected, setIsIntersected] = useState(false);

  if (typeof window !== 'undefined') {
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersected(!entry.isIntersecting);
      });

      if (ref.current) observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }, []);
  }

  return isIntersected;
};

export default useIsIntersected;
