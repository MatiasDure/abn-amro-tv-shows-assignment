import { createContext, useEffect, useState } from "react"
import { getItem, storeItem } from "../../shared/utils/storage/localStorage";
import { LOCAL_STORAGE_FAVORITE_KEY } from "../constants/constants";

type FavoriteShowsContextType = {
    favoriteShowsIds: string[],
    toggleFavoriteShow: (showId: string) => void,
}

export const FavoriteShowsContext = createContext<FavoriteShowsContextType | null>(null);

export function FavoriteShowsProvider({children} : {children : React.ReactNode}) {
    const [favoriteShowsIds, setFavoriteShowsIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchFavorites = () => {
            const shows = getItem<string[]>(LOCAL_STORAGE_FAVORITE_KEY);

            if(!shows) {
                console.error("No item found with key", LOCAL_STORAGE_FAVORITE_KEY);
                return;
            }
            
            setFavoriteShowsIds(shows);
        }

        fetchFavorites();
    }, []);

    const setFavoriteShow = (showId: string) => {
        const updatedFavorites = [...favoriteShowsIds, showId];
        storeItem<string[]>(LOCAL_STORAGE_FAVORITE_KEY, updatedFavorites);
        setFavoriteShowsIds(updatedFavorites);
    }
    
    const removeFavoriteShow = (showId: string) => {
        const updatedFavorites = favoriteShowsIds.filter(s => s !== showId);
        storeItem<string[]>(LOCAL_STORAGE_FAVORITE_KEY, updatedFavorites);
        setFavoriteShowsIds(updatedFavorites);    
    }

    const toggleFavoriteShow = (showId: string) => {
        if(favoriteShowsIds.includes(showId)) 
            removeFavoriteShow(showId);
        else
            setFavoriteShow(showId); 
    }

    return(
        <FavoriteShowsContext.Provider
            value={{
                favoriteShowsIds,
                toggleFavoriteShow
            }}
        >
            {children}
        </FavoriteShowsContext.Provider>
    )
}