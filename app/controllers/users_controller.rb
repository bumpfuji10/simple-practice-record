class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])

    # カレンダー用のデータ
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    @start_date = @date.beginning_of_month.beginning_of_week(:sunday)
    @end_date = @date.end_of_month.end_of_week(:sunday)

    @practice_records = @user.practice_records
      .for_calendar_month(@date)
      .grouped_by_date
  end
end