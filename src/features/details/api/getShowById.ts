import { ERROR_FETCH_FAILED } from "../../shared/constants/messages";
import { SHOWS_ENDPOINT } from "../../shared/constants/showAPI";
import { API_INDIVIDUAL_SHOW_MOCK } from "../../shared/utils/mocks/apiIndividualShowResponse";

export async function getShowById(showId: string): Promise<any> {
    if(import.meta.env.MODE === "development") {
        console.log("working in dev environment");
        return API_INDIVIDUAL_SHOW_MOCK;
    } else {
        const res = await fetch(`${import.meta.env.VITE_TVMAZE_BASE_URL}${SHOWS_ENDPOINT}/${showId}?embed=episodes`);
        
        if(!res.ok) throw new Error(ERROR_FETCH_FAILED);

        return await res.json();
    }
}