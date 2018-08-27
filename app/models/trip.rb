class Trip < ApplicationRecord
  belongs_to :user
  has_many :legs
  has_many :point_of_interests, through: :legs

  validates :start_location, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
end
