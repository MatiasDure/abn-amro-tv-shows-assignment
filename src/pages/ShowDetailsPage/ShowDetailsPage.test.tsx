import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ShowDetailsPage from "./ShowDetailsPage";
import { ERROR_FETCH_FAILED, ERROR_NO_ID } from "../../features/shared/constants/messages";
import { useShowDetails } from "../../features/details/hooks/useShowDetails";
import { mapDetailedShowResponse } from "../../features/details/utils/mappers/mapDetailedShowResponse";
import { API_DETAILED_SHOW_MOCK } from "../../features/details/utils/mocks/apiDetailedShowResponse";

vi.mock("../../features/details/hooks/useShowDetails", () => ({
  useShowDetails: vi.fn(),
}));

describe("<ShowDetailsPage />", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderWithRouter = (route: string) =>
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/show" element={<ShowDetailsPage />} />
                    <Route path="/show/:id" element={<ShowDetailsPage />} />
                </Routes>
            </MemoryRouter>
        );

    it("shows an error when there is no id in the url", () => {
        renderWithRouter("/show");

        expect(screen.getByTestId("error")).toBeInTheDocument();
        expect(screen.getByText(ERROR_NO_ID)).toBeInTheDocument();
    });

    it("renders a loading state while show details are being fetched", () => {
        vi.mocked(useShowDetails).mockReturnValue({
            result: null,
            isLoading: true,
            error: null,
        });

        renderWithRouter("/show/1");

        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    it("renders an error when fetching details fails", () => {
        vi.mocked(useShowDetails).mockReturnValue({
            result: null,
            isLoading: false,
            error: ERROR_FETCH_FAILED,
        });

        renderWithRouter("/show/1");

        expect(screen.getByTestId("error")).toBeInTheDocument();
        expect(screen.getByText(ERROR_FETCH_FAILED)).toBeInTheDocument();
    });

    it("renders an error when no result is returned for the show", () => {
        vi.mocked(useShowDetails).mockReturnValue({
        result: null,
        isLoading: false,
        error: null,
        });

        renderWithRouter("/show/1");

        expect(screen.getByTestId("error")).toBeInTheDocument();
        expect(screen.getByText(ERROR_FETCH_FAILED)).toBeInTheDocument();
    });

    it("renders show details when data is available", () => {
        vi.mocked(useShowDetails).mockReturnValue({
            result: mapDetailedShowResponse({...API_DETAILED_SHOW_MOCK, summary: "some summary"}),
            isLoading: false,
            error: null,
        });

        renderWithRouter("/show/1");

        expect(screen.getByRole("heading", { name: API_DETAILED_SHOW_MOCK.name })).toBeInTheDocument();
        expect(screen.queryByText("some summary")).toBeInTheDocument();

        expect(screen.getByText("Top Rated")).toBeInTheDocument();
    });
});

