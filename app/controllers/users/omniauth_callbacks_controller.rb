module Users
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    def omniauth_success
      # You need to implement the method below in your model (e.g. app/models/user.rb)
      @user = User.from_omniauth(request.env["omniauth.auth"])

      if @user.persisted?
        sign_in @user
        redirect_to "#{RecordCollection::CLIENT_HOST}/new"
      else
        session["devise.spotify_data"] = request.env["omniauth.auth"]
        redirect_to new_user_registration_url
      end
    end

    def failure
      redirect_to "#{RecordCollection::CLIENT_HOST}/?error=#{CGI.escape('Unable to sign in due to Spotify error.')}"
    end
  end
end
