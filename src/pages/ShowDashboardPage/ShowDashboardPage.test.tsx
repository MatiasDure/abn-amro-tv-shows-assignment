import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShowsDashboardPage from "./ShowsDashboardPage";
import { useShowsBrowse } from "../../features/browse/hooks/useBrowseShows";
import { useShowsSearch } from "../../features/search/hooks/useShowsSearch";
import { useFavoriteShows } from "../../features/favorite/hooks/useFavoriteShows";
import { SHOW_MOCK } from "../../features/shared/utils/mocks/show";

vi.mock("../../features/browse/hooks/useBrowseShows", () => ({
    useShowsBrowse: vi.fn(),
}));

vi.mock("../../features/search/hooks/useShowsSearch", () => ({
    useShowsSearch: vi.fn(),
}));

vi.mock("../../features/favorite/hooks/useFavoriteShows", () => ({
    useFavoriteShows: vi.fn(),
}));

describe("<ShowsDashboardPage />", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const setupCommonMocks = () => {
        vi.mocked(useShowsSearch).mockReturnValue({
            userQuery: "",
            isSearching: false,
            results: [],
            isLoading: false,
            error: null,
            cancelSearch: vi.fn(),
            initializeSearch: vi.fn(),
            updateQuery: vi.fn(),
        });

        vi.mocked(useFavoriteShows).mockReturnValue({
            favoriteShowsIds: [],
            toggleFavoriteShow: vi.fn(),
        });
    };

    it("renders a loading state while shows are being fetched", () => {
        setupCommonMocks();

        vi.mocked(useShowsBrowse).mockReturnValue({
            genreShowMap: [],
            shows: [],
            isLoading: true,
            error: null,
        });

        render(<ShowsDashboardPage />);

        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    it("renders an error state when fetching shows fails", () => {
        setupCommonMocks();

        const errorMessage = "Failed to load shows";

        vi.mocked(useShowsBrowse).mockReturnValue({
            genreShowMap: [],
            shows: [],
            isLoading: false,
            error: errorMessage,
        });

        render(<ShowsDashboardPage />);

        expect(screen.getByTestId("error")).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("renders the search results section when the user is searching", () => {
        vi.mocked(useShowsSearch).mockReturnValue({
            userQuery: "ban",
            isSearching: true,
            results: [],
            isLoading: false,
            error: null,
            cancelSearch: vi.fn(),
            initializeSearch: vi.fn(),
            updateQuery: vi.fn(),
        });

        vi.mocked(useFavoriteShows).mockReturnValue({
            favoriteShowsIds: [],
            toggleFavoriteShow: vi.fn(),
        });

        vi.mocked(useShowsBrowse).mockReturnValue({
            genreShowMap: [],
            shows: [],
            isLoading: false,
            error: null,
        });

        render(
          <MemoryRouter>
            <ShowsDashboardPage />
          </MemoryRouter>
        );

        expect(screen.getByTestId("search-results")).toBeInTheDocument();
    });

    it("renders favorites and genre lists when not searching", () => {
        vi.mocked(useShowsSearch).mockReturnValue({
          userQuery: "",
          isSearching: false,
          results: [],
          isLoading: false,
          error: null,
          cancelSearch: vi.fn(),
          initializeSearch: vi.fn(),
          updateQuery: vi.fn(),
        });

        vi.mocked(useFavoriteShows).mockReturnValue({
          favoriteShowsIds: [SHOW_MOCK.Id.toString()],
          toggleFavoriteShow: vi.fn(),
        });

        vi.mocked(useShowsBrowse).mockReturnValue({
          genreShowMap: [{ Genre: "Drama", Shows: [SHOW_MOCK] }],
          shows: [SHOW_MOCK],
          isLoading: false,
          error: null,
        });

        render(
          <MemoryRouter>
            <ShowsDashboardPage />
          </MemoryRouter>
        );

        expect(screen.getByPlaceholderText("Find Your Show")).toBeInTheDocument();
        expect(
          screen.getByRole("heading", { name: "Favorites" })
        ).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Drama" })).toBeInTheDocument();
        expect(screen.getAllByTestId("show-card").length).toBeGreaterThan(0);
    });
});

