import { describe, it, expect } from "vitest";
import { mapShowResponse } from "./mapShowResponse";
import { API_INDIVIDUAL_SHOW_MOCK } from "../mocks/apiIndividualShowResponse";
import type { Show } from "../../types/show";

describe("mapShowResponse", () => {
    it("maps a full API response correctly", () => {
        const result: Show = mapShowResponse(API_INDIVIDUAL_SHOW_MOCK);

        expect(result).toEqual({
            Id: 1,
            Name: "Under the Dome",
            ImageUrl: "https://static.tvmaze.com/uploads/images/medium_portrait/610/1525272.jpg",
            Genres: ["Drama", "Science-Fiction", "Thriller"],
            Rating: 6.6
        });
    });

    it("sets Rating to -1 when rating.average is null", () => {
        const result: Show = mapShowResponse({...API_INDIVIDUAL_SHOW_MOCK, rating: { average: null} });
        expect(result.Rating).toBe(-1);
    });

    it("sets ImageUrl to null when image is missing", () => {
        const result: Show = mapShowResponse({...API_INDIVIDUAL_SHOW_MOCK, image: null});
        expect(result.ImageUrl).toBeNull();
    });
});
