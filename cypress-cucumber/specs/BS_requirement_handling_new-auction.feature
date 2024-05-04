Feature: Post new auction requirement handler
As a user I want to be provided with a message telling me which requirements are not met

Scenario: As a user I want be stopped from posting an uncomplete auction
Given I am on the new-auction page
When I leave the "<field>" field empty
And I click the submit button 
Then I am provided with a error message


Examples: 
|      field          |

  |  :nth-child(1) > .input-group > .form-control  |
  |  :nth-child(2) > .input-group > .form-control  |
