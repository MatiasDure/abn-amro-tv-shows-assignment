import { useShowsSearch } from "../../hooks/useShowsSearch";
import type { Show } from "../../../shared/types/show";
import ShowCard from "../../../shared/components/ShowCard/ShowCard";
import "./SearchResultsList.scss"
import { Loading } from "../../../shared/components/Loading/Loading";
import { ErrorFallback } from "../../../shared/components/Error/ErrorFallback";
import { SIMILIARITY_LOWER_BOUND } from "../../constants/constants";

type SearchResultsListProps = {
    onShowClicked: (show: Show) => void
}

export default function SearchResultsList({onShowClicked} : SearchResultsListProps) {
    const {results: shows ,error, isLoading} = useShowsSearch()!;

    if(isLoading) return <Loading />
    if(error) return <ErrorFallback message={error}/>

    const filteredShows = shows.filter(s => s.Show.Rating > 0 && s.QuerySimiliarityScore > SIMILIARITY_LOWER_BOUND);

    return(
        <div className="search-results">
            {
                filteredShows.map(s => (
                    <div key={s.Show.Id}>
                        <ShowCard show={s.Show} onCardClicked={onShowClicked}/>
                    </div>
                ))
            }
        </div>
    )
}