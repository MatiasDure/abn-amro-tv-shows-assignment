import { Heart, Star } from "lucide-react"
import type { Show } from "../../types/show"
import { useFavoriteShows } from "../../../favorite/hooks/useFavoriteShows"
import "./ShowCard.scss"

type ShowCardProps = {
    show: Show,
    onCardClicked: (show: Show) => void
}

export default function ShowCard({show, onCardClicked} : ShowCardProps) {
    const favoriteShows = useFavoriteShows();

    if(!favoriteShows)
        console.error("Error loading favorite shows");

    const isShowFavorite = favoriteShows?.favoriteShowsIds.includes(show.Id.toString());

    return (
        <li className="show-card">
            <button className="show-card__poster-button" onClick={() => onCardClicked(show)}>
                <img className="show-card__poster" src={show.ImageUrl} />
            </button>
            <div className="show-card__info">
                <span className="show-card__rating-container">
                    <Star className="show-card__rating-icon" />
                    <span>{show.Rating}</span> 
                </span>
                    <button onClick={() => favoriteShows?.toggleFavoriteShow(show.Id.toString())}>
                        <Heart 
                            className="show-card__favorite-button"
                            color={isShowFavorite ? "#f56565" : "black"}
                            fill={isShowFavorite ? "#f56565" : "transparent"}
                        />
                    </button>
            </div>
        </li>
    )
}