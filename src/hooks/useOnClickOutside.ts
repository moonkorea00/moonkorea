import { useRef, useEffect } from 'react';

const useOnClickOutside = <T extends HTMLElement>(
  onClickHandler: () => void
) => {
  const wrapperRef = useRef<T>(null);

  const handleClick = (e: MouseEvent) => {
    if (!wrapperRef.current?.contains(e.target as Node)) {
      onClickHandler();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return wrapperRef;
};

export default useOnClickOutside;
