import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

interface UseScrollDirectionParams {
  screenWidth: number;
  scrollDownCallback?: VoidFunction;
  scrollUpCallback?: VoidFunction;
}

const useScrollDirection = ({
  screenWidth,
  scrollDownCallback,
  scrollUpCallback,
}: UseScrollDirectionParams) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  let prevScrollY = 0;

  const updateScrollDirection = () => {
    if (window.scrollY > prevScrollY) {
      if (scrollDownCallback) scrollDownCallback();
      setScrollDirection('down');
    } else {
      if (scrollUpCallback) scrollUpCallback();
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
