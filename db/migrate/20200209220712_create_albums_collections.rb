class CreateAlbumsCollections < ActiveRecord::Migration[6.0]
  def change
    create_table :albums_collections do |t|
      t.references :album
      t.references :collection
      t.integer :position

      t.timestamps
    end
  end
end
