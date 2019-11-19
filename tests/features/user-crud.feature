Feature: Users

  Scenario: User CRUD
    Given I am at the list of "users"
    Then I should see "No users available yet"
    # create
    And I click "Add User"
    # Given I am at the "users" "add" page # this step may redundant
    Then I should see "User Add"
    When I fill in "firstname" with "John"
    And I fill in "lastname" with "Doe"
    And I click "Submit"
    Given I am at the list of "users"
    # Details
    When I click "Details"
    Then I should see "User Details"
    And I should see "John"
    And I should see "Doe"
    # update
    When I click "Edit"
    Then I should see "Edit User"
    When I fill in "firstname" with "Jane"
    And I click "Submit"
    Given I am at the list of "users"
    Then I should see "Jane"
    And I should not see "John"
    # delete
    When I click "Delete"
    And I should not see "Jane"
    And I should not see "Doe"
    Then I should see "No users available yet"
