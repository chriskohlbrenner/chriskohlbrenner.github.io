# load Bunny if you have installed it with RubyGems
require "bunny"

# connect to RabbitMQ running on localhost, with the default port (5672), username ("guest"), password ("guest")
# and virtual host ("/")
conn = Bunny.new
conn.start

# open a new channel
channel = conn.create_channel

# declare a queue on the channel that we have just opened (':auto_delete => true' means that the queue will be 
# deleted when there are no more processes consuming messages from it)
queue  = channel.queue("queue_name", :auto_delete => true)

# instantiate an exchange
exchange  = channel.default_exchange

# define a handler for incoming messages
queue.subscribe do |delivery_info, metadata, payload|
  puts "Received message: #{payload}"
end

# publish our message
exchange.publish("Hello world!", :routing_key => queue.name)

# close connection
conn.close