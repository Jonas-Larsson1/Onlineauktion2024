import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
 
Given("I am on the Home page", () => {
  cy.visit("/");
  cy.get("#formUsername").click().type("bertil");
  cy.get("#formPassword").click().type("bertil123");
  cy.get(".register-form > :nth-child(4)").click();
});
 
When("I click on an auction", () => {
  
  cy.get('.card > .text-center > .btn').first().click()
  // cy.visit("/AuctionPage/661d17776e69017fb03a60c7");
});
 
When("I insert at least a minimum bid", () => {
  // cy.get("#newBid").click().type("3000");
});
 
Then("I click the place bid button", () => {
  // TODO: implement step
});
 