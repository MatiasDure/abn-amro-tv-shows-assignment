import { useLayoutEffect, useState } from "react";
import { useWindowSize } from "../../shared/hooks/useWindowSize";

type DivScroll = {
    canScrollLeft: boolean,    
    canScrollRight: boolean,
    scrollLeft: () => void,
    scrollRight: () => void    
}

export function useDivScroll(scrollRef: React.RefObject<HTMLDivElement | null>, showsLength: number): DivScroll {
    const screenSize = useWindowSize();
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useLayoutEffect(() => {
        if (!scrollRef) return;
        
        const element = scrollRef.current;
        if (!element) return;

        const update = () => {
            setCanScrollLeft(element.scrollLeft > 0);
            setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth);
        };

        update();
        element.addEventListener("scroll", update);

        return () => element.removeEventListener("scroll", update);
    }, [showsLength]);

    const scrollLeft = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: -screenSize.Width,
            behavior: "smooth"
        });
    };

    const scrollRight = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: screenSize.Width,
            behavior: "smooth"
        });
    };

    return {
        canScrollLeft,
        canScrollRight,
        scrollLeft,
        scrollRight
    }
}