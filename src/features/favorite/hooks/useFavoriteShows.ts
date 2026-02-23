import { useContext } from "react";
import { FavoriteShowsContext } from "../context/FavoriteShowsContext";

export function useFavoriteShows() {
    return useContext(FavoriteShowsContext);
}