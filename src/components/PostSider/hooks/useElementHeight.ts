import { useState, useEffect } from 'react';

const useElementHeight = (id: string) => {
  const [isMounted, setIsMounted] = useState(false);
  const [height, setHeight] = useState<number | null>(null);

  const setElementHeight = () => {
    const element = document.getElementById(id);

    if (element) {
      const { height } = element.getBoundingClientRect();
      setHeight(Math.floor(height));
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    setElementHeight();
    setIsMounted(true);

    window.addEventListener('resize', setElementHeight);

    return () => window.removeEventListener('resize', setElementHeight);
  }, []);

  return { isMounted, height };
};

export default useElementHeight;
