class AddCountryToPointOfInterests < ActiveRecord::Migration[5.2]
  def change
    add_column :point_of_interests, :country, :string
  end
end
