---
layout: post
title: "Advanced Message Queuing Protocol (AMQP) using RabbitMQ in Ruby"
date: 2014-04-30 17:08:10 -0400
comments: true
categories: Ruby AMQP RabbitMQ Message_Queueing
---
<strong>Summary</strong>: message queueing with RabbitMQ helps software applications connect and scale, by enabling messaging patterns like data delivery, push notifications, publish/subscribe, and text messages. It can be easily implemented in Ruby.

<h1>Background</h1>
If you're already familiar with message queueing, or if you're someone who doesn't like reading the instructions, jump to the <a href="/blog/2014/04/30/amqp-rabbitmq-ruby#code">code section below.</a>

<h3>Definition of terms</h3>
I recently came across some brand new terms. So, to begin, some definitions via Wikipedia (they may still be confusing; I try to clear them up below):<ul>
<li><a href="http://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol"><strong>Advanced Message Queuing Protocol (AMQP)</strong></a>: an open standard application layer protocol for <u>message-oriented middleware</u>. The defining features of AMQP are message orientation, queuing, routing (including point-to-point and publish-and-subscribe), reliability and security.</li>
<li><a href="http://en.wikipedia.org/wiki/Message-oriented_middleware"><strong>Message-oriented middleware</strong></a>: Message-oriented middleware (MOM) is software or hardware infrastructure supporting sending and receiving messages between <u>distributed systems</u>.</li>
<li><a href="http://en.wikipedia.org/wiki/Distributed_computing"><strong>Distributed system</strong></a>: A distributed system is a software system in which components communicate and coordinate their actions by <u>passing messages</u>.</li>
</ul>

The underlined terms demonstrate that you can't understand AMQP without understanding MOM, which depends on an understanding of distributed systems, which takes you back to passing messages. Kinda circular. Perhaps some further reading will help:


{% blockquote Alex Benik http://gigaom.com/2012/06/03/like-modern-web-apps-start-ups-are-distributed-systems/  "Like modern web apps, start-ups are distributed systems"  %}
Modern web-scale applications like Google, Twitter, Netflix, LinkedIn, etc. are implemented as distributed systems as opposed to single monolithic codebases. This means that they are composed of tens or hundreds of services that communicate asynchronously with each other, ultimately delivering a response to the end-user.
{% endblockquote %}

This means that, for most web development purposes, "distributed systems" can be replaced with "web apps" in our definition of message-oriented middleware. Furthermore:

{% blockquote Mike Perham http://www.mikeperham.com/2011/05/04/background-processing-vs-message-queueing/ "Background Processing vs Message Queueing" %}
One common simplification I see engineers make is equating message queueing with background processing. [...] All message processing is done in the background but background processing does not have to be done via message queues.
{% endblockquote %}

This is actually really helpful. Message queing (of which AMQP is one protocol) is a subset of background processes. [<strong>Side note</strong>: This quote comes from the <a href="https://github.com/mperham/sidekiq">creator of Sidekiq</a>, a popular handler of background processes for Ruby. He knows a thing or two about this stuff.] With that in mind, we can understand AMQP as a background process specifically for message queueing.

<h3>Use cases</h3>
So what is AMQP actually used for? RabbitMQ describes that:

{% blockquote RabbitMQ https://www.rabbitmq.com/features.html "RabbitMQ Features" %}
Messaging enables software applications to connect and scale. Applications can connect to each other, as components of a larger application, or to user devices and data. Messaging is asynchronous, decoupling applications by separating sending and receiving data.
{% endblockquote %}

For example, <a href="http://en.wikipedia.org/wiki/MercadoLibre.com">MercadoLibre.com</a>, the biggest e-commerce site in Latin America, uses AMQP to send messages for new listings, seller updates, bids placed, and more:

{% blockquote Stacey Schneider https://blogs.vmware.com/vfabric/2013/01/messaging-architecture-using-rabbitmq-at-the-worlds-8th-largest-retailer.html "Messaging Architecture: Using RabbitMQ at the World’s 8th Largest Retailer" %}
...every time there is a new listing on the platform, a seller updates an item, a bid is placed, or whatever event that could affect the representation of the data, a message is sent through RabbitMQ so each consumer is aware of the news and reacts properly to the event."
{% endblockquote %}


<h1 id="code">Code Examples</h1>
I followed <a href="http://rubybunny.info/articles/getting_started.html">this guide</a>, using the Bunny gem, to get started with RabbitMQ.
<h3>The basics</h3>
Start by installing RabbitMQ with Homebrew:<br>
<code>brew install rabbitmq</code>

Then start the server:<br>
<code>rabbitmq-server</code>

<h3>A simple example</h3>
The code snippet below demonstrates a simple example. One application (in line 25) publishes a message that ends up in a queue (declared in line 14) for the second application (lines 20-22) to listen to.

{% include_code bunny_hello_world.rb %}

The comments in the snippet explain what's happening at each step. We connect to RabbitMQ and open a new channel, then declare a queue and instantiate an exchange, so that when <code>x.publish</code>es that message and routes it to <code>q</code> (the queue), that payload goes through.

{% img right /images/hello_world_bunny.png 300 %}
And the contrived example works, when I run the code:

The image below may help make sense of the routing. Or maybe a more complicated example will.
{% img /images/bunny_hello_world_routing.png %}

<h3>A more complicated example</h3>
{% include_code bunny_weather.rb %}
It again works when I run the code:
{% img center /images/weather_bunny.png %}

Notice that there were as many deliveries as there were subscribers (9), and that the order was determined by the order of published updates.

{% img /images/weathr_example_routing.png %}

<h3>The end</h3>
<a href="http://rubybunny.info/articles/getting_started.html#wrapping_up">From what I'm told</a>, "this is only the tip of the iceberg" and there are many more features including:
<ul>
<li>Reliable delivery of messages</li>
<li>Message confirmations (a way to tell broker that a message was or was not processed successfully)</li>
<li>Message redelivery when consumer applications fail or crash</li>
<li>Load balancing of messages between multiple consumers</li>
<li>Message metadata attributes</li>
<li>High availability features</li>