class PracticeRecordsController < ApplicationController

  def index
    @practice_records = PracticeRecord.page(params[:page]).per(10)
    @practice_record = PracticeRecord.new
  end

  def create
    @practice_record = PracticeRecord.new(practice_record_params)
    if @practice_record.save
      respond_to do |format|
        format.turbo_stream
      end
    else
      respond_to do |format|
        format.turbo_stream {
          render :error, status: :unprocessable_entity
        }
      end
    end
  end

  private

  def practice_record_params
    params.expect(practice_record: [:title, :content, :condition])
  end
end