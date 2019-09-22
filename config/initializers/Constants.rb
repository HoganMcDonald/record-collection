module RecordCollection
  CLIENT_HOST = Rails.env == 'production' ? ENV['CLIENT_HOST'] : 'http://localhost:3000'
end
