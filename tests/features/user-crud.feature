Feature: Users

  Scenario: User CRUD
    Given I am at the list of "users"
    # wait a sec, otherwise 'not see' is true by 'page not ready'
    When I wait a second
    Then I should not see "user@email.web"
    # create
    When I fill in "email" with "user@email.web"
    And I click "Add"
    Then I should see "user@email.web"
    # update
    When I click "user@email.web"
    And I fill in "email" with "other@email.web"
    And I click "Save"
    Then I should see "other@email.web"
    And I should not see "user@email.web"
    # delete
    When I click on the element "[title='delete user other@email.web']"
    # - the following step will fail with the <app-messages> component enabled ...
    # - a reliable fix would be the "within" step extension
    And I should not see "other@email.web"
