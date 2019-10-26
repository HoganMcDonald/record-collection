module Users
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    after_action :update_auth_header

    def omniauth_success
      get_resource_from_auth_hash
      set_token_on_resource
      create_auth_params

      sign_in(:user, @resource, store: false, bypass: false)
      @resource.save!

      yield @resource if block_given?

      redirect_to "#{RecordCollection::CLIENT_HOST}/#{token_to_params}"
    end

    def failure
      redirect_to "#{RecordCollection::CLIENT_HOST}/?error=#{CGI.escape('Unable to sign in due to Spotify error.')}"
    end

    protected

    def resource_class
      User
    end

    def auth_hash
      request.env["omniauth.auth"]
    end

    private

    def token_to_params
      [
        "?uid=#{CGI.escape @auth_params[:uid]}",
        "&expiry=#{@auth_params[:expiry]}",
        "&client=#{CGI.escape @auth_params[:client_id]}",
        "&access-token=#{CGI.escape @auth_params[:auth_token]}",
      ].join('')
    end
  end
end
