class LegsController < ApplicationController
  # def index
  #   @legs = Leg.all
  # end

  # def show
  #   @leg = Leg.find(params[:point_of_interest_id])
  # end


  def new
    @leg = Leg.new
    @trip = Trip.find(params[:trip_id])

    # redirect_to trip_path(@trip)
  end

  def create
    @leg = Leg.new(leg_params)

    @trip = Trip.find(params[:trip_id])
    @leg.trip = @trip
    if @leg.save
      redirect_to trip_path(@trip)
    else
      render :new
    end
    # redirect_to trip_path
  end

  # def edit
  #   # @leg = Leg.find(params[:point_of_interest_id])
  # end

  # def update
  #   @leg = Leg.find(params[:point_of_interest_id])
  #   @leg.update(leg_params)
  # end

  # def destroy
  #   @leg = Leg.find(params[:point_of_interest_id])
  #   @leg.destroy
  # end

  # private

  # def leg_params
  #   params.require(:leg).permit(:trip_id, :point_of_interest_id, :visit_order, :travel_time, :length_of_stay, :travel_type)
  # end
end
