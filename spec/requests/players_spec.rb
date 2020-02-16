require 'rails_helper'

RSpec.describe PlayersController, type: :controller do
  login_user

  context 'GET #show' do
    it 'returns the current player status' do
      get :show
      expect(response).to be_successful
    end

    it 'returns no content if there is no active player' do
      stub_request(:get, 'https://api.spotify.com/v1/me/player')
        .with(@request_headers)
        .to_return(status: 204)
      get :show
      expect(response).to have_http_status :no_content
    end

    it 'returns error if there is an exception in faraday' do
      stub_request(:get, 'https://api.spotify.com/v1/me/player')
        .with(@request_headers)
        .to_return(status: 400)
      expect { get :show }.to raise_exception Faraday::ClientError
    end
  end
end
