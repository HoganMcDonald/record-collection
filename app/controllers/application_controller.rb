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
    end

    initial_state.to_json
  end
  helper_method :redux_state
end
