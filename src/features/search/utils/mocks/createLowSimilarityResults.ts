import { SIMILIARITY_LOWER_BOUND } from "../../constants/constants";
import type { SearchedShow } from "../../types/searchedShow";

export function createLowSimilarityResults(count: number = 3): SearchedShow[] {
  return Array.from({ length: count }).map((_, i) => ({
    QuerySimiliarityScore: SIMILIARITY_LOWER_BOUND - 1,
    Show: {
      Id: i + 1,
      Name: `Low Similarity Show ${i + 1}`,
      ImageUrl: null,
      Genres: [],
      Rating: 7
    }
  }));
}
