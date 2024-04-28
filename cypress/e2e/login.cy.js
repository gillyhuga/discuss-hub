/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login Flow Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button').contains(/^Sign in$/).should('be.visible');
  });
  it('should display alert when username is empty', () => {
    cy.get('input[type="email"]').clear();
    cy.get('input[type="password"]').type('password123');
    cy.get('button').contains(/^Sign in$/).click();
    cy.contains('"email" is not allowed to be empty').should('be.visible');
  });

  it('should display alert when password is empty', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').clear();
    cy.get('button').contains(/^Sign in$/).click();
    cy.contains('"password" is not allowed to be empty').should('be.visible');
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button').contains(/^Sign in$/).click();
    cy.contains('email or password is wrong').should('be.visible');
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[type="email"]').type('asd@asd.com');
    cy.get('input[type="password"]').type('asdasd');
    cy.get('button').contains(/^Sign in$/).click();
    cy.url().should('eq', 'http://localhost:5173/');
  });
});
