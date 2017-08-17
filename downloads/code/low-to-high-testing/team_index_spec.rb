require 'spec_helper'

describe 'Team index page' do
  
  before(:each) do
    FactoryGirl.create(:team, :name => "Croatia")
  end

  it 'renders the correct text' do
    visit '/teams'
    expect(page).to have_text('2014 World Cup Teams')
    expect(page).to have_text('Croatia')
  end

  # ...
end