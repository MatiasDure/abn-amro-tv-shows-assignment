import { mapShowResponse } from "../../../shared/mappers/mapShowResponse";
import type { SearchedShow } from "../../types/searchedShow";

export function mapSearchShowResponse(data: any) : SearchedShow {
    return {
        QuerySimiliarityScore: data.score,
        Show: mapShowResponse(data.show)
    }
}