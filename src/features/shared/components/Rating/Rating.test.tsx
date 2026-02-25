import {expect, describe, it} from 'vitest'
import { render, screen} from "@testing-library/react";
import { Rating } from './Rating';

describe("<Rating />", () => {
    it("displays the rating with the value when value >= 0", () => {
        render(<Rating value={8.5} />);
        expect(screen.getByText(8.5)).toBeInTheDocument();
    });

    it("displays the rating with 'N/A' when value < 0", () => {
        render(<Rating value={-1}/>);
        expect(screen.getByText("N/A")).toBeInTheDocument();
        expect(screen.queryByText("-1")).not.toBeInTheDocument();
    });
})
