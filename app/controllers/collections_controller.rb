class CollectionsController < ApplicationController
  before_action :authenticate_user!

  def show
    @collection = @current_user.default_collection
    @albums = @collection.spotify_albums!
  end
end
