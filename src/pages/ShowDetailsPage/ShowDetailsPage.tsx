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
import { removeHtmlTags } from "../../features/details/utils/formatting/removeHtmlTags";
import { ArrowLeft } from "lucide-react";

export default function ShowDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  if(!id) return <ErrorFallback message={ERROR_NO_ID}/>

  const {result, isLoading, error} = useShowDetails(id)!;
  
  if(isLoading) return <Loading />
  if(error) return <ErrorFallback message={error}/>
  if(!result) return <ErrorFallback message={ERROR_FETCH_FAILED}/>
  
  const favoriteShows = useFavoriteShows()!;
  const isFavoriteShow = favoriteShows.favoriteShowsIds.includes(id);

  return (
    <div className="show-details">
      <button className="show-details__back-button" onClick={() => navigate(-1)}>
        <ArrowLeft className="show-details__back-button-icon"/>
      </button>

      <div className="show-details__header">
        <img className="show-details__poster" src={result?.ImageUrl} />

        <div className="show-details__info">
          <h1 className="show-details__title">{result?.Name}</h1>

          <div className="show-details__meta">
            <Rating value={result?.Rating.toString()} />
            <FavoriteToggle isFavorite={isFavoriteShow} onToggle={() => favoriteShows.toggleFavoriteShow(id)}/>
          </div>
          <MetaList metaListItems={createShowDetailsMetaListItems(result)} />
        </div>
      </div>

      <p className="show-details__summary">{removeHtmlTags(result?.Summary)}</p>
    </div>
  );
}
