require "application_system_test_case"

class GformsTest < ApplicationSystemTestCase
  setup do
    @gform = gforms(:one)
  end

  test "visiting the index" do
    visit gforms_url
    assert_selector "h1", text: "Gforms"
  end

  test "creating a Gform" do
    visit gforms_url
    click_on "New Gform"

    fill_in "Edit link", with: @gform.edit_link
    fill_in "Name", with: @gform.name
    fill_in "Sheets link", with: @gform.sheets_link
    fill_in "View link", with: @gform.view_link
    click_on "Create Gform"

    assert_text "Gform was successfully created"
    click_on "Back"
  end

  test "updating a Gform" do
    visit gforms_url
    click_on "Edit", match: :first

    fill_in "Edit link", with: @gform.edit_link
    fill_in "Name", with: @gform.name
    fill_in "Sheets link", with: @gform.sheets_link
    fill_in "View link", with: @gform.view_link
    click_on "Update Gform"

    assert_text "Gform was successfully updated"
    click_on "Back"
  end

  test "destroying a Gform" do
    visit gforms_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Gform was successfully destroyed"
  end
end
