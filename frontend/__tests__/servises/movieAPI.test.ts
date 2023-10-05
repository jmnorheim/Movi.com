import { describe, expect, it } from "vitest";
import movieAPI from "../../src/services/movieAPI";

describe("movieAPI", () => {
  it("should resolve with an array of movies when called with no parameters", async () => {
    const result = await movieAPI();
    expect(result).toBeDefined();
    if (Array.isArray(result)) {
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("imdbID");
    } else {
      expect(result).toHaveProperty("imdbID");
    }
  });
});
