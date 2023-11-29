import { render as rtlRender, screen } from "@testing-library/react";
import React from "react";
import { describe, it, vi, expect } from "vitest";
import MovieContainerGrid from "../../../src/components/movieContainerGrid/MovieContainerGrid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { MovieContent } from "../../../src/interfaces";

/**
 * @vitest-environment jsdom
 */

/** Mocked movie */
const mockMovies: MovieContent[] = [
  {
    imdbID: "1",
    primaryTitle: "Test Movie 1",
    originalTitle: "Original Test Movie 1",
    isAdult: false,
    startYear: 2022,
    runtimeMinutes: 120,
    genres: ["Drama"],
    averageRating: 8.5,
    totalVotes: 2000,
    poster: "https://example.com/testmovie1.jpg",
  },
];

/** Mocked onToggleFavorite function */
const mockToggleFavorite = vi.fn();

/** QueryClient instance */
const queryClient = new QueryClient();

/** Mocked useAuth hook */
vi.mock("../../../src/services/auth/AuthContext", () => ({
  useAuth: vi.fn().mockReturnValue({ isLoggedIn: true }),
}));

/**
 * Render component with necessary providers.
 * @param {React.ReactElement} ui
 */
function render(ui: React.ReactElement) {
  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
}

/**
 * Test Moviecontainergrid + Moviecontainer.
 */
describe("Test Moviecontainergrid + Moviecontainer", () => {
  /**
   * Test that MovieContainerGrid renders movies correctly.
   */
  it("renders MovieContainerGrid with movies", async () => {
    render(<MovieContainerGrid movies={mockMovies} />);
    const element = await screen.findByText(/Test Movie 1/);
    expect(element).toBeDefined();
  });
});
