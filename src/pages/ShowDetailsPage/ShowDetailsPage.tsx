import { useParams, useNavigate } from "react-router-dom";
import { useShowDetails } from "../../features/details/hooks/useShowDetails";
import "./ShowDetailsPage.scss"
import { createShowDetailsMetaListItems } from "../../features/details/utils/mappers/createMetaListItems";
import { MetaList } from "../../features/shared/components/MetaList/MetaList";
import { Rating } from "../../features/shared/components/Rating/Rating";
import { FavoriteToggle } from "../../features/shared/components/FavoriteToggle/FavoriteToggle";
import { useFavoriteShows } from "../../features/favorite/hooks/useFavoriteShows";
import { Loading } from "../../features/shared/components/Loading/Loading";
import { ErrorFallback } from "../../features/shared/components/Error/ErrorFallback";
import { ERROR_FETCH_FAILED, ERROR_NO_ID } from "../../features/shared/constants/messages";
import { removeHtmlTags } from "../../features/details/utils/formatting/removeHtmlTags/removeHtmlTags";
import { ArrowLeft } from "lucide-react";
import EpisodeCard from "../../features/details/components/EpisodeCard/EpisodeCard";

export default function ShowDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const favoriteShows = useFavoriteShows();
  
  if(!id) return <ErrorFallback message={ERROR_NO_ID}/>
  
  const {result, isLoading, error} = useShowDetails(id)!;
  
  if(isLoading) return <Loading />
  if(error) return <ErrorFallback message={error}/>
  if(!result) return <ErrorFallback message={ERROR_FETCH_FAILED}/>
  
  const isFavoriteShow = favoriteShows ? favoriteShows.favoriteShowsIds.includes(id) : false;

  return (
    <div className="show-details">
      <button className="show-details__back-button" onClick={() => navigate(-1)}>
        <ArrowLeft className="show-details__back-button-icon"/>
      </button>

      <div className="show-details__header">
        <img className="show-details__poster" src={result?.ImageUrl ?? undefined} />

        <div className="show-details__info">
          <h1 className="show-details__title">{result?.Name}</h1>

          <div className="show-details__meta">
            <Rating value={result?.Rating} />
            <FavoriteToggle isFavorite={isFavoriteShow} onToggle={() => favoriteShows?.toggleFavoriteShow(id)}/>
          </div>
          <MetaList metaListItems={createShowDetailsMetaListItems(result)} />
        </div>
      </div>

      <p className="show-details__summary">{removeHtmlTags(result?.Summary)}</p>
      {
          result?.TopEpisode && 
          (
            <div>
              <h2 style={{marginBottom: "1rem"}}>Top Rated</h2>
              <div className="show-details__episode-card"> 
                <EpisodeCard episode={result?.TopEpisode}/>
              </div>
            </div>
          )
      }
    </div>
  );
}
