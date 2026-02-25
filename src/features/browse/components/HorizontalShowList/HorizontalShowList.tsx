import { useRef } from "react"
import type { Show } from "../../../shared/types/show";
import { useDivScroll } from "../../hooks/useDivScroll";
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
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useDivScroll(scrollRef, shows.length);

    return (
        <section className="horizontal-list">
            <h1 className="horizontal-list__title">{title}</h1>
            { 
                shows.length > 0 ?
                <div className="horizontal-list__scroll-container">
                    { 
                        canScrollLeft && 
                        <button data-testid="left-scroll-button" className="left horizontal-list__scroll-button" onClick={scrollLeft}>
                            <ChevronLeft className="horizontal-list__scroll-button-icon" size={"2.5rem"} />
                        </button>
                    }
                    {
                        canScrollRight && 
                        <button data-testid="right-scroll-button" className="right horizontal-list__scroll-button" onClick={scrollRight}>
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
