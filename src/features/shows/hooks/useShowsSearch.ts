import { useEffect, useState } from "react";
import { getShowsByQuery } from "../api/getShowsByQuery";
import { mapSearchShowResponse } from "../utils/mappers/mapSearchShowResponse";
import type { SearchedShow } from "../types/searchedShow";

export function useShowsSearch(query: string, timeoutMs: number = 350) {
    const [shows, setShows] = useState<SearchedShow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if(query.length < 2) return;
        
        setIsLoading(true);
        
        const timeout: number = setTimeout(async () => {
            try{
                const res: any[] = await getShowsByQuery(query);
                
                setShows(res.map(rawShow => mapSearchShowResponse(rawShow)))
            } catch(error) {
                console.error((error as Error).message);
                setError("Something went wrong when searching for shows.");
            } finally {
                setIsLoading(false);
            }
        }, timeoutMs);

        return () => clearTimeout(timeout);
    }, [query]);

    return {
        shows,
        error,
        isLoading
    }
}