module Spotify
  class Base
    def get
      http.get
    end

    private

    SPOTIFY_BASE_URI = 'https://api.spotify.com/v1'.freeze

    def http
      @http ||= Faraday.new(:url => SPOTIFY_BASE_URI) do |faraday|
        faraday.request  :url_encoded             # form-encode POST params
        faraday.response :logger                  # log requests to $stdout
        faraday.adapter  Faraday.default_adapter  # make requests with Net::HTTP
      end
    end
  end
end
