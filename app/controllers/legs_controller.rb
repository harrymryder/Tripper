class LegsController < ApplicationController
  # def index
  def create
    @trip = Trip.find(params[:trip_id])
    @poi = PointOfInterest.find(params[:poi_id])
    @leg = Leg.new(trip_id: @trip.id, point_of_interest: @poi)
    @leg.save
    respond_to do |format|
      format.html { redirect_to trip_path(@trip) }
      format.js
    end
  end

  def destroy
    @trip = Trip.find(params[:trip_id])
    @poi = PointOfInterest.find(params[:point_of_interest_id])
    @poi_id = @poi.id
    @leg = Leg.find(params[:id])
    @leg.destroy
    respond_to do |format|
      format.html { redirect_to trip_path(@trip) }
      format.js
    end
  end

  def edit
    @trip = Trip.find(params[:trip_id])
    @leg = Leg.find(params[:id])
  end

  def update
    # @trip = Trip.find(params[:trip_id])
    @leg = Leg.find(params[:id])
    @leg.update(leg_params)

    @trip = Trip.find(params[:id])

    total_stay = (@trip.end_date - @trip.start_date).to_i
    all_los = @trip.legs.map do |leg|
      leg.length_of_stay.nil? ? 0 : leg.length_of_stay
    end

    total_los = all_los.reduce(:+)
    @time_left = total_stay - total_los
    # binding.pry
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
