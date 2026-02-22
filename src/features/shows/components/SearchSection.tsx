import { useState } from "react";
import { useShowsSearch } from "../hooks/useShowsSearch";
import SearchBar from "../../../shared/components/SearchBar";

type SearchSectionProps = {
    query: string
}

export default function SearchSection({query} : SearchSectionProps) {
    const {shows, errors, isLoading} = useShowsSearch(query);

    return(
        <>
            {query}
        </>
    )
}