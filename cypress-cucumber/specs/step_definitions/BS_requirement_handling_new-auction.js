import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the new-auction page', () => {
   cy.visit("/");
   cy.get("#formUsername").type("bertil");
   cy.get("#formPassword").type("bertil123");
   cy.get(".register-form > :nth-child(4)").click();
   cy.get(":nth-child(2) > .ms-3 > img").click();
  
});

When('I leave the {string} field empty', (field) => {
  cy.get('[style="width: 30%;"] > :nth-child(1) > :nth-child(1)').type('testing')
  cy.get('[style="width: 30%;"] > :nth-child(1) > :nth-child(2)').type('testing')
  cy.get('[style="width: 30%;"] > :nth-child(1) > :nth-child(3)').type('testing')
  cy.get('[placeholder="Title"]').type('testing')
  cy.get('[placeholder="Description"]').type('testing')
  cy.get('#dropdownMenuButton1').click()
  cy.get('.list-group > :nth-child(1)').click()
  cy.get(field )
});

When('I click the submit button', () => {
  cy.get('.btn-primary').click()
});

Then('I am provided with a error message', () => {
    cy.get('.fade')
});