import { useState, useRef, useEffect } from 'react';

type ElementIds = string[];

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const options: IntersectionObserverInit = { rootMargin: '0px 0px -40% 0px' };

const useActiveElementObserver = (headingSlugs: ElementIds) => {
  const [activeId, setActiveId] = useState('');
  const observableElements = useRef<HTMLElement[]>([]);

  const isElementInView = (id: string) => id === activeId;

  useEffect(() => {
    observableElements.current = headingSlugs.map(
      title => <HTMLElement>document.getElementById(title)
    );

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    }, options);

    observableElements.current.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return isElementInView;
};

export default useActiveElementObserver;
