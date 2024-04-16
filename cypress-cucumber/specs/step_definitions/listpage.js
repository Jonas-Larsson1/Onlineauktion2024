import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the login page', () => {
  cy.visit("/")
});

When('I type in a correct username', () => {
  cy.get('#formUsername.form-control').type('bertil')
});

When('I type in a correct password', () => {
  cy.get('#formPassword.form-control').type('bertil123') 
});

When('I click on the login button', () => {
    cy.get('.register-form > :nth-child(4)').click()
});


Then('I am presented with a list of all auctions', () => {
  cy.get('div.content')
});