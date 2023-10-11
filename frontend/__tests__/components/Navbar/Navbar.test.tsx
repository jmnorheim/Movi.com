import { expect, it, describe, vi, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "../../../src/AuthContext";
import NavBar from "../../../../frontend/src/components/Navbar/Navbar";


/**
 * @vitest-environment jsdom
 */

const queryClient = new QueryClient();

/**
 * Render component without any providers (since App already has them).
 * @param {React.ReactElement} ui
 * @returns {ReturnType<React.FC>}
 */
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>{ui}</Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

/**
 * Test the Navbar
 */
describe("Test Navbar", () => {
  /**
   * Test that Navbar contain "Møvie".
   */
  it("Test that Navbar contain 'Møvie'", () => {
    renderWithProviders(<NavBar />);
    const navbarElement = screen.getByText("Møvie");
    expect(navbarElement).toBeDefined();
  });
});


