import HorizontalShowList from "../features/browse/components/HorizontalShowList/HorizontalShowList";
import SearchBar from "../features/search/components/SearchBar/SearchBar";
import type { Show } from "../features/shared/types/show";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import SearchSection from "../features/search/components/SearchResultsList/SearchResultsList";
import { useShowsBrowse } from "../features/browse/hooks/useBrowseShows";
import { useShowsSearch } from "../features/search/hooks/useShowsSearch";
import { useFavoriteShows } from "../features/favorite/hooks/useFavoriteShows";

export default function ShowsDashboardPage() {
    const {isSearching, cancelSearch, initializeSearch, userQuery, updateQuery} = useShowsSearch()!;
    const {favoriteShowsIds} = useFavoriteShows()!;
    const {genreShowMap, shows} = useShowsBrowse()!;
    const navigate = useNavigate();

    const handleShowCardClicked = useCallback((show: Show) => {
        navigate(`/show/${show.Id}`, { state: show });
    }, []);

    const favoriteShows = shows
        .filter(s => favoriteShowsIds.includes(s.Id.toString()))
        .sort((a, b) => b.Rating - a.Rating);

    return(
        <>
           <SearchBar 
                input={userQuery}
                placeholder="Find Your Show"
                onChange={updateQuery}
                onFocus={initializeSearch}
                onCancel={cancelSearch}
                isFocused={isSearching}
            />
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