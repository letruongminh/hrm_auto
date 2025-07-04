Feature: Login functionality

  Scenario Outline: Verify that user is redirected to Dashboard when logging in successfully with correct username and password
    Given I am on the landing page
    When I fill in the login form with username "<username>" and password "<password>"
    And I hit the login button
    Then I should be logged in successfully

    Examples:
      | username    | password |
      | Admin       | admin123 |
      | admin       | admin123 |
      | 'Admin    ' | admin123 |

  Scenario: Verify that user is redirected to Reset Password screen when clicking on Forgot your password? link text
    Given I am on the landing page
    When I click on the "Forgot your password?" link
    Then I should be redirected to the "Reset Password" screen

  @test
  Scenario Outline: Verify that an error message is shown when inputting credentials with leading and trailing spaces
    Given I am on the landing page
    When I fill in the login form with username "<username>" and password "<password>"
    And I hit the login button
    Then Alert error "Invalid credentials" should be displayed on the screen

    Examples:
      | username    | password |
      | '    Admin' | admin123 |
