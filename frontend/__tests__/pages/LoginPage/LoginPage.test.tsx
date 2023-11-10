// Import statements
import React from "react";
import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, vi, expect, afterEach, beforeEach } from "vitest";
import LoginPage from "../../../src/pages/LoginPage/LoginPage";
import * as hashFunction from "../../../src/services/utilities/hashFunction";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../../src/services/auth/AuthContext";
import * as getUser from "../../../src/services/getUser";
import { User } from "../../../src/interfaces";
import RegisterPage from "../../../src/pages/RegisterPage/RegisterPage";
import { createUser } from "../../../src/services/createUser";

/**
 * @vitest-environment jsdom
 */

/** Overrides default window alert with mock function. */
window.alert = vi.fn();

/**
 * Mocks `getUser` service with a default implementation.
 */
vi.mock("../../../src/services/getUser", () => ({
  getUserByEmail: vi.fn(),
}));

/**
 * Mocks `verifyPassword` for hashfunction.
 */
vi.mock("../../../src/services/utilities/hashFunction", () => ({
  verifyPassword: vi.fn(() => Promise.resolve(true)),
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
 * Tests LoginPage.
 */
describe("Tests LoginPage", () => {
  // Cleans up before and after each test.
  afterEach(cleanup);
  beforeEach(cleanup);

  /**
   * Test for successful login.
   */
  it("allows the user to log in successfully", async () => {
    // Set up mock user and mock functions.
    const mockUser = {
      userID: "123",
      username: "test",
      email: "test@example.com",
      password: "password123",
      favorites: [],
      library: [],
    };

    // Mock the getUserByEmail and verifyPassword function using spyOn.
    vi.spyOn(getUser, "getUserByEmail").mockResolvedValue(mockUser);
    vi.spyOn(hashFunction, "verifyPassword").mockResolvedValue(true);

    render(<LoginPage />);

    // Fill in the form fields.
    fireEvent.change(screen.getByLabelText("Email Address *"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "password123" },
    });

    // Click the Login button.
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    // Assert that the login process functions as expected.
    await waitFor(() => {
      expect(getUser.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(hashFunction.verifyPassword).toHaveBeenCalledWith(
        mockUser.userID,
        "password123"
      );
    });
  });

  /**
   * Set error when user does not exist.
   */
  it("should set error when user does not exist", async () => {
    // Mock getUserByEmail to reject when an invalid email is provided.
    const getUserByEmailMock = vi.fn(() =>
      Promise.reject(new Error("User does not exist."))
    );
    vi.spyOn(getUser, "getUserByEmail").mockImplementation(getUserByEmailMock);

    render(<LoginPage />);

    // Fill in the form fields.
    fireEvent.change(screen.getByLabelText("Email Address *"), {
      target: { value: "nonexistent@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "somepassword" },
    });

    // Click the Login button.
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    // Test error message when user does not exist.
    await waitFor(() => {
      expect(screen.getByText("User does not exist.")).toBeDefined();
    });
  });

  /**
   * Tests error message when input fields are empty.
   */
  it("Should display an error when the password field is empty", async () => {
    render(<LoginPage />);

    // Input empty string in the input fields.
    fireEvent.change(screen.getByLabelText("Email Address *"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "" },
    });

    // Click the Register button.
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    // Check for the presence of the error message.
    expect(screen.getByText("Email is required")).toBeDefined();
    expect(screen.getByText("Password is required")).toBeDefined();
  });

  /**
   * Tests error message when email has invalid format.
   */
  it("Shows an error for invalid email format", async () => {
    render(<LoginPage />);

    // Input an invalid email.
    fireEvent.change(screen.getByLabelText("Email Address *"), {
      target: { value: "notAnEmail" },
    });

    // Click the Register button.
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    // Check for error message.
    expect(screen.getByText("Please enter a valid email")).toBeDefined();
  });

  /**
   * Snapshot test.
   */
  /*it("Snapshot test", () => {
    const { asFragment } = render(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
  });*/
});
