Feature: Navigation bar

  Scenario: Working navigation entries
    Given I am on the homepage
    When I follow "Users"
    # todo: within the navbar
    Then I should be on the "Users List" page

    # Given I am on the homepage
    # When I follow "About"
    # # todo: within the navbar
    # Then I should be on the "About" page
