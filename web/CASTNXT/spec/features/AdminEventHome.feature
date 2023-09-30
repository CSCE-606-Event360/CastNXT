Feature: Admin Event Home

  Scenario: Load AdminEventHome
    Given AdminEventHome component is rendered with default properties
    Then the rendered component should match the snapshot

  Scenario: AdminEventHome OnChange Success
    Given AdminEventHome component is rendered with default properties
    When the ToggleButtonGroup changes with value "Value" and mock response is successful
    Then the rendered component should match the snapshot

  Scenario: AdminEventHome OnChange Failure
    Given AdminEventHome component is rendered with default properties
    When the ToggleButtonGroup changes with value "Value" and mock response fails with status 403
    Then the rendered component should match the snapshot