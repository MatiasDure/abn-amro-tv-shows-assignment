import type { Show } from "../../types/show"
import { useFavoriteShows } from "../../../favorite/hooks/useFavoriteShows"
import "./ShowCard.scss"
import { Rating } from "../Rating/Rating"
import { FavoriteToggle } from "../FavoriteToggle/FavoriteToggle"

type ShowCardProps = {
    show: Show,
    onCardClicked: (show: Show) => void
}

export default function ShowCard({show, onCardClicked} : ShowCardProps) {
    const favoriteShows = useFavoriteShows();

    if(!favoriteShows)
        console.error("Error loading favorite shows");

    const isShowFavorite = favoriteShows?.favoriteShowsIds.includes(show.Id.toString()) ?? false;

    return (
        <li className="show-card" data-testid="show-card">
            <button className="show-card__poster-button" data-testid="poster-button" onClick={() => onCardClicked(show)}>
                <img className="show-card__poster" src={show.ImageUrl ?? undefined} />
            </button>
            <div className="show-card__info">
                <Rating value={show.Rating}/>
                <FavoriteToggle 
                    isFavorite={isShowFavorite} 
                    onToggle={() => favoriteShows?.toggleFavoriteShow(show.Id.toString())}
                />
            </div>
        </li>
    )
}