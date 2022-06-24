/// <reference types="cypress" />

describe('test signup form', () => {
  it('can visit the site', () => {
    cy.visit('http://localhost:3000');
    cy.wait(250);
  });

  it('can write name input', () => {
    cy.get('[style="grid-area: 2 / 1 / auto / auto; margin-bottom: 3%; text-align: left; background-color: black; color: white;"]').type('Mitchell Wintrow');
    cy.wait(250);
  });

  it('can write email input', () => {
    cy.get('[style="grid-area: 4 / 1 / auto / auto; margin-bottom: 3%; text-align: left; background-color: black; color: white;"]').type('me@email.com');
    cy.wait(250);
  });

  it('can write username input', () => {
    cy.get('[style="grid-area: 6 / 1 / auto / auto; margin-bottom: 3%; text-align: left; background-color: black; color: white;"]').type('cypress');
    cy.wait(250);
  });

  it('can write password input', () => {
    cy.get('[type="password"]').type('Password123!');
    cy.wait(250);
  });

  it('can submit the signup form and reach the main menu', () => {
    cy.get('.sc-jtcaXd').click();
    cy.wait(250);
  });

  it('can logout', () => {
    cy.get('.sc-lkwKjF').click();
  });
});