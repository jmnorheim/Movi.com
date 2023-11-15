import React from "react";
import { describe, it, vi, expect, afterEach, beforeEach } from "vitest";
import {
  render as rtlRender,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../../src/services/auth/AuthContext";
import MyLibraryPage from "../../../src/pages/MyLibraryPage/MyLibraryPage";

/**
 * @vitest-environment jsdom
 */

/** Overrides default window alert with mock function. */
window.alert = vi.fn();

/**
 * Mock AuthContext.
 */
vi.mock("../../../src/services/auth/AuthContext", async () => {
  const actual = (await vi.importActual(
    "../../../src/services/auth/AuthContext"
  )) as any;
  return {
    ...actual,
    useAuth: () => ({
      userID: "123",
    }),
  };
});

// Mock useUsersLibrariesQuery
vi.mock("../../../src/services/getUserLibraries.ts", () => ({
  useUsersLibrariesQuery: () => ({
    data: {
      libraries: [
        { movies: [], name: "library 1" },
        { movies: [], name: "library 2" },
      ],
    },
  }),
}));

/**
 * Mocks useCreateLibrary.
 */
const mockMutate = vi.fn();
vi.mock("../../../src/services/mutateLibrary", () => ({
  useCreateLibrary: () => ({
    mutate: mockMutate,
  }),
}));

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
 * Tests MyLibraryPage.
 */
describe("MyLibraryPage Component", () => {
  // Cleans up before and after each test.
  afterEach(cleanup);
  beforeEach(cleanup);

  /**
   * Test rendering of MyLibraryPage.
   */
  it("Test rendering of MyLibraryPage", async () => {
    render(<MyLibraryPage />);
    expect(screen.getByText("My Library")).toBeDefined();
  });

  /**
   * Test create new library popup.
   */
  it("Test create new library popup.", async () => {
    render(<MyLibraryPage />);

    // Click the Create Libary button.
    fireEvent.click(screen.getByText("Create New"));

    // Fill in the new libary name.
    fireEvent.change(screen.getByLabelText("Library Name"), {
      target: { value: "New Library" },
    });

    // Click the Create button.
    fireEvent.click(screen.getByText("Create"));

    // Assert that new Libary has been created.
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith("New Library");
    });
  });

  /**
   * Test canceling the creation of a new library.
   */
  it("Test canceling the library creation.", async () => {
    render(<MyLibraryPage />);

    // Click the Create Libary button.
    fireEvent.click(screen.getByText("Create New"));

    // Fill in the new library name.
    const input = screen.getByLabelText("Library Name");
    fireEvent.change(input, {
      target: { value: "New Library" },
    });

    // Click the Cancel button.
    fireEvent.click(screen.getByText("Cancel"));

    // Check if the popup is closed.
    expect(screen.getByText("My Library")).toBeDefined();
  });
});
