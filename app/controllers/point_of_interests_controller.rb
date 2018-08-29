class PointOfInterestsController < ApplicationController


  def new
    @poi = PointOfInterest.new
  end

  def create
    @poi = PointOfInterest.new(poi_params)
  end

  private

  def poi_params
    params.require(:point_of_interest).permit(:name, :lat, :long, :description, :photo, :url, :type)
  end

end
