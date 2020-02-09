class CreateCollections < ActiveRecord::Migration[6.0]
  def change
    create_table :collections do |t|
      t.belongs_to :user
      t.string :name
      t.boolean :default, default: false

      t.timestamps
    end
  end
end
