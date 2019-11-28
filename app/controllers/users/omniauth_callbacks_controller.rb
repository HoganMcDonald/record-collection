module Users
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    def omniauth_success
      get_resource_from_auth_hash
      set_token_on_resource
      create_auth_params

      @resource.spotify_access_token = auth_hash.credentials.token
      @resource.spotify_refresh_token = auth_hash.credentials.refresh_token
      @resource.spotify_token_expires_at = Time.at auth_hash.credentials.expires_at
      sign_in(:user, @resource, store: false, bypass: false)
      @resource.save!

      yield @resource if block_given?

      update_auth_header

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
        "?uid=#{CGI.escape response.headers['uid']}",
        "&expiry=#{response.headers['expiry']}",
        "&client=#{CGI.escape response.headers['client']}",
        "&access-token=#{CGI.escape response.headers['access-token']}",
      ].join('')
    end
  end
end
