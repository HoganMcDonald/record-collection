class MissingAuthTokenError < StandardError; end

class Spotify
  def initialize(user)
    @user = user
    set_token!
  end

  def player_status!
    response = get!('/me/player')
    response.body
  end

  private

  SPOTIFY_BASE_URI = 'https://api.spotify.com/v1'.freeze

  def client
    @client ||= Faraday.new do |conn|
      conn.response :json
      conn.use Faraday::Response::RaiseError
      conn.adapter Faraday.default_adapter
    end
  end

  def url(endpoint)
    SPOTIFY_BASE_URI + endpoint
  end

  def get!(endpoint)
    refresh_token!
    client.get(url(endpoint), {}, Authorization: "Bearer #{@token}")
  end

  def set_token!
    @token = @user.spotify_access_token
    @refresh = @user.spotify_refresh_token
    @expires_at = @user.spotify_token_expires_at
    raise MissingAuthTokenError unless @token && @refresh && @expires_at
  end

  def refresh_token!
    return unless @expires_at.before? Time.now

    data = {
      grant_type: 'refresh_token',
      refresh_token: @refresh
    }

    connection = Faraday.new('https://accounts.spotify.com/api/token') do |conn|
      conn.adapter Faraday.default_adapter
      conn.response :json
    end

    response = connection.post do |req|
      req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      req.headers['Authorization'] = 'Basic ' + Base64.strict_encode64("#{ENV['SPOTIFY_KEY']}:#{ENV['SPOTIFY_SECRET']}")
      req.body = URI.encode_www_form(data)
    end

    @user.update!(
      spotify_access_token: response.body['access_token'],
      spotify_token_expires_at: Time.now + response.body['expires_in'].to_i)
    set_token!
  end
end