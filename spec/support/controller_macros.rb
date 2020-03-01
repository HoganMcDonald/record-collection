FactoryBot.define do
  module ControllerMacros
    def login_user
      before(:each) do
        @current_user = FactoryBot.create(:user, :authed)
        sign_in @current_user
      end
    end
  end
end
