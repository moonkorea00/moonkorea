import { useEffect, RefObject } from 'react';

const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClickHandler: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node)) return onClickHandler();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  });
};

export default useOnClickOutside;
