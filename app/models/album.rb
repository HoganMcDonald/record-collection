# frozen_string_literal: true

class Album < ActiveRecord::Base
  validates_presence_of :artist_name, :name, :spotify_uri
end
