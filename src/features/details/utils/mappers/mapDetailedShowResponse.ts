import type { DetailedShow } from "../../types/detailedShow";
import { mapEpisodeResponse } from "./mapEpisodeResponse";

export function mapDetailedShowResponse(data: any) : DetailedShow {
    return {
        Id: data.id,
        Name: data.name,
        ImageUrl: data.image?.medium ?? null,
        Genres: data.genres,
        // For some show ratings, average is null. To make filtering easier we set these to -1 instead.
        Rating: data.rating.average ?? -1,
        Summary: data.summary,
        Language: data.language,
        Status: data.status,
        Premiered: data.premiered,
        Ended: data.ended,
        EpisodesCount: data._embedded.episodes.length ?? 0,
        TopEpisode: mapEpisodeResponse(data._embedded.episodes.sort((a: any, b: any) => b.rating.average - a.rating.average)[0])
    }
}