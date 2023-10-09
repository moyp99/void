import {useEffect, useState} from "react";

export const useScrollToBottomOfComponent = (ref: HTMLDivElement | null) => {
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (ref) {
                const isBottom = ref.scrollTop + ref.clientHeight === ref.scrollHeight;
                setIsAtBottom(isBottom);
            }
        };

        if (ref) {
            ref.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (ref) {
                ref.removeEventListener('scroll', handleScroll);
            }
        };
    }, [ref]);

    return isAtBottom;
};