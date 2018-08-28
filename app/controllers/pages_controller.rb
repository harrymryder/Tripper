class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @trip = Trip.new
  end

  # def search
  #   term  = params[:term]
  #   cities = City.where('name LIKE ? OR code LIKE ?', "%#{term}%", "%#{term}%").order(:name)
  #   render json: cities.map { |city|
  #     {
  #       id:    city.id,
  #       label: city.inspect,
  #       value: city.full_name
  #     }
  #   }
  # end
end
