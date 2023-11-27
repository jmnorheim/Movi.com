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
   * Test successful login process.
   */
  it("shows an error for invalid email", () => {
    cy.get("input[name=email]").type("invalidemail");
    cy.get(".register-btn").click();
    cy.get("p").should("contain", "Please enter a valid email");
  });
});
