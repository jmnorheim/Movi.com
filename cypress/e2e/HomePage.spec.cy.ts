describe("HomePage Tests", () => {
  beforeEach(() => {
    cy.visit("http://it2810-29.idi.ntnu.no/project2/"); // Adjust the URL based on your app's routing
  });

  it("loads the HomePage and displays essential elements", () => {
    cy.get(".homePageContainer").should("exist");
    cy.get(".headerContainer").should("exist");
    cy.get(".gridContainer").should("exist");
    cy.get(".footerContainer").should("exist");
  });
});
