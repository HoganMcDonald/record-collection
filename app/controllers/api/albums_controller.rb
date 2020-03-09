class Api::AlbumsController < ApiController
  before_action :authenticate_user!

  def show
    response = spotify_client.from_uri! "spotify:album:#{permitted_params[:spotify_id]}"
    @album = response.body
  end

  private

  def permitted_params
    params.permit(:spotify_id)
  end

  def spotify_client
    @spotify_client ||= ::Spotify.new(current_user)
  end
end
