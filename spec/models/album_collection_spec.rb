require 'rails_helper'

RSpec.describe AlbumsCollection, type: :model do
  it 'has a valid factory' do
    expect(build(:albums_collection)).to be_valid
  end
end
