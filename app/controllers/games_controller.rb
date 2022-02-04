class GamesController < ApplicationController
  def index
    @count = session[:count].to_i
  end

  def new
    @word = File.read(File.join(Rails.root, 'answers.txt')).split.sample
  end
end
