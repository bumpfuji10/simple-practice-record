class User < ApplicationRecord
  has_many :practice_records, dependent: :destroy
end
