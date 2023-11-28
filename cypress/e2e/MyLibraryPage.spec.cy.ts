/**
 * Cypress tests for the MyLibraryPage.
 */
describe("MyLibraryPage Tests", () => {
  /**
   * Before each test, login and go to MyLibraryPage.
   */
  beforeEach(() => {
    cy.visit("http://it2810-29.idi.ntnu.no/project2/login");
    cy.get("[id=email]").type("newuserLoginTest@example.com");
    cy.get("[id=password]").type("Password123!");
    cy.get(".login-form").contains("Login").click();
    cy.get(".navContainer").contains("Library").click();
  });

  /**
   * Test opening and closing the Create Library dialog.
   */
  it("opens and closes the Create Library dialog", () => {
    // Open the dialog
    cy.get(".create-library-button").click();
    cy.get(".MuiDialog-root").should("be.visible");

    // Close the dialog
    cy.get(".MuiDialog-root")
      .find(".MuiButton-root")
      .contains("Cancel")
      .click();
    cy.get(".MuiDialog-root").should("not.exist");
  });

  /**
   * Test creating a new library.
   */
  it("creates a new library", () => {
    const newLibraryName = "My New Library";

    // Open the dialog
    cy.get(".create-library-button").click();

    // Fill out the form and submit
    cy.get("#name").type(newLibraryName);
    cy.get(".MuiDialog-root")
      .find(".MuiButton-root")
      .contains("Create")
      .click();
  });
});
