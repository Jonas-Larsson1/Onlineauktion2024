import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in as a user', () => {
  cy.visit('/');
  cy.get("#formUsername").type("Bengtkungen");
  cy.get("#formPassword").type("bengt123");
  cy.get('.register-form > :nth-child(4)').click();
});

When('I go to the account page', () => {
  cy.get(':nth-child(4) > a > img').click();
});

Then('I should see an overview of my auction and bidding history', () => {
  cy.get('.pb-5 > :nth-child(1)').should('contain', 'Your ongoing bids.');
  cy.get('.pb-5 > :nth-child(2)').should('contain', 'Your ongoing auctions.');
  cy.get('.pb-5 > :nth-child(3)').should('contain', 'Your closed auctions.');
  cy.get('.pb-5 > :nth-child(4)').should('contain', 'Your saved auctions.');
});

Given('that I am on the account page', () => {
  cy.url().should('include', '/AccountPage');
});

Given('the section I want to view has one or more items', () => {
  cy.get('.ms-3 > .mx-2'); // Will fail if there are no items in the section
});

When('I click on {string} on the specified section', (a) => {
  cy.get('.ms-3 > .mx-2').click();
});

Then('I should see a list of all my items for that section', () => {
  cy.url().should('include', '/OngoingBids');
  cy.get('.w-25 > .d-flex').should('contain', 'Your ongoing bids.');
});