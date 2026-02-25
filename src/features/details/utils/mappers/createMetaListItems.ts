import type { MetaInfo } from "../../../shared/types/metaInfo";
import type { DetailedShow } from "../../types/detailedShow";
import { formatDate } from "../formatting/formatDate/formatDate";

export function createShowDetailsMetaListItems(show: DetailedShow) : MetaInfo[] {
    return [ 
        { label: "Language", info: show.Language }, 
        { label: "Status", info: show.Status }, 
        { label: "Premiered", info: formatDate(show.Premiered)}, 
        { label: "Ended", info: formatDate(show.Ended) ?? "—" }, 
        { label: "Genres", info: show.Genres.join(", ")},
        { label: "Episodes", info: show.EpisodesCount.toString()},
    ];
}