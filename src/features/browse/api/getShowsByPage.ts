import { SHOWS_ENDPOINT } from "../../shared/constants/showAPI";
import { API_SHOWS_LIST_MOCK } from "../../shared/utils/mocks/apiShowListResponse";

export async function getShowsByPage(pageNumber: number): Promise<any> {
    if(import.meta.env.MODE === "development") {
        console.log("working in dev environment");
        return API_SHOWS_LIST_MOCK;
    } else {
        const res = await fetch(`${import.meta.env.VITE_TVMAZE_BASE_URL}${SHOWS_ENDPOINT}?page=${pageNumber}`);
        
        if(!res.ok) throw new Error("Failed to fetch shows");

        return await res.json();
    }
}