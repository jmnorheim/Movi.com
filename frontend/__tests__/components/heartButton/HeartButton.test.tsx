import { render as rtlRender, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HeartButton from "../../../src/components/heartButton/HeartButton";
import { useIsMovieInFavorites } from "../../../src/services/isMovieInFavorite";
import { addMovieToFavorite } from "../../../src/services/addMovieToFavorites";
import { useRemoveMovieFromFavorites } from "../../../src/services/removeMovieFromFavorites";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../../src/services/auth/AuthContext";
import { BrowserRouter } from "react-router-dom";

/**
 * @vitest-environment jsdom
 */

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
 * Mock for useIsMovieInFavorites.
 */
vi.mock("../../../src/services/isMovieInFavorite", () => ({
  useIsMovieInFavorites: vi.fn().mockImplementation(() => ({ data: false })),
  invalidateIsMovieInFavorites: vi.fn(), // Mock the invalidateIsMovieInFavorites function
}));

/**
 * Mock for addMovieToFavorite.
 */
vi.mock("../../../src/services/addMovieToFavorites", () => ({
  addMovieToFavorite: vi.fn(),
}));

/**
 * Mock for useRemoveMovieFromFavorites.
 */
vi.mock("../../../src/services/removeMovieFromFavorites", () => ({
  useRemoveMovieFromFavorites: vi
    .fn()
    .mockImplementation(() => ({ mutate: vi.fn() })),
}));

/**
 * Mock for useQueryClient
 */
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: vi.fn().mockImplementation(() => ({
      invalidateQueries: vi.fn(),
    })),
  };
});

/**
 * Test HeartButton component.
 */
describe("HeartButton", () => {
  /**
   * Test that eartButton renders correctly and handles clicks.
   */
  it("renders correctly and handles clicks", async () => {
    const userID = "user123";
    const movieID = "movie123";

    // Mocking the initial state as not favorited.
    useIsMovieInFavorites.mockReturnValue({ data: false });

    // Mocking the mutation function.
    const mutate = vi.fn();
    useRemoveMovieFromFavorites.mockReturnValue({ mutate });

    render(<HeartButton userID={userID} movieID={movieID} />);

    // Check if button is rendered.
    const button = screen.getByRole("button");
    expect(button).toBeDefined();

    // Simulate a click to add to favorites.
    fireEvent.click(button);

    // Check if addMovieToFavorite was called.
    expect(addMovieToFavorite).toHaveBeenCalledWith(userID, movieID);

    // Update the mock to simulate the movie is now favorited.
    useIsMovieInFavorites.mockReturnValue({ data: true });

    // Simulate another click to remove from favorites.
    fireEvent.click(button);

    // Check if removeMovieFromFavorites was called.
    expect(mutate).toHaveBeenCalledWith(movieID);
  });
});
