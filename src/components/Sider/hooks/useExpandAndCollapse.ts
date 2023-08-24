import { useState, useRef, useEffect } from 'react';

const useExpandAndCollapse = <T extends HTMLElement, K extends VoidFunction>(
  shouldRunEffect?: boolean,
  effectCallback?: K
) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (shouldRunEffect) (effectCallback as K)();
    if (ref.current) {
      const currentContainerHeight = ref.current.scrollHeight;
      setContainerHeight(currentContainerHeight);
    }
  }, [shouldRunEffect]);

  return { containerHeight, ref };
};

export default useExpandAndCollapse;
