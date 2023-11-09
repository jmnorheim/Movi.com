import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TypeSearch from "../../../src/components/searchBar/SearchBar";

/**
 * @vitest-environment jsdom
 */

/**
 * Test the Searchbar.
 */
describe("Test Searchbar", () => {
  /**
   * Test that Searchbar is rendered with correct placeholder.
   */
  it("Test that Searchbar is rendered with correct placeholder", () => {
    const mockOnSearch = vi.fn();
    render(<TypeSearch onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search for any movie...");
    expect(inputElement).toBeDefined();
  });
});
