import React from "react";
import { render as rtlRender, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import MyLibraryContainer from "../../../src/components/myLibraryContainer/MyLibraryContainer";
import { Library } from "../../../src/interfaces";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../src/services/auth/AuthContext";
import Module from "module";

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
 * Mocks getMovies to retrieve the movies to a library.
 */
vi.mock("../../../src/services/getMovies", () => ({
  useMoviesInByLibraryIDQuery: vi.fn(() => ({
    data: null,
  })),
}));

/**
 * Test the MyLibraryContainer.
 */
describe("MyLibraryContainer", () => {
  /**
   * Test that it renders correctly based on library content.
   */
  it("renders correctly based on library content", () => {
    // Create a mock library for testing.
    const mockLibrary: Library = {
      libraryID: "lib123",
      name: "Test Library",
      movies: [],
    };

    // Render the MyLibraryContainer with the mock library.
    render(<MyLibraryContainer library={mockLibrary} />);

    // Find the library name,.
    const libraryNameElement = screen.getByText(`Library ${mockLibrary.name}`, {
      exact: false,
    });

    // Ensure that the library name element is rendered.
    expect(libraryNameElement).toBeDefined();
  });
});
