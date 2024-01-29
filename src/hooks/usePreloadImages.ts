import { useEffect } from 'react';

const usePreloadImages = (imagesSrcs: string[], preloadOnMount = false) => {
  const onPreloadImages = () => {
    imagesSrcs.forEach(src => {
      const image = new Image();
      image.src = src;
    });
  };

  useEffect(() => {
    if (!preloadOnMount) return;
    onPreloadImages();
  }, []);

  return onPreloadImages;
};

export default usePreloadImages;
