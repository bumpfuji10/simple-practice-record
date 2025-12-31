class PracticeRecord < ActiveRecord::Base
  belongs_to :user

  validates :title, presence: true, length: { maximum: 5 }
  validates :content, presence: true
  validates :condition, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 10 }, allow_nil: true

end
