import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react"
import SearchResultsList from "./SearchResultsList";
import { useShowsSearch } from "../../hooks/useShowsSearch";
import { createShowsSearchContextMock } from "../../utils/mocks/createShowsSearchContextMock";
import { API_SEARCHED_SHOWS_MOCK } from "../../utils/mocks/apiSearchedShowsResponse";
import { mapSearchShowResponse } from "../../utils/mappers/mapSearchShowResponse";
import { createLowSimilarityResults } from "../../utils/mocks/createLowSimilarityResults";
import { SIMILIARITY_LOWER_BOUND } from "../../constants/constants";

vi.mock("../../hooks/useShowsSearch", () => ({
    useShowsSearch: vi.fn()
}));

describe("<SearchResultsList />", () => {
    it("shows loading state", () => {
        vi.mocked(useShowsSearch).mockReturnValue(createShowsSearchContextMock({ isLoading: true }));

        render(<SearchResultsList onShowClicked={() => {}}/>);
        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    it("shows error state", () => {
        vi.mocked(useShowsSearch).mockReturnValue(createShowsSearchContextMock({ error: "Something happened!" }));

        render(<SearchResultsList onShowClicked={() => {}}/>);
        expect(screen.getByTestId("error")).toBeInTheDocument();
    });

    it("filters out results with no rating", () => {
        vi.mocked(useShowsSearch).mockReturnValue(createShowsSearchContextMock({ results: API_SEARCHED_SHOWS_MOCK.map(s => mapSearchShowResponse(s))}));

        render(<SearchResultsList onShowClicked={() => {}}/>);
        expect(screen.queryByText("N/A")).not.toBeInTheDocument();
    });

    it(`filters out results with similarity score less than lower boundary: ${SIMILIARITY_LOWER_BOUND}`, () => {
        vi.mocked(useShowsSearch).mockReturnValue(
            createShowsSearchContextMock({
                results: createLowSimilarityResults(5)
            })
        );

        render(<SearchResultsList onShowClicked={() => {}} />);
        expect(screen.queryByTestId("show-card")).not.toBeInTheDocument();
    });

});