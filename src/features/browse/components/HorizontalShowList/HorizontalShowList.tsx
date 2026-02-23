import { useRef } from "react"
import type { Show } from "../../../shared/types/show";
import { useWindowSize } from "../../../shared/hooks/useWindowSize";
import { useDivScroll } from "../../hooks/useScroll";
import React from "react";
import ShowCard from "../../../shared/components/ShowCard/ShowCard";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./HorizontalShowList.scss"

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

    const scrollRight = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: screenSize.Width,
            behavior: "smooth"
        });
    };

    return (
        <section className="horizontal-list">
            <h1 className="horizontal-list__title">{title}</h1>
            <div className="horizontal-list__scroll-container">
                { 
                    canScrollLeft && 
                    <button className="left scroll-button" onClick={scrollLeft}>
                        <ChevronLeft size={"2.5rem"} />
                    </button>
                }
                {
                    canScrollRight && 
                    <button onClick={scrollRight} className="right scroll-button">
                        <ChevronRight size={"2.5rem"} />
                    </button>
                }
                <div ref={scrollRef} className="horizontal-list__scroll-window">
                    <ul className="horizontal-list__list">
                        {shows.map(show => (
                            <ShowCard 
                                key={show.Id}
                                show={show}
                                onCardClicked={onShowClicked}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default React.memo(HorizontalShowList);
