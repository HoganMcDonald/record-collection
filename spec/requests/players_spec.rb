require 'rails_helper'

RSpec.describe Api::PlayersController, type: :controller do
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

  context 'PUT #update' do
    it 'pauses the player if pause parameter is passed' do
      put :update, params: { player: { pause: true } }
      expect(response).to have_http_status :no_content
      expect(@player_pause).to have_been_requested
      expect(@player_play).not_to have_been_requested
      expect(@player_position_ms).not_to have_been_requested
    end

    it 'plays the player if play parameter is passed' do
      put :update, params: { player: { play: true } }
      expect(response).to have_http_status :no_content
      expect(@player_pause).not_to have_been_requested
      expect(@player_play).to have_been_requested
      expect(@player_position_ms).not_to have_been_requested
    end

    it 'seeks player to position if position_ms parameter is passed' do
      put :update, params: { player: { position_ms: 23_212 } }
      expect(response).to have_http_status :no_content
      expect(@player_pause).not_to have_been_requested
      expect(@player_play).not_to have_been_requested
      expect(@player_position_ms).to have_been_requested
    end
  end
end
