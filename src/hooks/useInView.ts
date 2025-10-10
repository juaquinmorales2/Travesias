import { useState, useEffect, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useInView = (
  ref: RefObject<Element>,
  options: UseInViewOptions = {}
) => {
  const { threshold = 0, rootMargin = '0px', once = false } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else {
          if (!once) {
            setInView(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, rootMargin, once]);

  return { inView };
};