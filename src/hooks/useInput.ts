import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';

type TargetElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const useInput = <T extends TargetElement>(
  initialValue = ''
): [string, (e: ChangeEvent<T>) => void, () => void] => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const onChange = useCallback(
    (e: ChangeEvent<T>) => setInputValue(e.target.value),
    []
  );

  const reset = useCallback(() => setInputValue(''), []);

  return [inputValue, onChange, reset];
};

export default useInput;
