class Leg < ApplicationRecord
  belongs_to :trip
  belongs_to :point_of_interest
end
