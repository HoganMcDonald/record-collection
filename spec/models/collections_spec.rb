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

      expect(create(:collection, user: user, default: true)).to be_valid
      expect(create(:collection, user: user, default: true)).to be_invalid
    end
  end
end
