import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

const useScrollDirection = (screenWidth: number) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  let prevScrollY = 0;

  const updateScrollDirection = () => {
    if (window.scrollY > prevScrollY) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
    prevScrollY = window.scrollY;
  };

  const checkScreenWidthAndSetListener = () => {
    if (window.innerWidth <= screenWidth) {
      window.addEventListener('scroll', updateScrollDirection);
    } else {
      window.removeEventListener('scroll', updateScrollDirection);
    }
  };

  useEffect(() => {
    checkScreenWidthAndSetListener();
    window.addEventListener('resize', checkScreenWidthAndSetListener);

    return () => {
      window.removeEventListener('resize', checkScreenWidthAndSetListener);
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  return scrollDirection;
};

export default useScrollDirection;
