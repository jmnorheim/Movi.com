import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render as rtlRender, fireEvent } from "@testing-library/react";
import SortMenu from "../../../src/components/sortMenu/SortMenu";
import { SortType } from "../../../src/generated/graphql";
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
 * Mock sortTypeDisplayMapping similar to the one in your SortMenu component.
 */
const testSortTypeDisplayMapping = {
  DurationHILO: "Duration: High to Low",
  DurationLOHI: "Duration: Low to High",
  RatingHILO: "Rating: High to Low",
  RatingLOHI: "Rating: Low to High",
  TitleAZ: "Title: A to Z",
  TitleZA: "Title: Z to A",
  YearHILO: "Release Year: New to Old",
  YearLOHI: "Release Year: Old to New",
};

/**
 * Test SortMenu component.
 */
describe("SortMenu Component", () => {
  /**
   * Tests that the SortMenu renders correctly.
   */
  it("renders correctly", () => {
    // Mock the sessionStorage
    Storage.prototype.getItem = vi.fn(() => null);

    // Create a mock function for handling sort action.
    const onSortMock = vi.fn();

    // Render the SortMenu component and perform initial checks.
    const { getByText, getByRole } = render(<SortMenu onSort={onSortMock} />);

    // The button should display "Sort By" by default
    expect(getByText("Sort By")).toBeDefined();

    // Clicking the button should open the dropdown
    const button = getByRole("button", { name: "Sort By" });
    fireEvent.click(button);

    // Dropdown items should be displayed
    expect(getByText("Reset sorting")).toBeDefined();
    Object.values(SortType).forEach((sortType) => {
      // Use the mock mapping to check for display text
      expect(getByText(testSortTypeDisplayMapping[sortType])).toBeDefined();
    });
  });
});

export {};
