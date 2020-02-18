require 'rails_helper'

RSpec.describe Collection, type: :model do
  it 'has a valid factory' do
    expect(build(:collection)).to be_valid
  end

  context 'validations' do
    it 'requires a name' do
      expect(build(:collection, name: nil)).to be_invalid
    end

    it 'doesn\'t allow for the creation of more than one default collection per user' do
      user = create(:user)

      expect(Collection.where(user: user, default: true).count).to eq 1
      expect(create(:collection, user: user, default: true)).to be_invalid
    end
  end

  context '#add_album!' do
    it 'creates an album and a new albums collection with position at end of collection' do
      col = create(:collection, user: create(:user, :authed))
      expect(col.albums.count).to eq 0
      expect(col.add_album!('spotify:album:5zi7WsKlIiUXv09tbGLKsE')).to be_valid
      expect(col.albums.count).to eq 1
    end
  end

  context '#albums' do
    it 'returns an ordered list of albums' do
      collection = create(:collection)
      albums = [create(:album), create(:album), create(:album)]
      albums.each do |album|
        collection.add_album! album.spotify_uri
      end
      expect(collection.albums.count).to eq 3
      expect(collection.albums).to eq albums
    end
  end
end
