import {
  useEffect,
  RefObject,
  SetStateAction,
  Dispatch,
  BaseSyntheticEvent,
} from 'react';

const useUnmountIfClickedOutside = (
  ref: RefObject<HTMLDivElement>,
  onClose: null | (() => void),
  setState?: Dispatch<SetStateAction<boolean>>
) => {
  const handleClick = (e: BaseSyntheticEvent | MouseEvent) => {
    if (!ref.current?.contains(e.target)) {
      e.stopPropagation();
      if (setState) return setState(false);
      if (onClose) return onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  });
};

export default useUnmountIfClickedOutside;
