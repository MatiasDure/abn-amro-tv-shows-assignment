import { useEffect, useMemo, useState } from "react";
import type { GenreShows, Show } from "../types/show";
import { SHOWS_LIST_MOCK } from "../utils/mocks/show";
import { mapShowResponse } from "../utils/mappers/mapShowReponse";

export function useShowsPage() {
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
            const filtered = shows
                .filter(show => show.Rating >= 0)
                .sort((a, b) => b.Rating - a.Rating);
            
            map.set(genre, filtered);
        });

        console.log("recreating the genre map");
        return Array.from(map, ([Genre, Shows]) => ({ Genre, Shows }));
    }, [shows]);

    useEffect(() => {
        const fetchAll = async() => {
            try {
                if(import.meta.env.MODE === "development") {
                    console.log("working in dev environment");
                    setShows(SHOWS_LIST_MOCK.map(d => mapShowResponse(d)));
                } else {
                    // to-do: Move to api directory and create client
                    const res = await fetch("https://api.tvmaze.com/shows?page=1");
                    
                    if(!res.ok) {
                        console.error("Error fetching: ", res.status);
                        return;
                    }
                    
                    const shows: any[] = await res.json();
                    setShows(shows.map(d => mapShowResponse(d)));
                }
            } catch(error) {
                console.error((error as Error).message);
            }
        }

        fetchAll();
    }, []);

    return {
        shows,
        genreShowMap
    }
}