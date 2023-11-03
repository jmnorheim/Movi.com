import { render as rtlRender, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, it, vi, expect } from "vitest";
import HomePage from "../../../src/pages/HomePage/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

/**
 * @vitest-environment jsdom
 */

/** QueryClient instance */
const queryClient = new QueryClient();

/**
 * Mock implementation for the movieAPI.
 * @returns {Object}
 */
vi.mock("../../../src/services/movieAPI", () => {
  const mockMovies = [
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
      favorited: false,
    },
  ];
  return {
    default: () => Promise.resolve(mockMovies),
  };
});

/**
 * Mock implementation for the AuthContext.
 * @returns {Object}
 */
vi.mock("../../../src/services/auth/AuthContext", () => ({
  useAuth: vi.fn().mockReturnValue({ email: "test@example.com" }),
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
/*
 * Tests HomePage component.
 */
describe("Tests HomePage component", () => {
  it("displays movies after fetching", async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText(/Test Movie 1/)).toBeDefined();
    });
  });

  /*it("Snapshot test", () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });*/
});
