import { render as rtlRender, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePageHeader from "../../../src/components/homePageHeader/HomePageHeader";
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
 * Test HomePageHeader.
 */
describe("HomePageHeader", () => {
  /**
   * Test if the component renders correctly.
   */
  it("renders correctly", () => {
    const genres = ["Action", "Drama"];

    render(<HomePageHeader genres={["Action", "Drama"]} />);

    // Check if header elements are present
    expect(screen.getByAltText("Img")).toBeDefined();
    expect(screen.getByText("Welcome to the Møvi database")).toBeDefined();

    // Ensure the SearchBar is rendered
    expect(
      screen.getByPlaceholderText("Search for any movie...")
    ).toBeDefined();

    // Ensure the FilterSideBar is initially not visible
    const filterSidebar = screen.queryByTestId("filter-sidebar");
    expect(filterSidebar).toBeNull();
  });
});
