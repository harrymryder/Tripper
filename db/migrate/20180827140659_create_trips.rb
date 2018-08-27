class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.string :name
      t.text :description
      t.references :user, foreign_key: true
      t.string :start_location
      t.string :end_location
      t.float :start_lat
      t.float :start_long
      t.date :start_date
      t.date :end_date
      t.string :travel_type
      t.string :photo
      t.integer :preferred_travel_time

      t.timestamps
    end
  end
end
