class CreatePracticeRecords < ActiveRecord::Migration[8.1]
  def change
    create_table :practice_records do |t|
      t.string :title
      t.text :content
      t.timestamps
    end
  end
end
