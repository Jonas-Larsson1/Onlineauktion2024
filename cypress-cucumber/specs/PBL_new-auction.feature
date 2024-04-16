Feature: Create new auction
    As a user I want to create a new auction with customizable image/s, title, description, dates, time, category

 Scenario: Logging in and navigating to sell page
    Given I am not logged in
    When I log in with valid credentials
    Then I expect to be logged in successfully
    When I navigate to the sell page
    Then I should be redirected to the sell page
    

Scenario: Creating a new action
    Given I am on the sell-page
    When I fill in the auction details
    And I submit the auction
    Then I should be redirected to the homepage and see my auction listed
    