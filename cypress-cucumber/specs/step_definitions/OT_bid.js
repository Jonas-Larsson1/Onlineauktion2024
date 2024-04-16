import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the Home page", () => {
  cy.visit("/");
  cy.get("#formUsername").click().type("bertil");
  cy.get("#formPassword").click().type("bertil123");
  cy.get(".register-form > :nth-child(4)").click();
});

When("I click on an auction", () => {
  cy.get(".card > .text-center > .btn").first().click({ force: true });
});

When("I insert at least a minimum bid", () => {
   cy.get(".table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(3)").then((Element) => {
    const newBid = parseInt(Element.text())
    cy.get("#newBid").type(newBid + 1);
  });
});

Then("I click the place bid button", () => {
  cy.get(".me-2").click();
});
