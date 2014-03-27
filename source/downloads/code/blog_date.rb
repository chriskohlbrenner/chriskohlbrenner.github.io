class BlogDate

  #create array of all dates for blog posts (each weekday in a given range)
  def find_weekdays
    weekdays = [1,2,3,4,5]
    dates = (get_beginning..get_end).to_a.select {|k| weekdays.include?(k.wday)}
    return dates
  end

  #establish beginning of range of dates
  def get_beginning
    start_date = Date.new(2014, 02, 11)
    start_date
  end

  #establish end of range of dates
  def get_end
    end_date = Date.new(2014, 04, 26)
    end_date
  end  

end