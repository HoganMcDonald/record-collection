# frozen_string_literal: true

class Album < ActiveRecord::Base
  has_many :albums_collections
  has_many :collections, through: :albums_collection

  validates_presence_of :artist_name, :name, :spotify_uri
end
