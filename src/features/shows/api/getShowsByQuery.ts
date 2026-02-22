import { SEARCH_SHOWS_ENDPOINT } from "./showAPI";

export async function getShowsByQuery(query: string): Promise<any[]> {
    const res = await fetch(`${import.meta.env.VITE_TVMAZE_BASE_URL}${SEARCH_SHOWS_ENDPOINT}?q=${query}`);

    if(!res.ok) throw new Error("Failed to fetch shows");

    return await res.json();
}