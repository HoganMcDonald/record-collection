class UsersController < ApplicationController
  before_action :authenticate_user!

  def me
    @user = {thing: 'stuff'}
  end
end
