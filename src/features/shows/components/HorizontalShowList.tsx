import { useRef } from "react"
import type { Show } from "../types/show";
import { useWindowSize } from "../../../shared/hooks/useWindowSize";
import Scroller from "./Scroller";
import { useDivScroll } from "../hooks/useScroll";
import React from "react";

type HorizontalShowListProps = {
    title: string,
    shows: Show[],
    onShowClicked: (show: Show) => void
}

function HorizontalShowList({title, shows, onShowClicked} : HorizontalShowListProps) {
    const screenSize = useWindowSize();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const {canScrollLeft, canScrollRight} = useDivScroll(scrollRef);

    const scrollLeft = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: -screenSize.Width,
            behavior: "smooth"
        });
    };
    console.log("still rendering");

    const scrollRight = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: screenSize.Width,
            behavior: "smooth"
        });
        console.log(scrollRef.current);
    };

    return (
        <div style={{ width: "100%" }}>
            <h3>{title}</h3>

            <div style={{ position: "relative", width: "100%" }}>
                { canScrollLeft && 
                    <button
                        onClick={scrollLeft}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            transform: "translateY(-50%)",
                            zIndex: 10
                        }}
                    >
                        {"<"}
                    </button>
                }

                {
                    canScrollRight && 
                    <button
                    onClick={scrollRight}
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-50%)",
                        zIndex: 10
                    }}
                    >
                        {">"}
                    </button>
                }

                <Scroller scrollRef={scrollRef} >
                    {shows.map(show => (
                        <div
                        key={show.Id}
                        style={{
                            position: "relative",
                            scrollSnapAlign: "start"
                        }}
                        >
                            <button
                                onClick={() => onShowClicked(show)}
                                style={{ border: "none", background: "none" }}
                                >
                                <img src={show.ImageUrl} />
                            </button>
                            <span
                                style={{
                                    position: "absolute",
                                    bottom: 30,
                                    left: 0,
                                    fontSize: 28,
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                    color: "white",
                                    padding: 12,
                                    borderRadius: 8
                                }}
                                >
                                ⭐ {show.Rating}
                            </span>
                        </div>
                    ))}
                </Scroller>
            </div>
        </div>
    );
}

export default React.memo(HorizontalShowList);
