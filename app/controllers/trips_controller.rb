class TripsController < ApplicationController

  skip_before_action :authenticate_user!, only: :show

  # def index
  #   @trips = Trip.all
  # end

  # def show
  #   @trip = Trip.find(params[:id])
  # end

  def new
    @trip = Trip.new
  end

  def create
    trip = Trip.new(trip_params)
    trip.user = current_user
    if trip.save
      redirect_to trip_path(trip)
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
