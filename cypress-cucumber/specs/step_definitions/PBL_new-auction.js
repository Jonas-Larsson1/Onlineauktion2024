import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";



Given('I am not logged in', () => {
  cy.visit("/")
  cy.url().should('include', '/login');
});

When('I log in with valid credentials', () => {
  cy.get('#formUsername').type('bertil');
  cy.get('#formPassword').type('bertil123');
  cy.get('.register-form > :nth-child(4)').should('be.visible');
  cy.get('.register-form > :nth-child(4)').click()
});

Then('I expect to be logged in successfully', () => {
  cy.get('.fs-1').should('include.text', 'Beast of the week')
});

When('I navigate to the sell page', () => {
  cy.get('.sticky-top') 
  .find(':nth-child(2) > .ms-3 > img') 
  .should('be.visible'); 
});

Then('I should be redirected to the sell page', () => {
  cy.get(':nth-child(2) > .ms-3 > img').click();
});

Given('I am on the sell-page', () => {
  cy.url().should('include', '/NewAuction');
});

When('I fill in the auction details', () => {
  cy.get('[style="width: 30%;"] > :nth-child(1) > :nth-child(1)').type('https://www.zoochat.com/community/media/regal-angelfish-london-zoo-22nd-october-2019.465529/full?d=1571770643', {force: true});
  cy.get('[style="width: 30%;"] > :nth-child(1) > :nth-child(2)').type('https://live.staticflickr.com/4839/40431719563_dd0489fdbc_b.jpg', {force: true});
  cy.get('[style="width: 30%;"] > :nth-child(1) > :nth-child(3)').type('https://th.bing.com/th/id/OIP.lUL5eiQoxBBnuySaJtIg4gHaFC?rs=1&pid=ImgDetMain', {force: true});
  cy.get('[placeholder="Title"]').type('Regal Angelfish', {force: true});
  cy.get('[placeholder="Description"]').type('My favourite fish', {force: true})
  cy.get(':nth-child(1) > .d-flex > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
  .click({force: true});
  cy.get('.react-datepicker__day--016').click({force: true});
  cy.get(':nth-child(2) > .d-flex > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click();
  cy.get('.react-datepicker__day--018').click({force: true});
  cy.get(':nth-child(1) > .input-group > .form-control').type(200)
  cy.get(':nth-child(2) > .input-group > .form-control').type(300)
  cy.get('#dropdownMenuButton1').click({force: true});
  cy.get('.list-group > input').should('be.visible');
  cy.get('.list-group > input').type('Fish{enter}');
});

When('I submit the auction', () => {
  cy.get('.btn-primary').click()
});

Then('I should be redirected to the homepage and see my auction listed', () => {
  cy.url().should('include', '/');
  cy.get('.row').should('include.text', 'Regal Angelfish')
});