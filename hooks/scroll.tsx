import { useEffect, useState } from 'react';

export const useScrollToBottomOfComponent = (ref: HTMLDivElement | null) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const handleScroll = () => {
      const isBottom = ref.scrollTop + ref.clientHeight === ref.scrollHeight;
      setIsAtBottom(isBottom);
    };

    ref.addEventListener('scroll', handleScroll);

    return () => {
      ref.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return isAtBottom;
};

export const useScrollToBottomOfWindow = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const isBottom = scrollTop + windowHeight >= documentHeight;

      setIsAtBottom(isBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isAtBottom;
};
