import type { DependencyList } from 'react';
import { useEffect } from 'react';

interface KeyCallbackMap {
  [key: string]: () => void;
}

const useKeyPress = (
  keyCallbackMap: KeyCallbackMap,
  deps: DependencyList = []
) => {
  useEffect(() => {
    const keyPressHandler = ({ key }: KeyboardEvent) => {
      const callback = keyCallbackMap[key];
      if (callback) {
        callback();
      }
    };

    window.addEventListener('keydown', keyPressHandler);
    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [keyCallbackMap, ...deps]);
};

export default useKeyPress;
