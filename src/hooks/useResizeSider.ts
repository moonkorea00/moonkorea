import { useState, useEffect } from 'react';

const isSiderVisibleOnInitialRender = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 1023;
  }
};

const useResizeSider = () => {
  const [isSiderVisible, setIsSiderVisible] = useState(
    isSiderVisibleOnInitialRender
  );

  const handleResize = () => {
    if (window.innerWidth <= 1023) {
      setIsSiderVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  return { isSiderVisible, setIsSiderVisible };
};
export default useResizeSider;
