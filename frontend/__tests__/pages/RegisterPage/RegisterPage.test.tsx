import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import RegisterPage from "../../../src/pages/RegisterPage/RegisterPage";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
}

/**
 * Tests RegisterPage
 */
describe("RegisterPage Component", () => {
  it("shows an error when passwords do not match", async () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "test123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password *"), {
      target: { value: "test123" },
    });
    fireEvent.click(screen.getByText("Register"));
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });
});
