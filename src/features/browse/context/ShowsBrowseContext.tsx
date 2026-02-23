import { createContext, useEffect, useMemo, useState } from "react";
import type { GenreShows } from "../types/genreShow";
import type { Show } from "../../shared/types/show";
import { getShowsByPage } from "../api/getShowsByPage";
import { mapShowResponse } from "../../shared/mappers/mapShowResponse";

type ShowsBrowseContextType = {
    genreShowMap: GenreShows[],
    shows: Show[]
}

export const ShowsBrowseContext = createContext<ShowsBrowseContextType | null>(null);

export function ShowsBrowseProvider({children} : {children: React.ReactNode}) {
    const [shows, setShows] = useState<Show[]>([]);
    const genreShowMap = useMemo<GenreShows[]>(() => {
        if(shows.length === 0) return [];

        const map = new Map<string, Show[]>();

        shows.forEach(show => {
            show.Genres.forEach(genre => {
                if(!map.has(genre)) 
                    map.set(genre, []);

                map.get(genre)!.push(show);
            })
        })
            
        map.forEach((shows, genre) => {
            const sorted = shows.sort((a, b) => b.Rating - a.Rating);
            map.set(genre, sorted);
        });

        console.log("recreating the genre map");
        return Array.from(map, ([Genre, Shows]) => ({ Genre, Shows }));
    }, [shows]);

    useEffect(() => {
        const fetchAll = async() => {
            try {
                const shows : any[] = await getShowsByPage(1);
                const filtered = shows
                    .map(d => mapShowResponse(d))
                    .filter(s => s.Rating >= 0);

                setShows(filtered);
            } catch(error) {
                console.error((error as Error).message);
            }
        }

        fetchAll();
    }, []);


    return(
        <ShowsBrowseContext.Provider
            value={{
                genreShowMap,
                shows
            }}
        >
            {children}
        </ShowsBrowseContext.Provider>
    )
}