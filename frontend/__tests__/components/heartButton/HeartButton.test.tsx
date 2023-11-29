import { render as rtlRender, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HeartButton from "../../../src/components/heartButton/HeartButton";
import { addMovieToFavorite } from "../../../src/services/addMovieToFavorites";
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
 * Mocking custom hooks and services.
 */
vi.mock("../../../src/services/isMovieInFavorite", async () => {
  const actual = await vi.importActual("../../../src/services/isMovieInFavorite") as any;
  
  return {
    ...actual,
    useIsMovieInFavorites: vi.fn(() => ({
      data: false,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
    })),
    invalidateIsMovieInFavorites: vi.fn(),
  };
});

/**
 * Mock removeMovieFromFavorites.
 */
vi.mock("../../../src/services/removeMovieFromFavorites", () => ({
  useRemoveMovieFromFavorites: vi.fn(() => ({
    mutate: vi.fn(),
  })),
}));

/**
 * Mocking addMovieToFavorite.
 */
vi.mock("../../../src/services/addMovieToFavorites", () => ({
  addMovieToFavorite: vi.fn(),
}));

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

    render(<HeartButton userID={userID} movieID={movieID} />);

    // Check if the button is rendered
    const button = screen.getByRole("button");
    expect(button).toBeDefined();

    // Simulate a click event on the button
    fireEvent.click(button);

    // Check if addMovieToFavorite was called.
    expect(addMovieToFavorite).toHaveBeenCalledWith(userID, movieID);
  });
});
