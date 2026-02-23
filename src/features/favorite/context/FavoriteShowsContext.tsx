import { createContext, useEffect, useState } from "react"
import { getItem, storeItem } from "../../shared/utils/storage/localStorage";
import { LOCAL_STORAGE_FAVORITE_KEY } from "../constants/constants";

type FavoriteShowsContextType = {
    favoriteShows: string[],
    toggleFavoriteShow: (showId: string) => void,
}

export const FavoriteShowsContext = createContext<FavoriteShowsContextType | null>(null);

export function FavoriteShowsProvider({children} : {children : React.ReactNode}) {
    const [favoriteShows, setFavoriteShows] = useState<string[]>([]);

    useEffect(() => {
        const fetchFavorites = () => {
            const shows = getItem<string[]>(LOCAL_STORAGE_FAVORITE_KEY);

            if(!shows) {
                console.log("No item found with key", LOCAL_STORAGE_FAVORITE_KEY);
                return;
            }
            
            setFavoriteShows(shows);
        }

        fetchFavorites();
    }, []);

    const setFavoriteShow = (showId: string) => {
        const updatedFavorites = [...favoriteShows, showId];
        storeItem<string[]>(LOCAL_STORAGE_FAVORITE_KEY, updatedFavorites);
        setFavoriteShows(updatedFavorites);
    }
    
    const removeFavoriteShow = (showId: string) => {
        const updatedFavorites = favoriteShows.filter(s => s !== showId);
        storeItem<string[]>(LOCAL_STORAGE_FAVORITE_KEY, updatedFavorites);
        setFavoriteShows(updatedFavorites);    
    }

    const toggleFavoriteShow = (showId: string) => {
        if(favoriteShows.includes(showId)) 
            removeFavoriteShow(showId);
        else
            setFavoriteShow(showId); 
    }

    return(
        <FavoriteShowsContext.Provider
            value={{
                favoriteShows,
                toggleFavoriteShow
            }}
        >
            {children}
        </FavoriteShowsContext.Provider>
    )
}