import {useEffect, useRef, useState} from "react";

export const useIsObserved = (defaultHeight:number = 48,
                              visibleOffset:number = 400,
                              root:HTMLElement | null = null,
                              ) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const placeholderHeight = useRef<number>(defaultHeight);
    const intersectionRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (intersectionRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                        setIsVisible(entries[0].isIntersecting);
                },
                { root, rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px` }
            );
            observer.observe(intersectionRef.current);
            return () => {
                if (intersectionRef.current) {
                    observer.unobserve(intersectionRef.current);
                }
            };
        }
    }, [intersectionRef]);

    return {isVisible, intersectionRef, placeholderHeight};

};

export function useIsFirstRender(): boolean {
    const isFirst = useRef(true)

    if (isFirst.current) {
        isFirst.current = false

        return true
    }

    return isFirst.current
}

