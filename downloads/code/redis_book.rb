require 'redis'
require 'singleton'

BOOK_STRING_ATTRS = %w(title isbn description price pages)

class RedisClient < Redis  
  include Singleton
  def initialize
    super
  end
end

class Book
  attr_reader :id
  attr_accessor :title, :isbn, :description, :price, :pages, :authors, :topics

  def initialize(options = {})
    @hub = RedisClient.instance
    # ...
  end

  def self.get(id)
    hub = RedisClient.instance

    if hub.get("book:#{id}:title")
      book = Book.new(:id => id)
    else
      return nil
    end
    
    book
  end

  def self.get_all
    # ...
  end

  def save
    @hub.lpush('topic:list', @id)
    @hub.set("topic:#{@id}:name", @name)
    @hub.set("topic:#{@id}:description", @description)
    @books.each do |book|
      @hub.sadd("topic:#{id}:books", book)
    end
  end

  def self.remove(id)
    # ...
  end

  def self.get_books_range(start, stop)
    # ...
  end
end