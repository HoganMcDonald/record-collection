module Spotify
  class User < Base
    def initialize(options = {})
      @email ||= options[:email]
      super()
    end

    def get_me
      response = get
      byebug
    end
  end
end
