class AddUserIdToPracticeRecords < ActiveRecord::Migration[8.1]
  def change
    add_reference :practice_records, :user, null: true, foreign_key: true
  end
end
