/**
 * Cypress tests for the HomePage.
 */
describe("HomePage Tests", () => {
  beforeEach(() => {
    /**
     * Before each test, navigate to the HomePage.
     */
    cy.visit("http://it2810-29.idi.ntnu.no/project2/");
  });

  /**
   * Loads the HomePage and displays essential elements.
   */
  it("loads the HomePage and displays essential elements", () => {
    cy.get(".homePageContainer").should("exist");
    cy.get(".headerContainer").should("exist");
    cy.get(".gridContainer").should("exist");
    cy.get(".footerContainer").should("exist");
  });

  /**
   * Test searchbar.
   */
  it("allows the user to type and search for a movie", () => {
    const searchText = "Inception";
    // Write into searchbar.
    cy.get(".SearchbarContainer input")
      .type(searchText)
      .should("have.value", searchText);

    // Debounce check (wait more than 800ms)
    cy.wait(1000);
  });

  /**
   * Test sorting. First select option, then reset the sorting.
   */
  it("first select option, then reset the sorting", () => {
    // First select a sorting option
    cy.get(".dropdown-wrapper .button")
      .click()
      .get(".dropdown-item-sorting")
      .contains("Rating: High to Low")
      .click();

    // Then reset sorting
    cy.get(".dropdown-wrapper .button")
      .click()
      .get(".dropdown-item-sorting.reset-text")
      .click()
      .get(".dropdown-wrapper .button")
      .should("contain", "Sort By");
  });
});
