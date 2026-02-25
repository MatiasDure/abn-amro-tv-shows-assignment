import { SEARCHED_SHOWS_MOCK } from "../utils/mocks/searchedShows";
import { SEARCH_SHOWS_ENDPOINT } from "../../shared/constants/showAPI";

export async function getShowsByQuery(query: string): Promise<any[]> {
    if(import.meta.env.MODE === "development") {
            console.log("working in dev environment");
            return SEARCHED_SHOWS_MOCK;
    } else {
        const res = await fetch(`${import.meta.env.VITE_TVMAZE_BASE_URL}${SEARCH_SHOWS_ENDPOINT}?q=${query}`);
        
        if(!res.ok) throw new Error("Failed to fetch shows");
        
        return await res.json();
    }
}