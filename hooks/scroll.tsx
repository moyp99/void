import { useEffect, useState } from 'react';

export const useScrollToBottomOfWindow = (offset: number = 64) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const threshold = documentHeight - offset;
      const isBottom = scrollTop + windowHeight  >= threshold;

      setIsAtBottom(isBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isAtBottom;
};
