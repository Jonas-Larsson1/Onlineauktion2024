import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the first page', () => {
  cy.visit("/")
});

When('I click on the register button', () => {
  cy.get('.register-link').click()
});

Then('I can see the {string}-form', (searchString) => {
  cy.get('header').invoke('text').then((text) => {
    expect(text.toLowerCase()).to.contain(searchString.toLowerCase());
  });
});

When('I enter a username {string} to register', (searchString) => {
  cy.get('#formBasicUsername').type(searchString)
});

When('I enter a password {string} to register', (searchString) => {
  cy.get('#formBasicPassword').type(searchString)
});

When('I click on the Submit button', () => {
  cy.get('.btn').click()
});

Then('I am registered and redirected to the loginpage', () => {
  cy.url().should('contain', 'http://localhost:5173/login')
});

When('I enter a username {string} to login', (searchString) => {
  cy.get('#formUsername').type(searchString)
});

When('I enter a password {string} to login', (searchString) => {
  cy.get('#formPassword').type(searchString)
});

When('I click on the Login button', () => {
  cy.get('.register-form > :nth-child(4)').click()
});

Then('I am logged in and redirected to the homepage', () => {
  cy.url().should('contain', 'http://localhost:5173')
});