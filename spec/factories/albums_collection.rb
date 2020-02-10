FactoryBot.define do
  factory :albums_collection do
    album { create(:album) }
    collection { create(:collection) }
  end
end
