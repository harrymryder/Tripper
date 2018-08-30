class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @trip = Trip.new
    @points_of_interest = PointOfInterest.all
  end

  def show
    @user = User.find(current_user[:id])
    @trips = current_user.trips
  end
end
