import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useWindowSize } from "./useWindowSize";

describe("useWindowSize", () => {
  it("returns the initial window size", () => {
    window.innerWidth = 800;
    window.innerHeight = 600;

    const { result } = renderHook(() => useWindowSize());

    expect(result.current.Width).toBe(800);
    expect(result.current.Height).toBe(600);
  });

  it("updates when the window is resized", () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.innerWidth = 1024;
      window.innerHeight = 768;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.Width).toBe(1024);
    expect(result.current.Height).toBe(768);
  });
});
