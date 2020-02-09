FactoryBot.define do
  factory :user do
    email { 'hogan@example.com' }
    name { 'Hogan' }
    image { 'https://www.fillmurray.com/200/200' }
  end
end
