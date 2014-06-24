require 'rails_helper'

describe TeamsController do
  describe 'GET index' do
    it 'assigns @teams' do
      team = Team.create
      get :index
      expect(assigns(:teams)).to eq([team])
    end

    it 'renders the index template' do
      get :index
      expect(response).to render_template('index')
    end
  end

  describe 'GET show' do
    it 'renders the show template' do
      team = Team.create
      get(:show, {'id' => "1"})
      expect(response).to render_template('show')
    end
  end

  # ...
end