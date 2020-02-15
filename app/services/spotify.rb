class MissingAuthTokenError < StandardError; end
class UnsupportedUriTypeError < StandardError; end

class Spotify
  def initialize(user)
    @user = user
    set_token!
  end

  def player_status!
    response = get!('/me/player')
    response.body
  end

  def play!(data = {})
    put!('/me/player/play', data)
  end

  def pause!
    put!('/me/player/pause')
  end

  def seek!(data = {})
    put!("/me/player/seek?#{data.to_query}")
  end

  def search!(q = '')
    get!("/search?q=#{q}&type=album,artist,track")
  end

  def from_uri!(uri)
    components = parse_uri(uri)

    unless components[:entity].present? && components[:id].present?
      raise UnsupportedUriTypeError, "Invalid URI provided \"#{uri}\""
    end

    if components[:entity] == 'album'
      get!("/albums/#{components[:id]}")
    else
      raise UnsupportedUriTypeError,
            "unable to find entity for uri #{components[:entity]}."
    end
  end

  private

  def parse_uri(uri)
    components = uri.split ':'
    {
      entity: components[1],
      id: components[2]
    }
  end

  SPOTIFY_BASE_URL = 'https://api.spotify.com/v1'.freeze

  def client
    @client ||= Faraday.new do |conn|
      conn.response :json
      conn.use Faraday::Response::RaiseError
      conn.adapter Faraday.default_adapter
    end
  end

  def url(endpoint)
    SPOTIFY_BASE_URL + endpoint
  end

  def get!(endpoint)
    refresh_token!
    client.get(url(endpoint), {}, Authorization: "Bearer #{@token}")
  end

  def put!(endpoint, data = {})
    refresh_token!
    client.put(url(endpoint), data.to_json, Authorization: "Bearer #{@token}")
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
      req.headers['Authorization'] = 'Basic ' + Base64.strict_encode64(
        "#{RecordCollection::SPOTIFY_CLIENT_ID}:#{RecordCollection::SPOTIFY_CLIENT_SECRET}"
      )
      req.body = URI.encode_www_form(data)
    end

    @user.update!(
      spotify_access_token: response.body['access_token'],
      spotify_token_expires_at: Time.now + response.body['expires_in'].to_i)
    set_token!
  end
end
