import "./EpisodeCard.scss";
import type { Episode } from "../../types/episode";
import { formatDate } from "../../utils/formatting/formatDate/formatDate";
import { Rating } from "../../../shared/components/Rating/Rating";
import { removeHtmlTags } from "../../utils/formatting/removeHtmlTags/removeHtmlTags";

type EpisodeCardProps = {
  episode: Episode;
};

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <>
      <div className="episode-card__header">
        <div className="episode-card__info">
          <div className="episode-card__title">
            <span>S{episode.Season}.E{episode.EpisodeNumber}</span>
            <span>{episode.Name}</span>
          </div>
          <span className="episode-card__airdate">
            {formatDate(episode.Airdate)}
          </span>
        </div>

        <div className="episode-card__rating">
          <Rating value={episode.Rating} />
        </div>
      </div>

      <div className="episode-card__summary">
        <p>{removeHtmlTags(episode.Summary)}</p>
      </div>
    </>
  );
}
