import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { siderState } from '@store/siderState';

const useResizeSider = () => {
  const [isSiderVisible, setIsSiderVisible] = useRecoilState(siderState);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
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
