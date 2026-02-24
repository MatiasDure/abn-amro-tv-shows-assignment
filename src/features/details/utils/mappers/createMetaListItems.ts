import type { MetaInfo } from "../../../shared/types/metaInfo";
import type { DetailedShow } from "../../types/detailedShow";

export function createShowDetailsMetaListItems(show: DetailedShow) : MetaInfo[] {
    return [ 
        { label: "Language", info: show.Language }, 
        { label: "Status", info: show.Status }, 
        { label: "Premiered", info: show.Premiered }, 
        { label: "Ended", info: show.Ended ?? "—" }, 
        { label: "Genres", info: show.Genres.join(", ")}
    ];
}