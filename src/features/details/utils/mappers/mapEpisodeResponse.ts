import type { Episode } from "../../types/episode";

export function mapEpisodeResponse(data: any) : Episode {
    return {
        Id: data.id,
        Name: data.name,
        Rating: data.rating.average,
        Airdate: data.airdate,
        Summary: data.summary,
        Season: data.season,
        EpisodeNumber: data.number
    }
}