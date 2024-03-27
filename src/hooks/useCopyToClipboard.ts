import { useState } from 'react';

import { useToastContext } from '@context/Toast';

import { TOAST } from '@components/Modal/Toast/toast.constants';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const toast = useToastContext();

  const onCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (_) {
      toast.show(TOAST.ERROR);
    }
  };

  return { isCopied, onCopy };
};

export default useCopyToClipboard;
