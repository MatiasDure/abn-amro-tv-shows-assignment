import { useShowsSearch } from "../../hooks/useShowsSearch";
import type { Show } from "../../../shared/types/show";
import ShowCard from "../../../shared/components/ShowCard/ShowCard";

type SearchSectionProps = {
    onShowClicked: (show: Show) => void
}

export default function SearchResultsList({onShowClicked} : SearchSectionProps) {
    const {results: shows ,error, isLoading} = useShowsSearch()!;

    if(isLoading) return <>Loading...</>
    if(error) return <>Error: {error}</>

    return(
        <div style={{display: "flex", flexWrap: "wrap", gap: 16}}>
            {
                shows.map(s => <ShowCard key={s.Show.Id} show={s.Show} onCardClicked={onShowClicked}/>)
            }
        </div>
    )
}