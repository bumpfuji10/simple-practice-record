class PracticeRecord < ActiveRecord::Base
  belongs_to :user

  validates :title, presence: true, length: { maximum: 5 }
  validates :content, presence: true
  validates :condition, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 10 }, allow_nil: true

  # 日付範囲でフィルタリング
  scope :in_date_range, ->(start_date, end_date) {
    where(created_at: start_date.beginning_of_day..end_date.end_of_day)
  }

  # 月のカレンダー範囲（週の日曜日から土曜日まで）
  scope :for_calendar_month, ->(date) {
    start_date = date.beginning_of_month.beginning_of_week(:sunday)
    end_date = date.end_of_month.end_of_week(:sunday)
    in_date_range(start_date, end_date)
  }

  # 日付ごとにグループ化
  def self.grouped_by_date
    all.group_by { |record| record.created_at.to_date }
  end
end
