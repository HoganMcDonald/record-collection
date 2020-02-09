require 'rails_helper'

RSpec.describe User, type: :model do
  it 'has a valid factory' do
    expect(build(:user)).to be_valid
  end

  context 'validations' do
    it { expect(true).to eq true }
  end

  context '#default_collection' do
    before :all do
      @user = create(:user)
    end

    it 'does not create a default collection when user is created' do
      expect(Collection.find_by(user: @user)).to be nil
    end

    it 'creates a new default collection for a user the first time its called' do
      expect(Collection.count).to eq 0
      expect(@user.default_collection).to be_valid
      expect(Collection.count).to eq 1
    end

    it 'does not create a new default collection for a user that already has one' do
      expect(Collection.count).to eq 0
      expect(@user.default_collection).to be_valid
      expect(Collection.count).to eq 1
      expect(@user.default_collection).to be_valid
      expect(Collection.count).to eq 1
    end

    it 'returns the default collection that already exists' do
      default_collection = create(:collection, user: @user, default: true)

      expect(@user.default_collection).to eql default_collection
    end
  end
end
