class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])

    # カレンダー用のデータ
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    @start_date = @date.beginning_of_month.beginning_of_week(:sunday)
    @end_date = @date.end_of_month.end_of_week(:sunday)

    @practice_records = @user.practice_records
      .where(created_at: @start_date.beginning_of_day..@end_date.end_of_day)
      .group_by { |record| record.created_at.to_date }
  end
end