class TripsController < ApplicationController

  skip_before_action :authenticate_user!, only: :show

  # def index
  #   @trips = Trip.all
  # end

  def show
    @trip = Trip.find(params[:id])


    @markers = PointOfInterest.where(country: @trip.start_location).map do |poi|
      [poi.lat, poi.long, poi.name, poi.description, poi.url]
    end
    # @markers = PointOfInterest.where(country: params[:country]).where.not(lat: nil, lng: nil).map do |poi|
    #   [poi.lat, poi.long]
    # end
  end

  def new
    @trip = Trip.new
  end

  def create
    @trip = Trip.new(trip_params)
    @trip.user = current_user
    if @trip.save
      redirect_to trip_path(@trip)
    else
      redirect_to root_path
    end
  end

  # def edit
  # end

  # def update
  # end

  # def destroy
  # end

  private

  def trip_params
    params.require(:trip).permit(:name, :description, :user_id, :start_location, :end_location, :start_lat, :start_long, :start_date, :end_date, :travel_type, :photo, :preferred_travel_time)
  end
end
