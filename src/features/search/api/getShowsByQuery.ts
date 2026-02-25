import { API_SEARCHED_SHOWS_MOCK } from "../utils/mocks/apiSearchedShowsResponse";
import { SEARCH_SHOWS_ENDPOINT } from "../../shared/constants/showAPI";
import { ERROR_FETCH_FAILED } from "../../shared/constants/messages";

export async function getShowsByQuery(query: string): Promise<any[]> {
    if(import.meta.env.MODE === "development") {
        console.log("working in dev environment");
        return API_SEARCHED_SHOWS_MOCK;
    } else {
        const res = await fetch(`${import.meta.env.VITE_TVMAZE_BASE_URL}${SEARCH_SHOWS_ENDPOINT}?q=${query}`);
        
        if(!res.ok) throw new Error(ERROR_FETCH_FAILED);
        
        return await res.json();
    }
}