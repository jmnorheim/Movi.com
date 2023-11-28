/**
 * Cypress tests for the ProfilePage.
 */
describe("ProfilePage Tests", () => {
  /**
   * Before each test, login and go to ProfilePage.
   */
  beforeEach(() => {
    cy.visit("http://it2810-29.idi.ntnu.no/project2/login");
    cy.get("[id=email]").type("newuserLoginTest@example.com");
    cy.get("[id=password]").type("Password123!");
    cy.get(".login-form").contains("Login").click();
    cy.get(".navContainer").contains("Profile").click();
  });

  /**
   * Test logout functionality.
   */
  it("allows the user to log out", () => {
    cy.get(".button").contains("Log Out").click();
  });

  /**
   * Test clicking "Cancel" in the delete user popup.
   */
  it("allows the user to initiate and cancel user deletion", () => {
    cy.get(".button").contains("Delete User").click();
    cy.get(".MuiButtonBase-root").contains("Cancel").click();
  });
});
