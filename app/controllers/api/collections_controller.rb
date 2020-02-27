class Api::CollectionsController < ApiController
  before_action :authenticate_user!

  def show
    @collection = @current_user.default_collection
    @albums = @collection.spotify_albums! unless @collection.albums.empty?
  end

  def update
    @collection = @current_user.default_collection

    handle_new_album!

    @albums = @collection.spotify_albums!
  end

  private

  def handle_new_album!
    @collection.add_album! update_params[:uri] if update_params[:uri]
  rescue ActiveRecord::RecordInvalid
    render json: { errors: ['Album already in collection.'] }, status: 422
  end

  def update_params
    params.permit(:collection, :uri)
  end
end
