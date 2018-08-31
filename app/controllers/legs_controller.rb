class LegsController < ApplicationController
  # def index
  def create
    @trip = Trip.find(params[:trip_id])
    @poi = PointOfInterest.find(params[:poi_id])
    @leg = Leg.new(trip: @trip, point_of_interest: @poi)

    if @leg.save
      redirect_to trip_path(@trip)
    else
      puts "didn't save"
    end
  end

  def destroy
    @trip = Trip.find(params[:trip_id])
    # @poi = PointOfInterest.find(params[:poi_id])
    @leg = Leg.find(params[:id])
    @leg.destroy
    redirect_to trip_path(@trip)
  end

  def leg_list
    @legs = Leg.all
    @leg_list = []
    @legs.each do |leg|
      geocode = [ leg.point_of_interest.lat, leg.point_of_interest.long ]
      @leg_list << geocode
    end
    @leg_list
  end
end
