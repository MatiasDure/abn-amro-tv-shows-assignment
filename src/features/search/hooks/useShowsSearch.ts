import { useContext } from "react";
import { ShowsSearchContext } from "../context/ShowsSearchContext";

export function useShowsSearch() {
    return useContext(ShowsSearchContext);
}