FactoryBot.define do
  factory :album do
    spotify_uri { "spotify:album:#{SecureRandom.hex 22}" }
    name { 'Igor' }
    artist_name { 'Tyler, The Creator' }
  end
end
