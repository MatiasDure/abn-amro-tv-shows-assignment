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
    emptyListFallback?: string,
    onShowClicked: (show: Show) => void
}

function HorizontalShowList({title, shows, emptyListFallback, onShowClicked} : HorizontalShowListProps) {
    const screenSize = useWindowSize();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const {canScrollLeft, canScrollRight} = useDivScroll(scrollRef, shows.length);

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
            { 
                shows.length > 0 ?
                <div className="horizontal-list__scroll-container">
                    { 
                        canScrollLeft && 
                        <button className="left horizontal-list__scroll-button" onClick={scrollLeft}>
                            <ChevronLeft className="horizontal-list__scroll-button-icon" size={"2.5rem"} />
                        </button>
                    }
                    {
                        canScrollRight && 
                        <button onClick={scrollRight} className="right horizontal-list__scroll-button">
                            <ChevronRight className="horizontal-list__scroll-button-icon" size={"2.5rem"} />
                        </button>
                    }
                    <div ref={scrollRef} className="horizontal-list__scroll-window">
                        <ul className="horizontal-list__list">
                            {shows.map(show => (
                                <div key={show.Id} className="horizontal-list__show-card">
                                    <ShowCard show={show} onCardClicked={onShowClicked}/>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                :
                <span className="horizontal-list__fallback-text">{emptyListFallback}</span>
            }
        </section>
    );
}

export default React.memo(HorizontalShowList);
