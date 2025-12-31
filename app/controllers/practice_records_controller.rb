class PracticeRecordsController < ApplicationController

  def index
    @practice_records = current_user.practice_records.page(params[:page]).per(10)
  end

  def create
    @practice_record = current_user.practice_records.new(practice_record_params)
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