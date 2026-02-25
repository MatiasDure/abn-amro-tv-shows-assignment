import type { Show } from "../../shared/types/show"
import type { Episode } from "./episode"

export type DetailedShow = Show & {
    Summary: string,
    Language: string,
    Status: string,
    Premiered: string,
    Ended: string | null,
    EpisodesCount: number,
    TopEpisode: Episode | null
}