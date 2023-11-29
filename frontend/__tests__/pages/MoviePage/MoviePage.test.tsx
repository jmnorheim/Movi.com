import React from "react";
import { render as rtlRender, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, vi, expect } from "vitest";
import LibraryPage from "../../../src/pages/LibraryPage/LibraryPage";
import { AuthProvider } from "../../../src/services/auth/AuthContext";
import MoviePage from "../../../src/pages/MoviePage/MoviePage";
import Module from "module";

/**
 * @vitest-environment jsdom
 */

/** Overrides default window alert with mock function. */
window.alert = vi.fn();

/**
 * Mocks `useMoviesInByLibraryIDQuery` to provide predefined movie data.
 */
vi.mock("../../../src/services/getMovies.ts", () => ({
  useMovie: () => ({ data: mockMovie }),
}));

/**
 * Mocks `useAuth` to simulate an authenticated user context.
 */
vi.mock("../../../src/services/auth/AuthContext.tsx", async () => {
  const actual: Module = await vi.importActual(
    "../../../src/services/auth/AuthContext.tsx"
  );
  return {
    ...actual,
    useAuth: () => ({ userID: "user123", isAuthenticated: true }),
  };
});

// Also defines `mockMovies`, an array of mock movie data used in tests.
const mockMovie = {
  imdbID: "tt0111161",
  primaryTitle: "The Shawshank Redemption",
  averageRating: 9.3,
  runtimeMinutes: 142,
  poster: "https://example.com/poster/shawshank.jpg",
};

/** QueryClient instance */
const queryClient = new QueryClient();

/**
 * Render component with necessary providers.
 * @param {React.ReactElement} ui
 */
function render(ui: React.ReactElement, { route = "/movies/tt0111161" } = {}) {
  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/movies/:movieId" element={ui} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

/**
 * Tests MoviePage.
 */
describe("MoviePage Component", () => {
  /**
   * Tests rendering of movies.
   */
  it("renders 'Add To Library' on MoviePage", async () => {
    render(<MoviePage />, { route: "/movies/tt0111161" });
    expect(screen.getByText("Add To Library")).toBeDefined();
  });

  /**
   * Snapshot test.
   */
  /*it("should match the snapshot", () => {
    const { asFragment } = render(<MoviePage />);
    expect(asFragment()).toMatchSnapshot();
  });*/
});
