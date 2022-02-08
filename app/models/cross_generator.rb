class CrossGenerator

  def get_matches(top_word)

  end

  def generate_game
    matches = []
    list.each do |word|
      matches << get_matches(word)
    end
  end

  def list
    @_list ||= File.read(File.join(Rails.root,
                                   'answers.txt')).split + File.read(File.join(Rails.root, 'allowed.txt')).split
  end
end
