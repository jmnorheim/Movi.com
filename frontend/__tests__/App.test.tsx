import { expect, describe, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

/**
 * Mocks `BrowserRouter`.
 */
vi.mock("react-router-dom", async () => {
  const originalModule = (await vi.importActual("react-router-dom")) as Record<
    string,
    any
  >;

  return {
    ...originalModule,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

/**
 * @vitest-environment jsdom
 */

/** QueryClient instance */
const queryClient = new QueryClient();

/**
 * Render component with necessary providers.
 * @param {React.ReactElement} ui
 * @returns {ReturnType<React.FC>}
 */
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/nonexistentroute"]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};

/**
 * Test that 404 page is rendered for nonexistent routes.
 */
describe("Test Routing", () => {
  it("renders 404 for nonexistent routes", () => {
    renderWithProviders(<App />);
    expect(screen.getByText("404 Not found")).toBeDefined();
  });
});
