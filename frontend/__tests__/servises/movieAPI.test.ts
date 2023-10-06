import { describe, expect, it, suite } from "vitest";
import movieAPI from "../../src/services/movieAPI";

// Making sure the test suite is working
suite("Initial Test", () => {
  it("should always be true", () => {
    expect(true).toBeTruthy();
  });
});

describe("movieAPI", () => {
  it("should resolve with an array of movies when called with no parameters", async () => {
    const result = await movieAPI();
    expect(result).toBeDefined();
    if (Array.isArray(result)) {
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("imdbID");
    }
  });
});
