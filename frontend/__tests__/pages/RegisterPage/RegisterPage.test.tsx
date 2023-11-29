import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, vi, expect, afterEach, beforeEach } from "vitest";
import RegisterPage from "../../../src/pages/RegisterPage/RegisterPage";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../../src/services/auth/AuthContext";
import * as createUser from "../../../src/services/createUser";
import { User } from "../../../src/interfaces";

/**
 * @vitest-environment jsdom
 */

/** Overrides default window alert with mock function. */
window.alert = vi.fn();

/**
 * Mocks `getUser` service with a default implementation.
 */
vi.mock("../../../src/services/getUser", () => {
  return {
    getUser: vi.fn(),
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
 * Tests RegisterPage.
 */
describe("Tests RegisterPage", () => {
  // Cleans up before and after each test.
  afterEach(cleanup);
  beforeEach(cleanup);

  /**
   * Tests create user with valid form inputs.
   */
  it("Should create a user when all form fields are valid", async () => {
    // Mock implementation that matches the expected return type.
    const createUserMock = vi.fn(
      (username: string, email: string, password: string): Promise<User> => {
        return Promise.resolve({
          userID: "123",
          username,
          email,
          password,
          favorites: [],
          library: [],
        });
      }
    );

    // Mock the createUser function using spyOn.
    vi.spyOn(createUser, "createUser").mockImplementation(createUserMock);

    render(<RegisterPage />);

    // Fill in the form fields with valid data.
    fireEvent.change(screen.getByLabelText("Username *"), {
      target: { value: "newUser" },
    });
    fireEvent.change(screen.getByLabelText("Email Address *"), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password *"), {
      target: { value: "Password123!" },
    });

    // Click the Register button.
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    // Assert the createUser service was called with the input data.
    await waitFor(() => {
      expect(createUser.createUser).toHaveBeenCalledWith(
        "newUser",
        "newuser@example.com",
        "Password123!"
      );
    });

    // Assert that user was created.
    expect(createUserMock).toHaveBeenCalled();
  });

  /**
   * Verifies error handling when create unvalid user.
   */
  it("Should handle errors when createUser fails", async () => {
    // Mock the createUser function to reject with an error.
    const createUserMock = vi
      .fn()
      .mockRejectedValue(new Error("Creation failed"));
    vi.spyOn(createUser, "createUser").mockImplementation(createUserMock);

    render(<RegisterPage />);

    // Fill in the form with valid data.
    fireEvent.change(screen.getByLabelText("Username *"), {
      target: { value: "newUser" },
    });
    fireEvent.change(screen.getByLabelText("Email Address *"), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password *"), {
      target: { value: "Password123!" },
    });

    // Click the Register button.
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    // Test error message when createUser fails.
    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to create an account. Email or username might already exist."
        )
      ).toBeDefined();
    });
  });

  /**
   * Tests error message when passwords input do not match.
   */
  it("Shows an error when passwords do not match", async () => {
    render(<RegisterPage />);

    // Input different passwords into the "Password" and "Confirm Password" fields.
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password *"), {
      target: { value: "differentPassword123" },
    });

    // Click the Register button.
    fireEvent.click(screen.getByText("Register"));

    // Check for the presence of the error message.
    expect(screen.getByText("Passwords do not match")).toBeDefined();
  });

  /**
   * Tests error message when password is to short.
   */
  it("Should display an error when the password is too short", async () => {
    render(<RegisterPage />);

    // Input a short Password.
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "short" },
    });

    // Click the Register button.
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    // Check for the presence of the error message.
    expect(
      screen.getByText("Password must be at least 8 characters")
    ).toBeDefined();
  });

  /**
   * Tests error message when passwords doesn't contain a number.
   */
  it("Should display an error when the password doesn't contain a number", async () => {
    render(<RegisterPage />);

    // Input a password without a number.
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "Password!" },
    });

    // Click the Register button.
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    // Check for the presence of the error message.
    expect(
      screen.getByText("Password must include at least one number")
    ).toBeDefined();
  });

  /**
   * Tests error message when passwords doesn't contain a special character.
   */
  it("Should display an error when the password doesn't contain a special character", async () => {
    render(<RegisterPage />);

    // Input a password without a special character.
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "Password1" },
    });

    // Click the Register button.
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    // Check for the presence of the error message.
    expect(
      screen.getByText("Password must include at least one special character")
    ).toBeDefined();
  });

  /**
   * Tests error message when input fields are empty.
   */
  it("Should display an error when the password field is empty", async () => {
    render(<RegisterPage />);
    // Input empty string in the input fields.
    fireEvent.change(screen.getByLabelText("Username *"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Email Address *"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password *"), {
      target: { value: "" },
    });

    // Click the Register button.
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    // Check for the presence of the error message.
    expect(screen.getByText("Username is required")).toBeDefined();
    expect(screen.getByText("Email is required")).toBeDefined();
    expect(screen.getByText("Password is required")).toBeDefined();
    expect(screen.getByText("Confirm Password is required")).toBeDefined();
  });

  /**
   * Tests error message when email has invalid format.
   */
  it("Shows an error for invalid email format", async () => {
    render(<RegisterPage />);

    // Input an invalid email
    fireEvent.change(screen.getByLabelText("Email Address *"), {
      target: { value: "notAnEmail" },
    });

    // Click the Register button.
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    // Check for error message.
    expect(screen.getByText("Please enter a valid email")).toBeDefined();
  });

  /**
   * Snapshot test.
   */
  it("should match the snapshot", () => {
    const { asFragment } = render(<RegisterPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
