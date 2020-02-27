class Api::SearchController < ApiController
  before_action :authenticate_user!

  def show
    response = spotify_client.search! search_query
    @results = response.body
  end

  private

  def spotify_client
    @spotify_client ||= ::Spotify.new(@current_user)
  end

  def search_query
    params.require(:q)
  end
end
