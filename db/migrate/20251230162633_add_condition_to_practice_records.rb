class AddConditionToPracticeRecords < ActiveRecord::Migration[8.1]
  def change
    add_column :practice_records, :condition, :integer, null: true
  end
end
