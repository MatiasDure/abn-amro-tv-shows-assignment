import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FavoriteToggle } from "./FavoriteToggle";

describe("<FavoriteToggle />", () => {
    it("uses the correct colors when it is favorite", () => {
        render(<FavoriteToggle isFavorite={true} onToggle={() => {}}/>);
        const icon = screen.getByTestId("favorite-icon");
        
        expect(icon).toHaveAttribute("stroke", "#f56565"); 
        expect(icon).toHaveAttribute("fill", "#f56565");
    });
    
    it("uses the correct colors when it is not favorite", () => {
        render(<FavoriteToggle isFavorite={false} onToggle={() => {}}/>)
        const icon = screen.getByTestId("favorite-icon");
    
        expect(icon).toHaveAttribute("stroke", "black"); 
        expect(icon).toHaveAttribute("fill", "transparent");
    });
});