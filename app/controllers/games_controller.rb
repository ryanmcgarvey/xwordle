class GamesController < ApplicationController
  def verify
    word = params[:query]
    match = words.include?(word)
    respond_to do |format|
      format.json { render json: { wordMatch: match } }
    end
  end

  def single
    @word = words.sample
  end

  def cross
    @words = %w[SCENT CANOE ARSON ROUSE FLEET].map(&:downcase)
  end
  
  def full
    @words = %w[SCENT CANOE ARSON ROUSE FLEET].map(&:downcase)
  end


  private

  def words
    File.read(File.join(Rails.root, 'answers.txt')).split + File.read(File.join(Rails.root, 'allowed.txt')).split
  end
end
