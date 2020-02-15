require 'rails_helper'

RSpec.describe AlbumsCollection, type: :model do
  it 'has a valid factory' do
    expect(build(:albums_collection)).to be_valid
  end

  context 'validations' do
    it 'requires a position' do
      expect(build(:albums_collection, position: nil)).to be_invalid
    end

    it 'prevents album from being repeated in a given collection' do
      album = create(:album)
      collection = create(:collection)
      expect(
        create(:albums_collection, album: album, collection: collection)
      ).to be_valid
      expect(
        build(:albums_collection, album: album, collection: collection)
      ).to be_invalid
    end
  end
end
