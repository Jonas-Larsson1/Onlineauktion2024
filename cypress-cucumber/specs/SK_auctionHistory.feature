Feature: See auction and bidding history for the current logged in user
    As a user I want to be able to 
    View my auction and bidding history so that I can keep track of my activities on the site

    Scenario: User can see the history overview
        Given I am logged in as a user
        When I go to the account page
        Then I should see an overview of my auction and bidding history 

    Scenario: If the user wants to navigate into any of the four specific sections
        Given that I am on the account page
        And the section I want to view has one or more items
        When I click on "View more" on the specified section
        Then I should see a list of all my items for that section
