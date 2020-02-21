require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  context 'authenticated' do
    login_user

    it 'returns the logged in user' do
      get :me
      expect(response).to be_successful
    end
  end

  context 'not authenticated' do
    it 'returns unauthorized' do
      get :me
      expect(response).to have_http_status :unauthorized
    end
  end
end
