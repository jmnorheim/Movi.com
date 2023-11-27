/**
 * Cypress tests for the LoginPage.
 */
describe('Login Page', () => {
    /**
     * Before each test, visit the login page.
     */
    beforeEach(() => {
      cy.visit('http://it2810-29.idi.ntnu.no/project2/login');
    });
  
    /**
     * Test error message when input field for password and email is empty.
     */
    it('error message when the input fields are empty', () => {
      cy.get('.login-form').contains('Login').click();
      cy.get('.login-form').should('contain', 'Email is required');
      cy.get('.login-form').should('contain', 'Password is required');
    });

    /**
     * Test unsuccessful login process.
     */
    it('test unsuccesfull login', () => {
        cy.get('[id=email]').type('newuserLoginTest@example.com');
        cy.get('[id=password]').type('wrongpassword');
        cy.get('.login-form').contains('Login').click();
        cy.get('.error-login').should('contain', 'Invalid email or password.');
    });
    
    /**
     * Test successful login process. Then navigate to profile page.
     */
    it('navigates to /profile on successful login', () => {
      cy.get('[id=email]').type('newuserLoginTest@example.com');
      cy.get('[id=password]').type('Password123!');
      cy.get('.login-form').contains('Login').click();
      cy.url().should('include', '/profile');
    });
  });
  