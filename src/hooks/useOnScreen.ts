import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { chatSupportState } from '@store/chatSupportState';

const useOnScreen = (ref: any) => {
  const setIsChatSupportVisible = useSetRecoilState(chatSupportState);

  if (typeof window !== 'undefined') {
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsChatSupportVisible(!entry.isIntersecting);
      });

      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }, []);
  }
};

export default useOnScreen;
