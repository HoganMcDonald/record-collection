FactoryBot.define do
  factory :user do
    email { "#{SecureRandom.hex(10)}@example.com" }
    name { 'Hogan' }
    image { 'https://www.fillmurray.com/200/200' }
    uid { SecureRandom.hex 10 }
    provider { 'spotify' }

    trait :authed do
      spotify_access_token { SecureRandom.hex 60 }
      spotify_refresh_token { SecureRandom.hex 60 }
      spotify_token_expires_at { Time.zone.now + 1.hour }
    end
  end
end
