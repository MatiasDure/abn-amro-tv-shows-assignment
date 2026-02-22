import { useEffect, useState } from "react";
import type { Show } from "../types/show";
import { getShowsByQuery } from "../api/getShowsByQuery";
import { mapShowResponse } from "../utils/mappers/mapShowReponse";

export function useShowsSearch(query: string, timeoutMs: number = 350) {
    const [shows, setShows] = useState<Show[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(query.length < 2) return;

        setIsLoading(true);
        
        const timeout: number = setTimeout(async () => {
            try{
                console.log(query);
                const res: any[] = await getShowsByQuery(query);
                setShows(res.map(rawShow => mapShowResponse(rawShow)))
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