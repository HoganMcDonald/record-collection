# frozen_string_literal: true

class Collection < ActiveRecord::Base
  belongs_to :user

  has_many :albums_collections, dependent: :destroy
  has_many :albums, -> { order 'albums_collections.position' }, through: :albums_collections, dependent: :destroy

  validates :user_id, presence: true
  validates :name, presence: true

  validate :ensure_one_default_per_user, if: :default

  def add_album!(uri)
    ActiveRecord::Base.transaction do
      album = Album.find_or_create_by!(spotify_uri: uri) do |new_album|
        response = spotify_client.from_uri! uri
        new_album.name = response.body.fetch('name')
        new_album.artist_name = response.body.fetch('artists').first.fetch('name')
      end

      albums_collections.create! album: album, position: albums_collections.count + 1
    end
  end

  def spotify_albums!
    spotify_client.from_uris! albums.pluck(:spotify_uri)
  end

  private

  def ensure_one_default_per_user
    return if user.collections.where(default: true).count <= 1

    errors.add(:default, 'Users can only have 1 default collection')
  end

  def spotify_client
    @spotify_client ||= ::Spotify.new(user)
  end
end
