# frozen_string_literal: true

class AlbumsCollection < ActiveRecord::Base
  belongs_to :album
  belongs_to :collection
end
