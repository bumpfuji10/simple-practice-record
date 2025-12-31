class StatisticsController < ApplicationController
  def show
    # 過去30日間のデータを取得
    @records = current_user.practice_records
      .where(created_at: 30.days.ago.beginning_of_day..Time.current)
      .order(created_at: :asc)

    # 日ごとの平均調子を計算
    @daily_conditions = @records.group_by { |r| r.created_at.to_date }
      .transform_values { |records| records.map(&:condition).compact.sum.to_f / records.size }
      .sort_by { |date, _| date }

    # 統計情報
    @total_records = current_user.practice_records.count
    @avg_condition = current_user.practice_records.where.not(condition: nil).average(:condition)&.round(1)
    @records_this_month = current_user.practice_records
      .where(created_at: Time.current.beginning_of_month..Time.current.end_of_month).count
  end
end
