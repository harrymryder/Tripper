class TripsController < ApplicationController

  skip_before_action :authenticate_user!, only: :show

  # def index
  #   @trips = Trip.all
  # end

  def show
    @trip = Trip.find(params[:id])
    @markers = []
    PointOfInterest.where(country: @trip.start_location).each do |poi|
      @markers << [poi.lat, poi.long, poi.name, poi.description, poi.url, poi.photo]
    end
    @legs = Leg.where(trip_id: params[:id])
    @leg_list = []
    @legs.each do |leg|
      geocode = [ leg.point_of_interest.lat, leg.point_of_interest.long ]
      @leg_list << geocode
    end
    @leg_list

    total_stay = (@trip.end_date - @trip.start_date).to_i

    if @trip.legs.any?
      all_los = @trip.legs.map do |leg|
        leg.length_of_stay.nil? ? 0 : leg.length_of_stay
      end
      total_los = all_los.reduce(:+)
      @time_left = total_stay - total_los
    end
  end

  # def new
  #   @trip = Trip.new
  # end

  def create
    @trip = Trip.new(trip_params)
    @trip.user = current_user
    if @trip.save
      redirect_to trip_path(@trip)
    else
      redirect_to root_path
    end
  end

  private

  def trip_params
    params.require(:trip).permit(:name, :description, :user_id, :start_location, :end_location, :start_lat, :start_long, :start_date, :end_date, :travel_type, :photo, :preferred_travel_time)
  end

end
