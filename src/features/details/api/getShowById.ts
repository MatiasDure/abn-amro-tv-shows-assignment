import { SHOWS_ENDPOINT } from "../../shared/constants/showAPI";
import { INDIVIDUAL_SHOW_MOCK } from "../utils/mocks/individualShow";

export async function getShowById(showId: string): Promise<any> {
    if(import.meta.env.MODE === "development") {
        console.log("working in dev environment");
        return INDIVIDUAL_SHOW_MOCK;
    } else {
        const res = await fetch(`${import.meta.env.VITE_TVMAZE_BASE_URL}${SHOWS_ENDPOINT}/${showId}?embed=episodes`);
        
        if(!res.ok) throw new Error("Failed to fetch shows");

        return await res.json();
    }
}