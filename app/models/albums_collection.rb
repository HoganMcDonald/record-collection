# frozen_string_literal: true

class AlbumsCollection < ActiveRecord::Base
  belongs_to :album
  belongs_to :collection

  acts_as_list scope: :collection

  validates_presence_of :position

  validates_uniqueness_of :album_id, scope: :collection_id
end
