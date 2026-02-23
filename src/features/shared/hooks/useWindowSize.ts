import { useEffect, useState } from "react";
import type { WindowSize } from "../types/windowSize";

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        Width: window.innerWidth,
        Height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                Width: window.innerWidth,
                Height: window.innerHeight
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return windowSize;
}