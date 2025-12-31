class UpdateExistingPracticeRecordsWithCondition < ActiveRecord::Migration[8.1]
  def up
    # 既存のconditionがnullのレコードにランダムな1-10の値を設定
    PracticeRecord.where(condition: nil).find_each do |record|
      record.update_column(:condition, rand(1..10))
    end
  end

  def down
    # ロールバック時は何もしない（データを元に戻さない）
  end
end
