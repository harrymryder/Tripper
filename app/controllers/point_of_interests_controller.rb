class PointOfInterestsController < ApplicationController


  def new
    @poi = PointOfInterest.new
  end

  def create
    @poi = PointOfInterest.new(poi_params)

    redirect_to trip_path

  end

  private

  def poi_params
    params.require(:point_of_interest).permit(:name, :lat, :long, :description, :photo, :url, :type, :country)
  end

end
