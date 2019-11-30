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

    if update_params[:position_ms].present?
      spotify_client.seek!({ position_ms: update_params[:position_ms] })
    end

    head :no_content if @player.nil?
  end

  private

  def spotify_client
    @spotify_client ||= ::Spotify.new(@current_user)
  end

  def update_params
    params.require(:player).permit(:play, :pause, :position_ms)
  end
end
