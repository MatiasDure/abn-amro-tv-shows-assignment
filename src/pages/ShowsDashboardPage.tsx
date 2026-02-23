import HorizontalShowList from "../features/browse/components/HorizontalShowList";
import SearchBar from "../features/search/components/SearchBar";
import { useShowsPage } from "../features/browse/hooks/useShowsPage";
import type { Show } from "../features/shared/types/show";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import SearchSection from "../features/search/components/SearchResultsList";

export default function ShowsDashboardPage() {
    const [userQuery, setUserQuery] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const {genreShowMap} = useShowsPage();
    const navigate = useNavigate();

    const handleShowCardClicked = useCallback((show: Show) => {
        navigate(`/show/${show.Id}`, { state: show });
    }, []);

    const handleCancel = () => {
        setIsSearching(false);
        setUserQuery("");
    }

    return(
        <>
           <SearchBar 
                        input={userQuery}
                        placeholder="Find Your Show"
                        onChange={(value: string) => setUserQuery(value)}
                        onClear={() => setUserQuery("")}
                        onFocus={() => setIsSearching(true)}
                        onCancel={handleCancel}
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