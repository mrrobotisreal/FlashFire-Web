/// <reference types="cypress" />

describe('main menu test', () => {
  it('can visit the site', () => {
    cy.visit('http://localhost:3000');
    cy.wait(500);
  });

  it ('can sign in', () => {
    cy.get('.sc-elYLMi > b > u').click();
    cy.wait(500);
    cy.get('[type="text"]').type('NewUser2');
    cy.wait(500);
    cy.get('[type="password"]').type('Password123!');
    cy.wait(500);
    cy.get('.sc-jtcaXd').click();
    cy.wait(500);
  });

  it('can move up through collections', () => {
    cy.get('.sc-ikjQzJ').click();
    cy.wait(500);
    cy.get('.sc-ikjQzJ').click();
    cy.wait(500);
    cy.get('.sc-ikjQzJ').click();
    cy.wait(500);
  });

  it('can move down through collections', () => {
    cy.get('.sc-tsFYE').click();
    cy.wait(500);
    cy.get('.sc-tsFYE').click();
    cy.wait(500);
    cy.get('.sc-tsFYE').click();
    cy.wait(500);
  });

  it('can click each collection', () => {
    cy.get('.sc-dkdnUF > :nth-child(1)').click();
    cy.wait(500);
    cy.get('.sc-caXVBt > .sc-lkwKjF').click();
    cy.wait(500);
    cy.get('.sc-tsFYE').click();
    cy.wait(500);
    cy.get('.sc-dkdnUF > :nth-child(1)').click();
    cy.wait(500);
    cy.get('.sc-caXVBt > .sc-lkwKjF').click();
    cy.wait(500);
    cy.get('.sc-tsFYE').click();
    cy.wait(500);
    cy.get('.sc-dkdnUF > :nth-child(1)').click();
    cy.wait(500);
    cy.get('.sc-caXVBt > .sc-lkwKjF').click();
    cy.wait(500);
  });

  it('can view collection stats', () => {
    cy.get('.sc-evrZIY > :nth-child(3)').click();
    cy.wait(500);
    cy.get('.sc-fmrZth').click();
    cy.wait(500);
  });

  it('can create a new collection', () => {
    cy.get('.sc-evrZIY > :nth-child(4)').click();
    cy.wait(500);
    cy.get('[style="grid-area: 7 / 2 / auto / auto;"] > b').click();
  });
});