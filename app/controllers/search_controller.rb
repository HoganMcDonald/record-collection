class SearchController < ApplicationController
  before_action :authenticate_user!

  def show
    response = spotify_client.search! search_params[:q]
    @results = response.body
  end

  private

  def spotify_client
    @spotify_client ||= ::Spotify.new(@current_user)
  end

  def search_params
    params.permit(:q)
  end
end
