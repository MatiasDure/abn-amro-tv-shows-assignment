import { renderHook } from "@testing-library/react";
import { FavoriteShowsProvider } from "../context/FavoriteShowsContext";
import { useFavoriteShows } from "../hooks/useFavoriteShows";
import { LOCAL_STORAGE_FAVORITE_KEY } from "../constants/constants";
import { describe, expect, it } from "vitest";

describe("FavoriteShowsProvider", () => {
    it("loads favorites from localStorage on mount", () => {
        localStorage.setItem(LOCAL_STORAGE_FAVORITE_KEY, JSON.stringify(["1", "2"]));

        const wrapper = ({ children } : { children: React.ReactNode}) => (
            <FavoriteShowsProvider>{children}</FavoriteShowsProvider>
        );

        const { result } = renderHook(() => useFavoriteShows(), { wrapper });

        expect(result.current?.favoriteShowsIds).toEqual(["1", "2"]);
    });
});
