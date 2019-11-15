Feature: Users

  Scenario: User CRUD
    Given I am at the list of "users"
    Then I should see "No users available yet"
    # create
    And I click "Add User"
    # Given I am at the "users" "add" page # this step may redundant
    Then I should see "Add User"
    When I fill in "firstname" with "firstname"
    And I fill in "lastname" with "lastname"
    And I click "Submit"
    Given I am at the list of "users"
    # Details
    When I click "Details"
    Then I should see "User Details"
    And I should see "firstname"
    And I should see "lastname"
    # update
    When I click "Edit"
    Then I should see "Edit User"
    When I fill in "firstname" with "otherfirstname"
    And I fill in "lastname" with "otherlastname"
    And I click "Submit"
    Given I am at the list of "users"
    Then I should see "otherfirstname"
    And I should see "otherlastname"
    # Then I should not see "name" # these test are fail
    # And I should not see "firstname"
    # And I should not see "lastname"
    # delete
    When I click "Delete"
    And I should not see "otherfirstname"
    And I should not see "otherlastname"
    Then I should see "No users available yet"
