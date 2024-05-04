import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the registration page', () => {
  cy.visit("/registerPage")
});

When('I write a faulty username such as {string}', (input) => {
  cy.get("#formBasicUsername").type(input)
});

When('I write a faulty password such as {string}', (input) => {
   cy.get("#formBasicPassword").type(input)
});

Then('I get two messages telling me the why my input is faulty', () => {
   cy.get(':nth-child(5) > .text-muted');
   cy.get(':nth-child(5) > .text-muted');
});