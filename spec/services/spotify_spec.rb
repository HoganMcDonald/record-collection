require 'rails_helper'

RSpec.describe Spotify do
  it 'will not be initialized without a user' do
    expect { Spotify.new }.to raise_exception ArgumentError
  end

  it 'will raise MissingAuthTokenError if user has no token' do
    expect { Spotify.new(build(:user)) }.to raise_exception MissingAuthTokenError
  end

  it 'initializes for an authenticated user' do
    expect(Spotify.new(build(:user, :authed))).to be_an_instance_of Spotify
  end

  context 'authorized client' do
    before :all do
      @spotify_client = Spotify.new(build(:user, :authed))
    end

    describe '#player_status!' do
      it 'returns the status of the current player' do
        stub = stub_request :get, 'https://api.spotify.com/v1/me/player'
        @spotify_client.player_status!
        expect(stub).to have_been_requested
      end

      it 'raises exception if request fails' do
        stub_request(:get, 'https://api.spotify.com/v1/me/player').to_raise(Faraday::ClientError)
        expect {
          @spotify_client.player_status!
        }.to raise_exception Faraday::ClientError
      end
    end

    describe '#play!' do
      it 'successfully plays the player' do
        stub = stub_request :put, 'https://api.spotify.com/v1/me/player/play'
        @spotify_client.play!
        expect(stub).to have_been_requested
      end

      it 'raises exception if request fails' do
        stub_request(:put, 'https://api.spotify.com/v1/me/player/play').to_raise(Faraday::ClientError)
        expect { @spotify_client.play! }.to raise_exception Faraday::ClientError
      end
    end

    describe '#pause!' do
      it 'successfully pauses the player' do
        stub = stub_request :put, 'https://api.spotify.com/v1/me/player/pause'
        @spotify_client.pause!
        expect(stub).to have_been_requested
      end

      it 'raises exception if request fails' do
        stub_request(:put, 'https://api.spotify.com/v1/me/player/pause').to_raise(Faraday::ClientError)
        expect { @spotify_client.pause! }.to raise_exception Faraday::ClientError
      end
    end

    describe '#seek!' do
      it 'seeks to the provided position' do
        @spotify_client.seek!(position_ms: 32_456)
        expect(@player_position_ms).to have_been_requested
      end

      it 'raises an exception if no new position is provided' do
        expect { @spotify_client.seek! }.to raise_exception ArgumentError
      end

      it 'raises exception if request fails' do
        stub_request(:put, 'https://api.spotify.com/v1/me/player/seek')
          .with(query: { position_ms: 32_456 })
          .to_raise(Faraday::ClientError)
        expect {
          @spotify_client.seek!(position_ms: 32_456)
        }.to raise_exception Faraday::ClientError
      end
    end

    describe '#search!' do
      it 'returns search results' do
        stub = stub_request(:get, 'https://api.spotify.com/v1/search')
               .with(query: { type: 'album,artist,track', q: 'tyler the creator' })
        @spotify_client.search! 'tyler the creator'
        expect(stub).to have_been_requested
      end

      it 'raises exception if request fails' do
        stub_request(:get, 'https://api.spotify.com/v1/search')
          .with(query: { type: 'album,artist,track', q: 'tyler the creator' })
          .to_raise(Faraday::ClientError)
        expect {
          @spotify_client.search! 'tyler the creator'
        }.to raise_exception Faraday::ClientError
      end
    end

    describe '#from_uri!' do
      it 'returns an album if uri entity is album' do
        uri = 'spotify:album:3mH6qwIy9crq0I9YQbOuDf'
        @spotify_client.from_uri!(uri)
        expect(@album_get).to have_been_requested
      end

      it 'raises an exception if uri type is track' do
        uri = 'spotify:track:3mH6qwIy9crq0I9YQbOuDf'
        expect { @spotify_client.from_uri!(uri) }.to raise_exception UnsupportedUriTypeError
        expect(@album_get).not_to have_been_requested
      end

      it 'raises an exception if uri type is artist' do
        uri = 'spotify:artist:3mH6qwIy9crq0I9YQbOuDf'
        expect { @spotify_client.from_uri!(uri) }.to raise_exception UnsupportedUriTypeError
        expect(@album_get).not_to have_been_requested
      end

      it 'raises exception if request fails' do
        uri = 'spotify:album:3mH6qwIy9crq0I9YQbOuDf'
        stub_request(:get, 'https://api.spotify.com/v1/albums/3mH6qwIy9crq0I9YQbOuDf')
          .to_raise(Faraday::ClientError)
        expect { @spotify_client.from_uri!(uri) }.to raise_exception Faraday::ClientError
      end
    end

    describe '#from_uris' do
      def test_uris(count = 3)
        uris = [
          'spotify:album:653wRjqO0GOZPQPcXpeAXD',
          'spotify:album:472GvzwE3EZ0i2EEaly5mX',
          'spotify:album:16i5KnBjWgUtwOO7sVMnJB'
        ]

        (1..count).map { |index| uris[index % 3] }
      end

      it 'returns an array of albums when passed an array of uris' do
        uris = test_uris
        @spotify_client.from_uris!(uris)
        expect(@albums_get).to have_been_requested
      end

      it 'raises an exception if uris don\'t all have same type' do
        uris = test_uris.concat ['spotify:track:472GvzwE3EZ0i2EEaly5mX']
        expect(uris.count).to eq 4
        expect { @spotify_client.from_uri! uris }.to raise_exception MixedUriTypeError
        expect(@albums_get).not_to have_been_requested
      end

      it 'executes requests in batches for multiple uris' do
        uris = test_uris 60

        results = @spotify_client.from_uris!(uris)
        expect(@albums_get).to have_been_requested.times 3
        expect(results.is_a?(Array)).to be true
      end
    end
  end
end
