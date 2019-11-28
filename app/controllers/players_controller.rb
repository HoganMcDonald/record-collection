class PlayersController < ApplicationController
  before_action :authenticate_user!

  def show
    @player = spotify_client.player_status!
  end

  private

  def spotify_client
    @spotify_client ||= ::Spotify.new(@current_user)
  end
end
