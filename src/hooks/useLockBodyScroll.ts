import { useEffect } from 'react';

const useLockBodyScroll = (shouldLock: boolean) => {
  useEffect(() => {
    const originalOverflowStyle = document.body.style.overflow;

    if (shouldLock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflowStyle;
    }

    return () => {
      document.body.style.overflow = originalOverflowStyle;
    };
  }, [shouldLock]);
};

export default useLockBodyScroll;
