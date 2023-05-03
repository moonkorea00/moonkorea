import { useEffect, RefObject, BaseSyntheticEvent } from 'react';

const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClickHandler: () => void
) => {
  const handleClick = (e: BaseSyntheticEvent | MouseEvent) => {
    if (!ref.current?.contains(e.target)) return onClickHandler();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  });
};

export default useOnClickOutside;
