import { createContext, useState } from "react";
import { useShowsPage } from "../hooks/useShowsPage";
import type { GenreShows } from "../types/genreShow";

type ShowsDataContextType = {
    genreShowMap: GenreShows[]
}

export const ShowsDataContext = createContext<ShowsDataContextType | null>(null);

export function ShowsDataProvider({children} : {children: React.ReactNode}) {
    const {genreShowMap} = useShowsPage();

    return(
        <ShowsDataContext.Provider
            value={{

            }}
        >
            {children}
        </ShowsDataContext.Provider>
    )
}