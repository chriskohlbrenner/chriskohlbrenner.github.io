# # scrape array of authors for blogs (students from flatiron site)
class Author
  def initialize(url = 'http://students.flatironschool.com/')
    @doc = Nokogiri::HTML(open(url))
  end

  def scrape_authors
    @authors = @doc.css("h3 a").collect{|student| student.text}
    @authors
  end
end