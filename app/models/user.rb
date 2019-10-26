# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise  :omniauthable, omniauth_providers: %i[spotify]
  include DeviseTokenAuth::Concerns::User

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.nickname = auth.info.nickname
      user.name = auth.info.name
      user.image = auth.info.image
    end
  end
end
