class CalendarsController < ApplicationController
  def show
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    @start_date = @date.beginning_of_month.beginning_of_week(:sunday)
    @end_date = @date.end_of_month.end_of_week(:sunday)

    # その月の練習記録を取得
    @practice_records = current_user.practice_records
      .where(created_at: @start_date.beginning_of_day..@end_date.end_of_day)
      .group_by { |record| record.created_at.to_date }
  end
end
