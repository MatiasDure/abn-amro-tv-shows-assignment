import { createContext, useEffect, useMemo, useState } from "react";
import type { GenreShows } from "../types/genreShow";
import type { Show } from "../../shared/types/show";
import { getShowsByPage } from "../api/getShowsByPage";
import { mapShowResponse } from "../../shared/utils/mappers/mapShowResponse";
import { createGenreShowMap } from "../utils/createGenreShowMap";
import { ERROR_FETCH_FAILED } from "../../shared/constants/messages";

type ShowsBrowseContextType = {
    genreShowMap: GenreShows[],
    shows: Show[],
    isLoading: boolean,
    error: string | null
}

export const ShowsBrowseContext = createContext<ShowsBrowseContextType | null>(null);

export function ShowsBrowseProvider({children} : {children: React.ReactNode}) {
    const [shows, setShows] = useState<Show[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const genreShowMap = useMemo<GenreShows[]>(
        () => createGenreShowMap(shows),
        [shows]);

    useEffect(() => {
        const fetchAll = async() => {
            setIsLoading(true);
            try {
                const shows : any[] = await getShowsByPage(1);
                const filtered = shows
                    .map(d => mapShowResponse(d))
                    .filter(s => s.Rating >= 0);

                setShows(filtered);
            } catch(error) {
                console.error((error as Error).message);
                setError(ERROR_FETCH_FAILED);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAll();
    }, []);

    return(
        <ShowsBrowseContext.Provider
            value={{
                genreShowMap,
                shows,
                isLoading,
                error
            }}
        >
            {children}
        </ShowsBrowseContext.Provider>
    )
}