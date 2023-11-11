import { useState, useRef, useEffect } from 'react';

type HeadingsSlug = string[];

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const options: IntersectionObserverInit = { rootMargin: '0px 0px -40% 0px' };

const useActiveHeadingObserver = (headingSlugs: HeadingsSlug) => {
  const [activeId, setActiveId] = useState('');
  const headingElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    headingElements.current = headingSlugs.map(
      title => <HTMLElement>document.getElementById(title)
    );

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    }, options);

    headingElements.current.forEach(heading => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return activeId;
};

export default useActiveHeadingObserver;
