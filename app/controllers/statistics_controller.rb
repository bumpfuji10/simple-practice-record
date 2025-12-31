class StatisticsController < ApplicationController
  def show
    # 年間データを取得（過去12ヶ月）
    @yearly_records = current_user.practice_records
      .where(created_at: 12.months.ago.beginning_of_month..Time.current)
      .order(created_at: :asc)

    # 月ごとの平均調子を計算（年次グラフ用）
    @monthly_conditions = @yearly_records.group_by { |r| r.created_at.beginning_of_month }
      .transform_values { |records| records.map(&:condition).compact.sum.to_f / records.size }
      .sort_by { |date, _| date }

    # 過去12ヶ月の各月のデータを作成（月次グラフ用）
    @months_data = {}
    12.times do |i|
      month = i.months.ago.beginning_of_month
      month_end = month.end_of_month

      records = current_user.practice_records
        .where(created_at: month..month_end)
        .order(created_at: :asc)

      daily_conditions = records.group_by { |r| r.created_at.to_date }
        .transform_values { |recs| recs.map(&:condition).compact.sum.to_f / recs.size }
        .sort_by { |date, _| date }

      @months_data[month.strftime('%Y-%m')] = {
        label: month.strftime('%Y年%m月'),
        labels: daily_conditions.map { |date, _| date.strftime('%m/%d') },
        data: daily_conditions.map { |_, condition| condition }
      }
    end

    # 統計情報
    @total_records = current_user.practice_records.count
    @avg_condition = current_user.practice_records.where.not(condition: nil).average(:condition)&.round(1)
    @records_this_month = current_user.practice_records
      .where(created_at: Time.current.beginning_of_month..Time.current.end_of_month).count
  end
end
