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

    it 'creates a default collection when user is created' do
      expect(Collection.where(user: @user, default: true).count).to eq 1
    end
  end
end
