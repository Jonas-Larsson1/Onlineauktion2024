Feature: Registration requirement handling 
As a user I want to see a message that gives me information about the requirements, when they are not met

Scenario: As a user I want to know when my inputs does not meet the requirements
Given I am on the registration page
When I write a faulty username such as "<input>" 
And I write a faulty password such as "short"
Then I get two messages telling me the why my input is faulty




Examples:
|   input                     |
|    test                     |
|    superduperlongtesting    |