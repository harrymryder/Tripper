class CreatePointOfInterests < ActiveRecord::Migration[5.2]
  def change
    create_table :point_of_interests do |t|
      t.string :name
      t.float :lat
      t.float :long
      t.text :description
      t.string :photo
      t.string :url
      t.string :type

      t.timestamps
    end
  end
end
