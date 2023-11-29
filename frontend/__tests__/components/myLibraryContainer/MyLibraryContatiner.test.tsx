import React from "react";
import { render as rtlRender } from "@testing-library/react";
import MyLibraryContainer from "../../../src/components/myLibraryContainer/MyLibraryContainer";
import { vi, describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../../src/services/auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { useMoviesInByLibraryIDQuery } from "../../../src/services/getMovies";

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
 * Mock useAuth from AuthContext.
 */
vi.mock("../../../src/services/auth/AuthContext", async () => {
  const actual = await vi.importActual(
    "../../../src/services/auth/AuthContext"
  );
  return {
    ...actual,
    useAuth: vi.fn().mockReturnValue({ userID: "user123" }),
  };
});

/**
 * Mock the useMoviesInByLibraryIDQuery function.
 */
vi.mock("../../../src/services/getMovies", () => ({
  useMoviesInByLibraryIDQuery: vi.fn(),
}));

/**
 * Tests MyLibraryContatiner.
 */
describe("MyLibraryContainer", () => {
  /**
   * Tests if MyLibraryContainer correctly renders with given movie data.
   */
  it("renders a populated library container", () => {
    const library = {
      libraryID: "123",
      name: "My Library",
    };
    const moviesData = [
      { id: "1", poster: "movie1.jpg" },
      { id: "2", poster: "movie2.jpg" },
    ];

    // Mock the useMoviesInByLibraryIDQuery
    useMoviesInByLibraryIDQuery.mockReturnValue({ data: moviesData });

    const { getByText, getAllByAltText } = render(
      <MyLibraryContainer library={library} />
    );

    // Assert that the library name is displayed
    expect(getByText(`Library ${library.name}`)).toBeTruthy();

    // Assert that movie posters are displayed
    const posters = getAllByAltText(/^Movie Poster/);
    expect(posters).toHaveLength(4);
  });
});
