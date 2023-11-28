/**
 * Cypress tests for the LibraryPage.
 */
describe("LibraryPage Tests", () => {
  /**
   * Before each test, login and go into a created Library.
   */
  beforeEach(() => {
    cy.visit("http://it2810-29.idi.ntnu.no/project2/login");
    cy.get("[id=email]").type("newuserLoginTest@example.com");
    cy.get("[id=password]").type("Password123!");
    cy.get(".login-form").contains("Login").click();
    cy.get(".navContainer").contains("Library").click();

    // Open the dialog
    cy.get(".create-library-button").click();

    // Fill out the form and submit
    cy.get("#name").type("My New Library");
    cy.get(".MuiDialog-root")
      .find(".MuiButton-root")
      .contains("Create")
      .click();
    cy.get(".empty-library-text").contains("My New Library").click();
  });

  /**
   * Test navigation back to the previous page.
   */
  it("navigates back to the previous page", () => {
    cy.get(".back-button-library").click();
  });

  /**
   * Test opening and closing the Delete Library dialog.
   */
  it("opens and closes the Delete Library dialog", () => {
    // Open Delete library dialog
    cy.get(".delete-library-button-text").click();
    cy.get(".MuiDialog-root").should("be.visible");

    // Close Delete library dialog
    cy.get(".MuiButton-root").contains("Cancel").click();
    cy.get(".MuiDialog-root").should("not.exist");
  });

  /**
   * Test confirming the deletion of the library.
   */
  it("confirms deletion of the library", () => {
    cy.get(".delete-library-button-text").click();
    cy.get(".MuiButton-root").contains("Delete").click();
  });
});
