Feature: Create new auction
    As a user I want to create a new auction with customizable image/s, title, description, dates, time, category

  Scenario Outline: Create new auction
    Given I am on the "Sell"-page
    And I type "https://www.zoochat.com/community/media/regal-angelfish-london-zoo-22nd-october-2019.465529/full?d=1571770643" in the first image-field
    And I type "https://live.staticflickr.com/4839/40431719563_dd0489fdbc_b.jpg" in the second image-field
    And I type "https://th.bing.com/th/id/OIP.lUL5eiQoxBBnuySaJtIg4gHaFC?rs=1&pid=ImgDetMain" in the third-image field
    And I type "Regal Angelfish" in the Title-field
    And I type "My favourite fish" in the Description-field
    And I choose "05/01/2024" as Start Date
    And I choose "05/05/2024" as End Date
    And I type "350" as Start Price
    And I type "550" as Reserved Price
    And I click on "Categories"-button
    And I choose "Add custom category"-field
    And I type "Fish"
    And I click "Enter"
    When I click on "Submit"-button
    Then I get redirected to homepage where I see my submitted auction


    # And I choose "10:00" as Start time
    # And I choose "18:00" as End time