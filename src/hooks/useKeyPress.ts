import type { DependencyList } from 'react';
import { useEffect } from 'react';

const useKeyPress = (
  keyCallbackMap: Record<string, VoidFunction>,
  deps: DependencyList = []
) => {
  useEffect(() => {
    const keyPressHandler = ({ key }: KeyboardEvent) => {
      if (!keyCallbackMap) return;

      const keyPressCallback = keyCallbackMap[key];
      if (keyPressCallback) keyPressCallback();
    };

    window.addEventListener('keydown', keyPressHandler);
    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [keyCallbackMap, ...deps]);
};

export default useKeyPress;
