class LegsController < ApplicationController
  # def index
  def create
    @trip = Trip.find(params[:trip_id])
    @poi = PointOfInterest.find(params[:poi_id])
    @leg = Leg.new(trip_id: @trip.id, point_of_interest: @poi)
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

  def edit
    @trip = Trip.find(params[:trip_id])
    @leg = Leg.find(params[:id])
  end

  def update
    # @trip = Trip.find(params[:trip_id])
    @leg = Leg.find(params[:id])
    @leg.update(leg_params)

    respond_to do |format|
      format.js
    end
    # redirect_to page_path(@trip)
  end

  private

  def leg_params
    params.require(:leg).permit(:length_of_stay)
  end
end
