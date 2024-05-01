Feature: Search for auctions

    Scenario: I want to get to the search page
      Given I am logged in and on the home page
      When I click the search button
      Then I want get taken to the seach page

    Scenario: I search for a keyword I get relevant results
      Given I am on the search page
      When I enter "<keyword>" in the search box and hit enter
      Then I am shown relevant results that include "<keyword>"

      Examples:

      | keyword |
      | monkey |
      | hyrax |
      | antelope |
      | duck |
      | bird |