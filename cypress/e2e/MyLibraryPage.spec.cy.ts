describe("MyLibraryPage Tests", () => {
  beforeEach(() => {
    cy.visit("http://it2810-29.idi.ntnu.no/project2/login");
    cy.get("[id=email]").type("newuserLoginTest@example.com");
    cy.get("[id=password]").type("Password123!");
    cy.get(".login-form").contains("Login").click();
    cy.get(".navContainer").contains("Library").click();
  });

  /**
   * Verify that the MyLibraryPage loads and displays essential elements.
   */
  it("loads the MyLibraryPage and displays essential elements", () => {
    cy.get(".myLibraryPageContainer").should("exist");
    cy.get(".create-library-button").should("exist");
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

    // Assertions to verify that the new library has been added
    // This might involve checking for a new element in the DOM,
    // or verifying a successful network request
  });

  // Add any other tests specific to the functionalities on your MyLibraryPage
});
