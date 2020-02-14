require 'rails_helper'

RSpec.describe Album, type: :model do
  it 'has a valid factory' do
    expect(build(:album)).to be_valid
  end

  context 'validations' do
    it 'requires a spotify_uri' do
      expect(build(:album, spotify_uri: nil)).to be_invalid
    end

    it 'requires a name' do
      expect(build(:album, name: nil)).to be_invalid
    end

    it 'requires an artist_name' do
      expect(build(:album, artist_name: nil)).to be_invalid
    end

    it 'requires a unique spotify uri' do
      expect(
        create(:album, spotify_uri: 'spotify:album:54DU59anGQsdrFP7utpshG')
      ).to be_valid
      expect(
        build(:album, spotify_uri: 'spotify:album:54DU59anGQsdrFP7utpshG')
      ).to be_invalid
    end
  end
end
