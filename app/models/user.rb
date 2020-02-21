# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models

  has_many :collections, dependent: :destroy #TODO: where not default
  has_one :default_collection,
    -> {
      where(user: self, default: true)
    },
    inverse_of: :user,
    class_name: 'Collection'

  after_create :create_default_collection

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

  # my dirty secret...
  def password=(password) end

  def password_confirmation=(password_confirmation) end

  private

  def create_default_collection
    Collection.create!(
      user: self,
      default: true,
      name: '__default_collection__'
    )
  end
end
