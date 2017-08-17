class Answer
  attr_accessor :choices
  attr_accessor :special_answer

  include ActiveModel::Dirty

  include Mongoid::Document
  embeds_many :special_answers

  before_save :add_special_answer_to_choices, if: special_answer_changed?

  def add_special_answer_to_choices
    choices << special_answer
  end

  # ...

end