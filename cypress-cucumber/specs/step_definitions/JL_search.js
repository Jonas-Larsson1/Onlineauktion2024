import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: I want to get to the search page
Given('I am logged in and on the home page', () => {
  cy.visit("/");
  cy.get("#formUsername").click().type("bertil");
  cy.get("#formPassword").click().type("bertil123");
  cy.get(".register-form > :nth-child(4)").click();
});

When('I click the search button', () => {
  cy.get('[alt="Search button"]').click()
});

Then('I want get taken to the seach page', () => {
  cy.url().should('include', '/searchPage');
});
// 

// Scenario: I search for a keyword I get relevant results
Given('I am on the search page', () => {
  // cy.visit("/searchPage/Collection")
});

When('I enter {string} in the search box and hit enter', (searchString) => {
  cy.get('[placeholder="🔍 Search"]').type(`${searchString}{enter}`, {delay: 100})
});

Then('I am shown relevant results that include {string}', (searchString) => {
  cy.get("div.flex-row:nth-child(2)").invoke('text').then((text) => {
    expect(text.toLowerCase()).to.include(searchString.toLowerCase())
  })
});
// 