/**
 * Cypress tests for the RegisterPage.
 */
describe("RegisterPage", () => {
  /**
   * Before each test, navigate to the registration page.
   */
  beforeEach(() => {
    cy.visit("http://it2810-29.idi.ntnu.no/project2/register");
  });

  /**
   * Test unsuccessful register process.
   */
  it("shows an error for invalid email", () => {
    cy.get("input[name=email]").type("invalidemail");
    cy.get(".register-btn").click();
    cy.get("p").should("contain", "Please enter a valid email");
  });

  /**
   * Test successful register process and delete user.
   */
  it("registers a new user and delete the registred user", () => {
    // Fill out theinput fields.
    cy.get("input[name=username]").type("newuserRegisterTest");
    cy.get("input[name=email]").type("newuserRegisterTest@example.com");
    cy.get("input[name=password]").type("Password123!");
    cy.get("input[name=confirm-password]").type("Password123!");

    // Submit the form
    cy.get(".register-form").submit();

    // Navigate to profile if registered.
    cy.url().should("include", "/profile");

    // Test delete user
    cy.get(".button").contains("Delete User").click();
    cy.get(".MuiButtonBase-root").contains("Delete").click();
  });
});
