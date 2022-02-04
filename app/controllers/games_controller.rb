class GamesController < ApplicationController
  def index
    @count = session[:count].to_i
  end

  def new
    @word = words.sample
  end

  private 

  def words
    File.read(File.join(Rails.root, 'answers.txt')).split + File.read(File.join(Rails.root, 'allowed.txt')).split
  end

end
