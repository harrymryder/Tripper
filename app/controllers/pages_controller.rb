class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @trip = Trip.new
    @points_of_interest = PointOfInterest.all
  end

  def show
    @user = User.find(current_user[:id])
    @trips = current_user.trips
    @pois = PointOfInterest.all
    # @trips.each do |trip|
    #   @markers = PointOfInterest.where(country: trip.start_location).map do |poi|
    #     [poi.lat, poi.long, poi.name, poi.description, poi.url]
    #   end
    # end
  end
  # to display mutiple pois in the map
  # current_user.trips.each do |trip|
  #   @markers = PointOfInterest.where(country: trip.start_location).map do |poi|
  #     @array << [poi.lat, poi.long, poi.name, poi.description, poi.url]
  #   end
  # end
end
