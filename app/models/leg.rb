class Leg < ApplicationRecord
  belongs_to :trip, dependent: :destroy
  belongs_to :point_of_interest
end
