import { useState, useEffect } from 'react';

interface ISize {
  width?: number;
  height?: number;
}

const useGetElementSizeById = (id: string, windowWidthCondition = 1024) => {
  const [isMounted, setIsMounted] = useState(false);
  const [size, setSize] = useState<ISize>({
    width: undefined,
    height: undefined,
  });

  const setElementSize = () => {
    const element = document.getElementById(id);
    if (element) {
      const { width, height } = element.getBoundingClientRect();
      setSize({
        width: Math.floor(width),
        height: Math.floor(height),
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= windowWidthCondition) return;
      setElementSize();
    };

    handleResize();
    setIsMounted(true);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMounted, ...size };
};

export default useGetElementSizeById;
