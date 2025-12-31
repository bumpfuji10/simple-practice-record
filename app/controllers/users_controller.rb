class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @practice_records = @user.practice_records.order(created_at: :desc)
  end
end