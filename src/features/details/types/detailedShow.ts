import type { Show } from "../../shared/types/show"

export type DetailedShow = Show & {
    Summary: string,
    Language: string,
    Status: string,
    Premiered: string,
    Ended: string | null,
}