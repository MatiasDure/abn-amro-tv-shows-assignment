import { describe, vi, it, expect, beforeEach } from "vitest";
import { getShowsByQuery } from "../api/getShowsByQuery";
import { renderHook, act } from "@testing-library/react";
import { ShowsSearchProvider } from "../context/ShowsSearchContext";
import { useShowsSearch } from "./useShowsSearch";
import { SEARCH_DEBOUNCE_MS } from "../constants/constants";
import { API_SEARCHED_SHOWS_MOCK } from "../utils/mocks/apiSearchedShowsResponse";

vi.mock("../api/getShowsByQuery");

describe("useShowsSearch", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    const contextWrapper = ({ children }: { children: React.ReactNode }) => (
        <ShowsSearchProvider>{children}</ShowsSearchProvider>
    );

    it("fetches and maps results after updating query", async () => {
        vi.mocked(getShowsByQuery).mockResolvedValue(API_SEARCHED_SHOWS_MOCK);
        
        const { result } = renderHook(() => useShowsSearch(), { wrapper: contextWrapper });

        act(() => { result.current?.updateQuery("test"); });

        act(() => { vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS); });

        await act( async () => { vi.runAllTicks() });
        
        expect(result.current?.results.length).toBe(10);
    })
});
