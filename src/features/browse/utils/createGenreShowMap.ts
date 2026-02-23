import type { Show } from "../../shared/types/show";
import type { GenreShows } from "../types/genreShow";

export function createGenreShowMap(shows: Show[]): GenreShows[] {
  if (shows.length === 0) return [];

  const map = new Map<string, Show[]>();

  for (const show of shows) {
    for (const genre of show.Genres) {
      if (!map.has(genre)) {
        map.set(genre, []);
      }
      map.get(genre)!.push(show);
    }
  }

  for (const [genre, list] of map.entries()) {
    list.sort((a, b) => b.Rating - a.Rating);
    map.set(genre, list);
  }

  const sortedGenreShows = Array
    .from(map, ([Genre, Shows]) => ({ Genre, Shows }))
    .sort((a, b) => b.Shows.length - a.Shows.length);

  return sortedGenreShows.splice(0, Math.min(5, sortedGenreShows.length))
}
