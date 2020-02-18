class CollectionsController < ApplicationController
  before_action :authenticate_user!

  def show
    @collection = @current_user.default_collection
    @albums = @collection.spotify_albums!
  end

  def update
    @collection = @current_user.default_collection
    @collection.add_album! update_params[:uri] if update_params[:uri]
    @albums = @collection.spotify_albums!
  end

  private

  def update_params
    params.permit(:collection, :uri)
  end
end
