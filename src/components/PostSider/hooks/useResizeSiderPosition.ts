import { useState, useEffect } from 'react';

const useResizeSiderPosition = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const setSiderPosition = () => {
    if (window.innerWidth <= 1024) return;
    const header = document.querySelector('[data-header-element]') as Element;
    const { height } = header.getBoundingClientRect();
    setHeaderHeight(Math.floor(height));
  };

  useEffect(() => {
    setSiderPosition();
    setIsMounted(true);
    window.addEventListener('resize', setSiderPosition);

    return () => window.removeEventListener('resize', setSiderPosition);
  }, []);

  return { isMounted, headerHeight };
};

export default useResizeSiderPosition;
