import {expect, describe, it, vi} from 'vitest'
import { render, screen} from "@testing-library/react";
import ShowCard from "./ShowCard";
import { SHOW_MOCK } from "../../utils/mocks/show";

describe("<ShowCard />", () => {
    it("renders poster image", () => {
        render(<ShowCard show={SHOW_MOCK} onCardClicked={() => {}} />);
        
        const img = screen.getByRole("img");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", SHOW_MOCK.ImageUrl);
    });
    
    it("calls onCardClick when clicked", () => {
        const onClick = vi.fn();
        render(<ShowCard show={SHOW_MOCK} onCardClicked={onClick} />);
        
        screen.getByTestId("poster-button").click();
        expect(onClick).toHaveBeenCalledWith(SHOW_MOCK);
    });
    
    it("displays the rating", () => {
        render(<ShowCard show={SHOW_MOCK} onCardClicked={() => {}} />);
        expect(screen.getByText(SHOW_MOCK.Rating)).toBeInTheDocument();
    });
})
