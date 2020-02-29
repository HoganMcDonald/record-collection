module RecordCollection
  # Spotify
  SPOTIFY_CLIENT_ID = Rails.application.credentials.dig(:spotify, :client_id)
  SPOTIFY_CLIENT_SECRET = Rails.application.credentials.dig(:spotify, :client_secret)
end
