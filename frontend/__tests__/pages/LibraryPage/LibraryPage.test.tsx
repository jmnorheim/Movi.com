import React from "react";
import { render as rtlRender, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, vi, expect, test } from "vitest";
import LibraryPage from "../../../src/pages/LibraryPage/LibraryPage";
import { AuthProvider } from "../../../src/services/auth/AuthContext";
import Module from "module";

/**
 * @vitest-environment jsdom
 */

/** Overrides default window alert with mock function. */
window.alert = vi.fn();

/**
 * react-router-dom`: Mocks `useParams` and `useNavigate` hooks for routing.
 */
vi.mock("react-router-dom", async () => {
  const actual: Module = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ libraryProp: "library123 : My Library" }),
    useNavigate: () => vi.fn(),
  };
});

/**
 * Mocks `useMoviesInByLibraryIDQuery` to provide predefined movie data.
 */
vi.mock("../../../src/services/getMovies.ts", () => ({
  useMoviesInByLibraryIDQuery: () => ({ data: mockMovies, isLoading: false }),
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

/**
 * Mocks `useRemoveMovieFromLibrary` with a spy function for `mutate`.
 */
vi.mock("../../../src/services/removeMovieFromLibrary.ts", () => ({
  useRemoveMovieFromLibrary: () => ({
    mutate: vi.fn(),
  }),
}));

/**
 * Mocks `useRemoveLibrary` with a spy function for `mutate`.
 */
vi.mock("../../../src/services/removeLibrary.ts", () => ({
  useRemoveLibrary: () => ({
    mutate: vi.fn(),
  }),
}));

// Also defines `mockMovies`, an array of mock movie data used in tests.
const mockMovies = [
  {
    imdbID: "tt0111161",
    primaryTitle: "The Shawshank Redemption",
    averageRating: 9.3,
    runtimeMinutes: 142,
    poster: "https://example.com/poster/shawshank.jpg",
  },
];

/** QueryClient instance */
const queryClient = new QueryClient();

/**
 * Render component with necessary providers.
 * @param {React.ReactElement} ui
 */
function render(ui: React.ReactElement) {
  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

/**
 * Tests RegisterPage.
 */
describe("LibraryPage Component", () => {
  /**
   * Tests rendering of movies.
   */
  it("renders movies from the library", async () => {
    render(<LibraryPage />);
    await waitFor(() => {
      const movieTitle = screen.getByText("The Shawshank Redemption");
      expect(movieTitle).toBeDefined();
    });
  });
});

/**
 * Snapshot test.
 */
test("should match the snapshot", async () => {
  const { asFragment } = render(<LibraryPage />);
  await expect(asFragment()).toMatchSnapshot();
});
