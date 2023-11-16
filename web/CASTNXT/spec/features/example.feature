Feature: Simple Math
  Scenario: Add two numbers
    Given I have numbers 5 and 10
    When I add them
    Then I should get 15

  Scenario: Add zero and a number
    Given I have numbers 0 and 7
    When I add them
    Then I should get 7

  Scenario: Add negative numbers
    Given I have numbers -3 and -8
    When I add them
    Then I should get -11

  Scenario: Addition
    Given I have numbers 5 and 3
    When I add them
    Then I should get 8