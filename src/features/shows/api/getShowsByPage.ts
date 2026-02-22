import { SHOWS_ENDPOINT } from "./showAPI";
import { SHOWS_LIST_MOCK } from "../utils/mocks/show";

export async function getShowsByPage(pageNumber: number): Promise<any> {
    if(import.meta.env.MODE === "development") {
        console.log("working in dev environment");
        return SHOWS_LIST_MOCK;
    } else {
        const res = await fetch(`${import.meta.env.VITE_TVMAZE_BASE_URL}${SHOWS_ENDPOINT}?page=${pageNumber}`);
        
        if(!res.ok) throw new Error("Failed to fetch shows");

        return await res.json();
    }
}