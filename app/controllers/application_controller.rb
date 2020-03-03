class ApplicationController < ActionController::Base
  include Devise::Controllers::Helpers

  def redux_state
    initial_state = {}

    if current_user.present?
      @collection = @current_user.default_collection
      @albums = @collection.spotify_albums! unless @collection.albums.empty?

      initial_state[:user] = JSON.parse render_to_string(
        template: 'api/users/me'
      )

      initial_state[:collections] = {
        defaultCollection: JSON.parse(
          render_to_string(
            template: 'api/collections/show'
          )
        )
      }

      if params[:album_id].present?
        @album = spotify_client.from_uri!("spotify:album:#{params[:album_id]}").body
        initial_state[:albums] = {
          albums: [
            JSON.parse(
              render_to_string(
                template: 'api/albums/show'
              )
            )
          ]
        }
      end
    end

    initial_state.to_json
  end
  helper_method :redux_state

  private

  def spotify_client
    @spotify_client ||= ::Spotify.new(current_user)
  end
end
