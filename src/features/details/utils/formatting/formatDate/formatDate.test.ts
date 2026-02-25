import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
    it("returns 'N/A' when dateString is null or undefined", () => {
        expect(formatDate(null)).toBe("N/A");
        expect(formatDate(undefined)).toBe("N/A");
    });

    it("returns 'Invalid date' when dateString is not a valid date", () => {
        expect(formatDate("not-a-date")).toBe("Invalid date");
    });

    it("formats a valid date in US short format", () => {
        const result = formatDate("2021-02-17");
        expect(result).toBe("Feb 17, 2021");
    });
});
