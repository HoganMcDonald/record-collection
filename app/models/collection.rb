# frozen_string_literal: true

class Collection < ActiveRecord::Base
  belongs_to :user

  validates :user_id, presence: true
  validates :name, presence: true

  validate :ensure_one_default_per_user, if: :default

  private

  def ensure_one_default_per_user
    return if user.collections.where(default: true).count <= 1

    errors.add(:default, 'Users can only have 1 default collection')
  end
end
