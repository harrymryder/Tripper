class CreateLegs < ActiveRecord::Migration[5.2]
  def change
    create_table :legs do |t|
      t.references :trip, foreign_key: true
      t.references :point_of_interest, foreign_key: true
      t.integer :visit_order
      t.integer :travel_time
      t.integer :length_of_stay
      t.string :travel_type

      t.timestamps
    end
  end
end
