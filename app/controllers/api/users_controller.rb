class Api::UsersController < ApiController
  before_action :authenticate_user!

  def me
  end
end
