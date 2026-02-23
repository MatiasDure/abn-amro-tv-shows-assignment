import { useState } from "react";
import { useShowsSearch } from "../hooks/useShowsSearch";
// import ShowCard from "../../shows/components/ShowCard";
import type { Show } from "../../shared/types/show";
import ShowCard from "../../shared/components/ShowCard";

type SearchSectionProps = {
    query: string,
    onShowClicked: (show: Show) => void
}

export default function SearchResultsList({query, onShowClicked} : SearchSectionProps) {
    // const {shows, error, isLoading} = useShowsSearch(query);

    // if(isLoading) return <>Loading...</>
    // if(error) return <>Error: {error}</>

    return(
        <div style={{display: "flex", flexWrap: "wrap", gap: 16}}>
            {
                // shows.map(s => <ShowCard key={s.Show.Id} show={s.Show} onCardClicked={onShowClicked}/>)
            }
        </div>
    )
}