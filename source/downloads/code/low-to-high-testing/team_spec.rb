require 'spec_helper'

describe Team do
  it 'has a valid factory' do
    expect(build(:team)).to be_valid
  end

  let(:croatia) { FactoryGirl.create(:team) }
  let(:brazil) { FactoryGirl.create(:team, :name => "Brazil", :group_rank => 1, :group_points => 7, :wins => 2, :losses => 0, :draws => 1, :goals_for => 7, :goals_against => 2) }
  
  describe '#next_match' do
    context 'when there are upcoming matches' do
      it 'returns the match object' do
        pending("pending until test can retrieve match objects")
        this_should_not_get_executed
      end
    end
  end

  describe '#next_opponent' do
    context 'when there are upcoming matches' do
      it 'returns the team object' do
        pending("pending until test can retrieve team objects")
        this_should_not_get_executed
      end
    end
  end

  describe '#avg_goals_against' do
    it 'returns the avg goals against value' do
      expect(croatia.avg_goals_against).to eq(2.0)
    end
  end

  describe '#avg_goals_for' do
    it 'returns the avg goals for value' do
      expect(brazil.avg_goals_for).to eq(2.33)
    end
  end
end