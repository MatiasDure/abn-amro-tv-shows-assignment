import { useEffect, useState } from "react";

export function useDivScroll(scrollRef: React.RefObject<HTMLDivElement | null>) {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
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
    }, []);

    return {
        canScrollLeft,
        canScrollRight
    }
}