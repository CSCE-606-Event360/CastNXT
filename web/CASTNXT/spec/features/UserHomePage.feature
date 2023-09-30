Feature: User Homepage Functionality

  Background:
    Given the User Homepage component is available

  Scenario: Loading the User Homepage with filled data
    Given the User Homepage is loaded with the following properties:
      | properties                            |
      | USER_PROPERTIES_WITH_SUBMISSIONS      |
    When the User Homepage is rendered
    Then the snapshot should match the expected structure
    And the submitted event list should be rendered

  Scenario: Loading the User Homepage with events in "accepting" status
    Given the User Homepage is loaded with the following properties:
      | properties                            |
      | USER_PROPERTIES_WITH_ACCEPTING        |
    When the User Homepage is rendered
    Then the snapshot should match the expected structure
    And the submitted event list with accepting status should be rendered

  Scenario: User Homepage event handlers
    When the User Homepage is loaded
    And the onSubmit event is triggered
    Then the appropriate event handlers should be called