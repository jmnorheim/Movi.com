import React from "react";
import { describe, it, vi, expect, afterEach, beforeEach, test } from "vitest";
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
import ProfilePage from "../../../src/pages/ProfilePage/ProfilePage";
import { useNavigate as actualUseNavigate } from "react-router-dom";

/**
 * @vitest-environment jsdom
 */

/** Overrides default window alert with mock function. */
window.alert = vi.fn();

/**
 * Mock the react-router-dom.
 */
vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as any;
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

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
      logout: vi.fn(),
    }),
  };
});

/**
 * Mock useUserQuery.
 */
vi.mock("../../../src/services/getUser", () => ({
  useUserQuery: vi.fn(() => ({
    data: {
      userID: "123",
      username: "testuser",
      email: "test@example.com",
    },
    isLoading: false,
  })),
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
 * Tests ProfilePage.
 */
describe("Tests ProfilePage", () => {
  // Cleans up before and after each test.
  afterEach(cleanup);
  beforeEach(cleanup);

  /**
   * Test rendering of user information and log out button.
   */
  it("should render user information", async () => {
    render(<ProfilePage />);

    // Check if user information is displayed.
    expect(screen.getByText("testuser")).toBeDefined();
    expect(screen.getByText("test@example.com")).toBeDefined();

    // Check if Log Out button is displayed.
    expect(screen.getByText("Log Out")).toBeDefined();
  });

  /**
   * Test Log Out button, and that logut leads to navigation to login page.
   */
  it("should navigate to login page on logout", async () => {
    // Mock navigate
    const navigate = vi.fn();
    vi.mocked(actualUseNavigate).mockReturnValue(navigate);

    render(<ProfilePage />);

    // Click the Log Out button.
    fireEvent.click(screen.getByRole("button", { name: "Log Out" }));

    // Assert that Log Out button navigate to /login when clicked.
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/login"));
  });
});

/**
 * Snapshot test.
 */
test("should match the snapshot", async () => {
  const { asFragment } = render(<ProfilePage />);
  await expect(asFragment()).toMatchSnapshot();
});
