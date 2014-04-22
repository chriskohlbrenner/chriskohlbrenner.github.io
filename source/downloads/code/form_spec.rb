# before block, etc.
it "sends bitcoin and message" do
  page.fill_in('name_or_email', :with=>"c.kohlbrenner@gmail.com")
  page.fill_in('amount', :with=>"0.002")
  page.fill_in('message', :with=>"Capybara feature test")
  click_button "Send"
  expect(page).to have_text("Sent 0.002 to c.kohlbrenner@gmail.com.")
end
# more tests