import HorizontalShowList from "../components/HorizontalShowList";
import SearchBar from "../../../shared/components/SearchBar";
import { useShowsPage } from "../hooks/useShowsPage";
import type { Show } from "../types/show";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useShowsSearch } from "../hooks/useShowsSearch";
import SearchSection from "../components/SearchSection";

export default function ShowsDashboard() {
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