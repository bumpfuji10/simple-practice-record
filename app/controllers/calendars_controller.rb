class CalendarsController < ApplicationController
  def show
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    @start_date = @date.beginning_of_month.beginning_of_week(:sunday)
    @end_date = @date.end_of_month.end_of_week(:sunday)

    # その月の練習記録を取得
    @practice_records = current_user.practice_records
      .for_calendar_month(@date)
      .grouped_by_date
  end
end
