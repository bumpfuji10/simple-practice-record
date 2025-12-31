class DashboardsController < ApplicationController
  def show
    # カレンダー用のデータ
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    @start_date = @date.beginning_of_month.beginning_of_week(:sunday)
    @end_date = @date.end_of_month.end_of_week(:sunday)

    @practice_records = current_user.practice_records
      .for_calendar_month(@date)
      .grouped_by_date

    # 統計用のデータ（カレンダーと同じ月のデータ）
    month_start = @date.beginning_of_month
    month_end = @date.end_of_month

    records = current_user.practice_records
      .where(created_at: month_start..month_end)
      .order(created_at: :asc)

    # 日別の平均調子を計算
    daily_conditions = records.group_by { |r| r.created_at.to_date }
      .transform_values { |recs| recs.map(&:condition).compact.sum.to_f / recs.size }
      .sort_by { |date, _| date }

    @current_month_data = {
      labels: daily_conditions.map { |date, _| date.strftime('%m/%d') },
      data: daily_conditions.map { |_, condition| condition }
    }

    # 統計情報（カレンダーの月に基づく）
    @total_records = current_user.practice_records.count
    @avg_condition = current_user.practice_records.where.not(condition: nil).average(:condition)&.round(1)
    @records_this_month = records.count
  end
end
