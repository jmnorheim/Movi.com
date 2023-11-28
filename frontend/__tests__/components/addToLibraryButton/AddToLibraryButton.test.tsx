import {
  render as rtlRender,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddToLibraryButton from "../../../src/components/addToLibraryButton/AddToLibraryButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../src/services/auth/AuthContext";
import { addMovieToLibrary } from "../../../src/services/addMovieToLibrary.ts";

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
 * Test AddToLibraryButton.
 */
describe("AddToLibraryButton", () => {
  /**
   * Test adding a movie to a favorites.
   */
  it("test adding a movie to a favorites.", async () => {
    // Mock data.
    const imdbID = "some_imdb_id";

    // Render the component.
    render(
      <AddToLibraryButton
        imdbID={imdbID}
        width="100px"
        height="50px"
        fontSize="16px"
      />
    );

    // Simulate user actions.
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => screen.getByText("Favorites"));
    fireEvent.click(screen.getByText("Favorites"));

    // Assert that the movie was added successfully
    await waitFor(() =>
      screen.getByText("Movie has already been added to Favorites")
    );
    expect(
      screen.getByText("Movie has already been added to Favorites")
    ).toBeDefined();
  });
});
