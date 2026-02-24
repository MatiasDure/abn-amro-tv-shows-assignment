import HorizontalShowList from "../../features/browse/components/HorizontalShowList/HorizontalShowList";
import SearchBar from "../../features/search/components/SearchBar/SearchBar";
import type { Show } from "../../features/shared/types/show";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import SearchSection from "../../features/search/components/SearchResultsList/SearchResultsList";
import { useShowsBrowse } from "../../features/browse/hooks/useBrowseShows";
import { useShowsSearch } from "../../features/search/hooks/useShowsSearch";
import { useFavoriteShows } from "../../features/favorite/hooks/useFavoriteShows";
import "./ShowDashboardPage.scss"
import { Loading } from "../../features/shared/components/Loading/Loading";
import { ErrorFallback } from "../../features/shared/components/Error/ErrorFallback";

export default function ShowsDashboardPage() {
    const {isSearching, cancelSearch, initializeSearch, userQuery, updateQuery} = useShowsSearch()!;
    const {favoriteShowsIds} = useFavoriteShows()!;
    const {genreShowMap, shows, isLoading, error} = useShowsBrowse()!;
    
    if(isLoading) return <Loading />
    if(error) return <ErrorFallback message={error} />
    
    const navigate = useNavigate();
    const handleShowCardClicked = useCallback((show: Show) => {
        navigate(`/show/${show.Id}`);
    }, []);

    const favoriteShows = shows
        .filter(s => favoriteShowsIds.includes(s.Id.toString()))
        .sort((a, b) => b.Rating - a.Rating);

    return(
        <>
            <div>
                <SearchBar 
                        input={userQuery}
                        placeholder="Find Your Show"
                        onChange={updateQuery}
                        onFocus={initializeSearch}
                        onCancel={cancelSearch}
                        isFocused={isSearching}
                />
            </div>
           {
                isSearching ? 
                    <SearchSection onShowClicked={handleShowCardClicked} />
                    :
                    <>
                        <HorizontalShowList 
                            key="Favorites"
                            title="Favorites"
                            emptyListFallback="Currently no favorite shows"
                            shows={favoriteShows}
                            onShowClicked={handleShowCardClicked}
                        />
                        { 
                            genreShowMap.map(genreShow => (
                                <HorizontalShowList 
                                    key={genreShow.Genre} 
                                    title={genreShow.Genre} 
                                    emptyListFallback="No shows available for this genre"
                                    shows={genreShow.Shows}
                                    onShowClicked={handleShowCardClicked}
                                />
                            ))
                        }
                    </>
           }
        </>
    )
}