FactoryBot.define do
  factory :collection do
    name { 'my collection' }
    default { false }
    user { create(:user) }
  end
end
