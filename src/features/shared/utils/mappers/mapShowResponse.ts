import type { Show } from "../../types/show";

export function mapShowResponse(data: any) : Show {
    return {
        Id: data.id,
        Name: data.name,
        ImageUrl: data.image?.medium ?? null,
        Genres: data.genres,
        Rating: data.rating.average ?? -1,
    }
}