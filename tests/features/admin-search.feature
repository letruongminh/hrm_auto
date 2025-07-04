@admin-search
Feature: Admin / User Management
As a user with admin privileges
I want to be able to search for existing users

  @test
  Scenario Outline: Verify that the correct user is returned when searching for an existing username
    Given I am on the landing page
    When I fill in the login form with username "Admin" and password "admin123"
    And I hit the login button
    And I access the "Admin" menu
    And I search for the user with by using "username" with "<username>"
    And I hit the search button
    Then I should see the user in the search results

    Examples:
      | username |
      | Admin    |

  @test
  Scenario Outline: Verify that the correct result is returned when searching for an existing employee name
    Given I am on the landing page
    When I fill in the login form with username "Admin" and password "admin123"
    And I hit the login button
    And I access the "Admin" menu
    And I search for the user with by using "employee name" with "<employeeName>"
    And I hit the search button
    Then I should see the user in the search results

    Examples:
      | employeeName |
      | Admin        |

  Scenario: Verify that all users are returned when searching without criteria
    Given I am on the landing page
    When I fill in the login form with username "Admin" and password "admin123"
    And I hit the login button
    And I access the "Admin" menu
    And I hit the search button
    Then I should see the user in the search results
