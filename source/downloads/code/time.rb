# Given an origin and destination, I want to get all departure times from origin
def self.all_departures(origin, destination)
  destination.upcase!
  where("stop_id = ?", Stop.find_old_stop_id_by_name(origin)).joins(:trip).where('trip_destination = ?', destination).order(:departure_time)
end

def self.next_departure_from_to(origin, destination)
  current_time = (Time.now.change(year: 2000, month: 01, day: 01) - 18000)
  self.all_departures(origin, destination).where("departure_time > ?", current_time).pluck(:departure_time_string).first

  # want to find departure time from stop_times where departure time is between now and 2 hours from now
      # self.all_departures(origin).where(departure_time: current_hour..(current_hour + 2)).pluck(:departure_time)

  
  # helpful answer: https://stackoverflow.com/questions/11973225/rails-how-to-store-time-of-day-for-schedule/15350965#15350965
      # "open_at > ? and close_at < ?", Time.now.seconds_since_midnight, Time.now.seconds_since_midnight

  # newtime = Time.new.midnight
  # oldtime = Time.new(2000,01,01,0,0,0,"-04:00")
  # time_to_add = (newtime - oldtime).to_i
end