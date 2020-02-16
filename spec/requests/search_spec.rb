require 'rails_helper'

RSpec.describe SearchController, type: :controller do
  login_user

  context 'GET #show ' do
    it 'returns search results for query' do
      get :show, params: { q: 'tyler the creator' }
      expect(response).to be_successful
    end

    it 'no query' do
      expect { get :show }.to raise_exception ActionController::ParameterMissing
    end
  end
end
