/**
 * - Register spec
 *   - should display login page correctly
 *   - should display alert when name is empty
 *   - should display alert when password is empty
 *   - should display alert when email is already taken
 *   - should display homepage when register are successfully
 */

describe('Register Flow Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.visible');
  });

  it('should display alert when name is empty', () => {
    cy.get('input[type="text"]').clear();
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button').contains(/^Register$/).click();
    cy.contains('"name" is not allowed to be empty').should('be.visible');
  });

  it('should display alert when password is empty', () => {
    cy.get('input[type="text"]').type('password123');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').clear();
    cy.get('button').contains(/^Register$/).click();
    cy.contains('"password" is not allowed to be empty').should('be.visible');
  });

  it('should display alert when email is already taken', () => {
    cy.get('input[type="text"]').type('Example Name');
    cy.get('input[type="email"]').type('asd@asd.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button').contains(/^Register$/).click();
    cy.contains('email is already taken').should('be.visible');
  });

  it('should display homepage when register are successfully', () => {
    const random = (Math.random() + 1).toString(36).substring(7);
    cy.get('input[type="text"]').type('Example Name');
    cy.get('input[type="email"]').type(random + '@email.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button').contains(/^Register$/).click();
    cy.url().should('eq', 'http://localhost:5173/');
  });
});
