module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def spotify
      @user = User.from_omniauth(auth_hash)

      if @user.persisted?
        sign_in_and_redirect @user, event: :authentication
      else
        redirect_to "/login?error=#{CGI.escape('Failed to sign in to Spotify.')}"
      end
    end

    def failure
      redirect_to "/login?error=#{CGI.escape('Failed to sign in to Spotify.')}"
    end

    protected

    def auth_hash
      request.env["omniauth.auth"]
    end
  end
end
