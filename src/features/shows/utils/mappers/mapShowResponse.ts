import type { Show } from "../../types/show";

export function mapShowResponse(data: any) : Show {
    return {
        Id: data.id,
        Name: data.name,
        Summary: data.summary,
        Language: data.language,
        ImageUrl: data.image?.medium ?? null,
        Genres: data.genres,
        // For some show ratings, average is null. To make filtering easier we set these to -1 instead.
        Rating: data.rating.average ?? -1,
        Status: data.status
    }
}