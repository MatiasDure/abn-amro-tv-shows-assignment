// import type { Show } from "../../../shared/types/show"
import { Heart, Star } from "lucide-react"
import type { Show } from "../types/show"
import { useFavoriteShows } from "../../favorite/hooks/useFavoriteShows"

type ShowCardProps = {
    show: Show,
    onCardClicked: (show: Show) => void
}

export default function ShowCard({show, onCardClicked} : ShowCardProps) {
    const favoriteShows = useFavoriteShows();

    if(!favoriteShows) {
        console.error("Error loading favorite shows");
    }

    return (
        <div
            style={{
                position: "relative",
                scrollSnapAlign: "start"
            }}
        >
            <button
                onClick={() => onCardClicked(show)}
                style={{ border: "none", background: "none" }}
                >
                <img src={show.ImageUrl} />
            </button>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        fontSize: 20,
                        backgroundColor: "rgba(0,0,0,0.7)",
                        color: "white",
                        padding: 6,
                        borderRadius: 8
                    }}
                    >
                    <Star 
                        color="gold"    
                    />
                    <span>{show.Rating}</span> 
                </span>
                    <Heart 
                        onClick={() => favoriteShows?.toggleFavoriteShow(show.Id.toString())}
                        color={favoriteShows?.favoriteShows.includes(show.Id.toString()) ? "#f56565" : "black"}
                        size={28}
                        fill={favoriteShows?.favoriteShows.includes(show.Id.toString()) ? "#f56565" : "transparent"}
                    />
            </div>
        </div>
    )
}