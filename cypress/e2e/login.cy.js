/// <reference types="cypress" />

describe('test login form', () => {
  it('can visit the site', () => {
    cy.visit('http://localhost:3000');
    cy.wait(250);
  });

  it('can switch to login form', () => {
    cy.get('.sc-elYLMi > b > u').click();
    cy.wait(250);
  });

  it('can switch to signup form', () => {
    cy.get('.sc-elYLMi > b > u').click();
    cy.wait(250);
  });

  it('can switch back to login form', () => {
    cy.get('.sc-elYLMi > b > u').click();
    cy.wait(250);
  });

  it('can write username input', () => {
    cy.get('[type="text"]').type('NewUser2');
    cy.wait(250);
  });

  it('can write password input', () => {
    cy.get('[type="password"]').type('Password123!');
    cy.wait(250);
  });

  it('can submit login form and reach the main menu', () => {
    cy.get('.sc-jtcaXd').click();
    cy.wait(250);
  });

  it('can logout', () => {
    cy.get('.sc-lkwKjF').click();
  });
});