class PlayersController < ApplicationController
  before_action :authenticate_user!

  def show
    @player = spotify_client.player_status!
    head :no_content if @player.nil?
  end

  def update
    @player = nil

    spotify_client.pause! if update_params[:pause].present?

    spotify_client.play! if update_params[:play].present?

    head :no_content if @player.nil?
  end

  private

  def spotify_client
    @spotify_client ||= ::Spotify.new(@current_user)
  end

  def update_params
    params.require(:player).permit(:play, :pause)
  end
end
