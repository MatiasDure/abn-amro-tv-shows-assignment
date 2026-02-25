import { describe, it, expect } from "vitest";
import { removeHtmlTags } from "./removeHtmlTags";

describe("removeHtmlTags", () => {
    it("removes HTML tags and keeps text content", () => {
        expect(removeHtmlTags("<p>Hello</p>")).toBe("Hello");
    });

    it("removes nested HTML tags", () => {
        expect(removeHtmlTags("<div><span>Test</span></div>")).toBe("Test");
    });

    it("returns empty string for empty HTML", () => {
        expect(removeHtmlTags("")).toBe("");
    });
});
