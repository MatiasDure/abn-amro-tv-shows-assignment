import HorizontalShowList from "../features/browse/components/HorizontalShowList";
import SearchBar from "../features/search/components/SearchBar";
import type { Show } from "../features/shared/types/show";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import SearchSection from "../features/search/components/SearchResultsList";
import { useShowsBrowse } from "../features/browse/hooks/useBrowseShows";
import { useShowsSearch } from "../features/search/hooks/useShowsSearch";

export default function ShowsDashboardPage() {
    const {isSearching, clearSearch, cancelSearch, initializeSearch, userQuery, updateQuery} = useShowsSearch()!;
    const {genreShowMap} = useShowsBrowse()!;
    const navigate = useNavigate();

    const handleShowCardClicked = useCallback((show: Show) => {
        navigate(`/show/${show.Id}`, { state: show });
    }, []);

    return(
        <>
           <SearchBar 
                        input={userQuery}
                        placeholder="Find Your Show"
                        onChange={updateQuery}
                        onClear={clearSearch}
                        onFocus={initializeSearch}
                        onCancel={cancelSearch}
                        isFocused={isSearching}
            />
           {
            isSearching ? 
                <SearchSection 
                    query={userQuery}
                    onShowClicked={handleShowCardClicked}
                />
                :
                genreShowMap.map(pair => (
                    <HorizontalShowList 
                        key={pair.Genre} 
                        title={pair.Genre} 
                        shows={pair.Shows}
                        onShowClicked={handleShowCardClicked}
                    />
                ))
           }
        </>
    )
}