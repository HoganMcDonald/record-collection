module RecordCollection
  CLIENT_HOST = Rails.env == 'production' ? ENV['CLIENT_HOST'] : 'http://localhost:3000'

  # Spotify
  SPOTIFY_CLIENT_ID = Rails.application.credentials.dig(:spotify, :client_id)
  SPOTIFY_CLIENT_SECRET = Rails.application.credentials.dig(:spotify, :client_secret)
end
