import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HorizontalShowList from "./HorizontalShowList";
import { useDivScroll } from "../../hooks/useDivScroll";

vi.mock("../../hooks/useDivScroll");

const mockUseDivScroll = vi.mocked(useDivScroll);

const mockShows = [
  { Id: 1, Name: "Show A", ImageUrl: null, Genres: [], Rating: 7 }
];

describe("HorizontalShowList", () => {
    beforeEach(() => {
        mockUseDivScroll.mockReturnValue({
            canScrollLeft: false,
            canScrollRight: false,
            scrollLeft: vi.fn(),
            scrollRight: vi.fn()
        });
    });

    it("renders the title", () => {
        render(
            <HorizontalShowList
                title="Popular Shows"
                shows={mockShows}
                emptyListFallback="Nothing here"
                onShowClicked={() => {}}
            />
        );

        expect(screen.getByText("Popular Shows")).toBeInTheDocument();
    });

    it("renders fallback when list is empty", () => {
        render(
            <HorizontalShowList
                title="Empty"
                shows={[]}
                emptyListFallback="No shows available"
                onShowClicked={() => {}}
            />
        );

        expect(screen.getByText("No shows available")).toBeInTheDocument();
    });

    it("renders show cards when list is not empty", () => {
        render(
            <HorizontalShowList
                title="Shows"
                shows={mockShows}
                emptyListFallback="Empty"
                onShowClicked={() => {}}
            />
        );

        expect(screen.getAllByTestId("show-card").length).toBe(1);
        expect(screen.getByText("7")).toBeInTheDocument();
    });

    it("shows right scroll button when canScrollRight is true", () => {
        mockUseDivScroll.mockReturnValue({
            canScrollLeft: false,
            canScrollRight: true,
            scrollLeft: vi.fn(),
            scrollRight: vi.fn()
        });

        render(
            <HorizontalShowList
                title="Shows"
                shows={mockShows}
                emptyListFallback="Empty"
                onShowClicked={() => {}}
            />
        );

        expect(screen.getByTestId("right-scroll-button")).toBeInTheDocument();
        expect(screen.queryByTestId("left-scroll-button")).not.toBeInTheDocument();
    });
    
    it("shows left scroll button when canScrollLeft is true", () => {
        mockUseDivScroll.mockReturnValue({
            canScrollLeft: true,
            canScrollRight: false,
            scrollLeft: vi.fn(),
            scrollRight: vi.fn()
        });
        
        render(
            <HorizontalShowList
                title="Shows"
                shows={mockShows}
                emptyListFallback="Empty"
                onShowClicked={() => {}}
            />
        );
        
        expect(screen.getByTestId("left-scroll-button")).toBeInTheDocument();
        expect(screen.queryByTestId("right-scroll-button")).not.toBeInTheDocument();
    });

    it("calls scrollRight when right button is clicked", () => {
        const scrollRight = vi.fn();

        mockUseDivScroll.mockReturnValue({
        canScrollLeft: false,
        canScrollRight: true,
        scrollLeft: vi.fn(),
        scrollRight
        });

        render(
            <HorizontalShowList
                title="Shows"
                shows={mockShows}
                emptyListFallback="Empty"
                onShowClicked={() => {}}
            />
        );

        const button = screen.getByTestId("right-scroll-button");
        fireEvent.click(button);

        expect(scrollRight).toHaveBeenCalled();
    });

    it("calls scrollLeft when left button is clicked", () => {
        const scrollLeft = vi.fn();

        mockUseDivScroll.mockReturnValue({
            canScrollLeft: true,
            canScrollRight: false,
            scrollLeft,
            scrollRight: vi.fn() 
        });

        render(
            <HorizontalShowList
                title="Shows"
                shows={mockShows}
                emptyListFallback="Empty"
                onShowClicked={() => {}}
            />
        );

        const button = screen.getByTestId("left-scroll-button");
        fireEvent.click(button);

        expect(scrollLeft).toHaveBeenCalled();
    });

    it("calls onShowClicked when a show card is clicked", () => {
        const onShowClicked = vi.fn();

        render(
            <HorizontalShowList
                title="Shows"
                shows={mockShows}
                emptyListFallback="Empty"
                onShowClicked={onShowClicked}
            />
        );

        fireEvent.click(screen.getByTestId("poster-button"));

        expect(onShowClicked).toHaveBeenCalledWith(mockShows[0]);
    });
});
