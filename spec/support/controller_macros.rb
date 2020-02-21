FactoryBot.define do
  module ControllerMacros
    def login_user
      before(:each) do
        @current_user = FactoryBot.create(:user, :authed)
        request.headers.merge! @current_user.create_new_auth_token
      end
    end
  end
end
