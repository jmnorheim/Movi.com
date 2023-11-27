import { calculateSimilarity } from "../../src/recommended";
import { describe, it, expect } from "vitest";
import { Movie } from "../../generated/resolvers-types";

/**
 * Test if calculateSimilarity computes similarity correctly.
 */
describe("Recommended test backend", () => {
  it("calculateSimilarity computes similarity correctly", () => {
    const movie1: Movie = {
        imdbID: "1",
        primaryTitle: "Movie 1",
        genres: ["Action", "Adventure"],
        averageRating: 0,
        isAdult: false,
        originalTitle: "",
        runtimeMinutes: 0,
        startYear: 0,
        totalVotes: 0
    };

    const movie2: Movie = {
        imdbID: "2",
        primaryTitle: "Movie 2",
        genres: ["Action", "Adventure"],
        averageRating: 0,
        isAdult: false,
        originalTitle: "",
        runtimeMinutes: 0,
        startYear: 0,
        totalVotes: 0
    };

    const similarity = calculateSimilarity(movie1, movie2);

    // Use toBeCloseTo to check for approximate equality.
    expect(similarity).toBeCloseTo(1, 6);
  });
});
