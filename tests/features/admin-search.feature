Feature: Admin / User Management

  Scenario Outline: Verify that user is redirected to Dashboard when logging in successfully with correct username and password
    Given I am on the landing page
    When I fill in the login form with username "Admin" and password "admin123"
    And I hit the login button
    And I access the "Admin" menu
    And I search for the user with "<username>"
    Then I should see the user in the search results

    Examples:
      | username |
      | Admin    |
