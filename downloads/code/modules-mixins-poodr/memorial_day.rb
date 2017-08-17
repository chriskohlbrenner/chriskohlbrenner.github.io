class MemorialDay
    include May
    include Holiday
    
    def name
        "Memorial Day"
    end

    # Memorial Day always occurs on the last Monday in May
    def day_of
      mondays.last
    end

    def date
        Date.parse("#{month_of_year}/#{day_of}")
    end
end