import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import LoginPage from "../../../src/pages/LoginPage/LoginPage";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../../src/AuthContext";

/**
 * @vitest-environment jsdom
 */

/**
 * A mock of the local storage.
 */
const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;

/**
 * Mock the navigation.
 */
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

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
 * Tests LoginPage.
 */
describe("LoginPage Component", () => {
  // Set up test data for users
  beforeEach(() => {
    localStorage.setItem(
      "users",
      JSON.stringify([{ email: "test@example.com", password: "test123" }])
    );
  });

  it("Shows an error if email or password are incorrect", async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText("Email Address *"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText("Login"));
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("Snapshot test", () => {
    const { asFragment } = render(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
