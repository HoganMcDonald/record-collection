class CreateAlbums < ActiveRecord::Migration[6.0]
  def change
    create_table :albums do |t|
      t.string :spotify_uri, required: true
      t.string :name
      t.string :artist_name
      t.string :thumbnail

      t.timestamps
    end
  end
end
