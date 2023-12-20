import { useState } from 'react';
import useModal from './useModal';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const { showModal } = useModal();

  const onCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (_) {
      showModal({ name: 'error' });
    }
  };

  return { isCopied, onCopy };
};

export default useCopyToClipboard;
