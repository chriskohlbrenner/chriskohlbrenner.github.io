Given /^I have articles titled (.+)$/ do |titles|
  titles.split(', ').each do |title|
    Article.create!(:title => title)
  end
end

When /^I go to the list of articles$/ do
  click_on "All articles"
end

Then(/^I should see "Caching"$/) do
  expect(page).to have_content "Caching"
end

Then(/^I should see "Cucumber"$/) do
  expect(page).to have_content "Cucumber"
end

Then(/^I should see "Redis"$/) do
  expect(page).to have_content "Redis"
end
