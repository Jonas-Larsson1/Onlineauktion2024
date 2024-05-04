Feature: Register

    Scenario: See the image on the first page
        Given that I am on the first page
        When I click on the register button
        Then I can see the "register"-form

        When I enter a username "AceVentura" to register
        When I enter a password "abc123" to register
        When I click on the Submit button
        Then I am registered and redirected to the loginpage

        When I enter a username "AceVentura" to login
        When I enter a password "abc123" to login
        When I click on the Login button
        Then I am logged in and redirected to the homepage