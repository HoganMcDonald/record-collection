Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, ENV['SPOTIFY_KEY'], ENV['SPOTIFY_SECRET'], scope: %w(
    playlist-read-private
    user-read-private
    user-read-email
    user-read-playback-state
    user-modify-playback-state
    user-read-currently-playing
  ).join(' ')
end
