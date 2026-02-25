import type { ShowsSearchContextType } from "../../context/ShowsSearchContext";
import { vi } from "vitest"

export function createShowsSearchContextMock(
  overrides: Partial<ShowsSearchContextType> = {}
): ShowsSearchContextType {
  return {
    userQuery: "",
    isSearching: false,
    results: [],
    isLoading: false,
    error: null,
    cancelSearch: vi.fn(),
    initializeSearch: vi.fn(),
    updateQuery: vi.fn(),
    ...overrides
  };
}
