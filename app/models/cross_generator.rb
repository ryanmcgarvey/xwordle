class CrossGenerator
  def generate_game
    top_word = list.sample
  end

  def list
    @_list ||= File.read(File.join(Rails.root,
                                   'answers.txt')).split + File.read(File.join(Rails.root, 'allowed.txt')).split
  end
end
