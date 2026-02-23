import { createContext, useEffect, useState } from "react";
import type { SearchedShow } from "../types/searchedShow";
import { getShowsByQuery } from "../api/getShowsByQuery";
import { SEARCH_DEBOUNCE_MS } from "../constants/constants";
import { mapSearchShowResponse } from "../utils/mappers/mapSearchShowResponse";

type ShowsSearchContextType = {
    userQuery: string,
    isSearching: boolean,
    results: SearchedShow[],
    isLoading: boolean,
    error: string | null,
    cancelSearch: () => void,
    clearSearch: () => void,
    initializeSearch: () => void,
    updateQuery: (query: string) => void
}

export const ShowsSearchContext = createContext<ShowsSearchContextType | null>(null);

export function ShowsSearchProvider({children} : {children: React.ReactNode}) {
    const [userQuery, setUserQuery] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [results, setResults] = useState<SearchedShow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(userQuery.length < 2) return;
        
        setIsLoading(true);
        
        const timeout: number = setTimeout(async () => {
            try{
                const res: any[] = await getShowsByQuery(userQuery);
                
                setResults(res.map(rawShow => mapSearchShowResponse(rawShow)))
            } catch(error) {
                console.error((error as Error).message);
                setError("Something went wrong when searching for shows.");
            } finally {
                setIsLoading(false);
            }
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(timeout);
    }, [userQuery]);

    const clearSearch = () => {
        setUserQuery("");
        setResults([]);
    }

    const cancelSearch = () => {
        setIsSearching(false);
        clearSearch();
    }
    
    return(
        <ShowsSearchContext.Provider
            value={{
                userQuery,
                isSearching,
                results,
                isLoading,
                error,
                cancelSearch,
                clearSearch,
                initializeSearch: () => setIsSearching(true),
                updateQuery: (query) => setUserQuery(query)
            }}
        >
            {children}
        </ShowsSearchContext.Provider>
    )
    
}