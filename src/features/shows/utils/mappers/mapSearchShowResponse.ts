import type { SearchedShow } from "../../types/searchedShow";
import { mapShowResponse } from "./mapShowResponse";

export function mapSearchShowResponse(data: any) : SearchedShow {
    return {
        QuerySimiliarityScore: data.score,
        Show: mapShowResponse(data.show)
    }
}