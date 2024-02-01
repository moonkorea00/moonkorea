import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: PropsWithStrictChildren) => {
  const [isMounted, setIsMounted] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    portalRef.current = document.createElement('div');
    document.body.appendChild(portalRef.current);

    return () => {
      if (portalRef.current) document.body.removeChild(portalRef.current);
    };
  }, []);

  return isMounted && portalRef.current
    ? createPortal(children, portalRef.current)
    : null;
};

export default Portal;
