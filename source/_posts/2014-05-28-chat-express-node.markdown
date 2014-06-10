---
layout: post
title: "JavaScript frameworks: On Node.js, Express, AngularJS, and SockJS"
date: 2014-05-28 12:55:45 -0400
comments: true
categories: [JavaScript, Angular, Node.js, Node, SockJS, WebSockets, Front End Frameworks]
---
Having confidence in one web development framework, Ruby on Rails, I've recently set out to better understand some other established frameworks, particularly JavaScript frameworks. It was difficult to know where to focus my efforts[^1], and I eventually decided to learn by doing. I ended up with <a href="http://node-express-chat.herokuapp.com/">ExpressChat</a>, a simple real-time chat application built using Node.js, Express, AngularJS, and SockJS.

{% img center /images/node-chat-express/chat-express-screenshot.png %}

<!--more-->

<h3>The Technologies</h3>
<h4>Node.js</h4>
<u>From the documentation</u>: "<a href="http://nodejs.org/">Node.js</a> a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."

<u>Translated</u>: Two key features:[^2]

* "Event-driven": in contrast to a 'thread-based' model, the web server accepts the request, spins it off to be handled, and then goes on to service the next web request. This is faster than the traditional thread-based model of web apps, which holds a connection open until it has performed the request and/or whatever other transaction was sent.
* "Non-blocking": see "event-driven. Because the web server is always accepting requests instead of waiting for read or write operations, it is a non-blocking I/O (input/output). That's faster.[^3]

<h4>Express</h4>
<u>From the documentation</u>: "<a href="http://expressjs.com/">Express</a> is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications."

<u>Translated</u>: Express is a Sinatra-inspired (a comparison to a Ruby framework helps make sense of it) web development framework for node.js. It makes building web apps with Node faster and easier.

<h4>AngularJS</h4>
<u>From the documentation</u>: "<a href="http://angularjs.org/">AngularJS</a> is a structural framework for dynamic web apps. It lets you use HTML as your template language and lets you extend HTML's syntax to express your application's components clearly and succinctly. Angular's data binding and dependency injection eliminate much of the code you currently have to write. And it all happens within the browser, making it an ideal partner with any server technology."

<u>Translated</u>: Extend HTML's syntax (Angular is a front end framework) with data binding (it easily and quickly connects the front end interface to the back end database and logic)[^4] and dependency injection (it makes it easy to pass dependency components to other components).

<h4>SockJS</h4>
<u>From the documentation</u>: "<a href="http://sockjs.org">SockJS</a> is a browser JavaScript library that provides a WebSocket-like object. SockJS gives you a coherent, cross-browser, Javascript API which creates a low latency, full duplex, cross-domain communication channel between the browser and the web server."

[WebSockets: "WebSockets represent a standard for bi-directional realtime communication between servers and clients"[^5]]

<u>Translated</u>: WebSockets mean servers/clients can communicate really quickly. As in, in real time. SockJS enables WebSockets or, if that fails, uses other protocols and abstractions to simulate WebSockets. It is one of many WebSocket implementations.[^6]

<h3>ExpressChat</h3>
Inspired by others who have built simple proof-of-concept apps with the above technologies,[^7] I set out to do the same.

It's easy enough to get started. Once you have <a href="http://nodejs.org/download/">Node downloaded</a>, you can install a lot modules with the <code>npm</code> command. <code>npm install -g express-generator</code>, for example, installs the Express generator, after which <code>express app-name</code> will generate an Express app. A key file that will be generated is <code>package.json</code>. Mine looks like this:

{% include_code node-express-chat/package.json %}
Straightforward enough. It describes some attributes of the application, as well as its dependencies. I added SockJS as a dependency; EJS is embedded JavaScript, the templating language I used. After adding dependencies, <code>npm install</code> is all that's needed to install those dependencies (basically Ruby's Bundler for Node).

Beyond that, most of the code is in app.js. There's a lot more going on to connect SockJS and the front end rendering with Angular (full code on <a href="http://github.com/chriskohlbrenner/express-chat">Github</a>), but getting a basic app up and running is very simple. In fact, the 9 lines of code below (which can be refactored to as little as 4 or less)[^8] are all you need for a Node app (this example does not use Express).

{% include_code node-express-chat/node_app.js %}

This only scratches the surface of how Node works, and I hardly touched on how the other technologies showed up in my code, but it's proof of how powerful Node and Angular can be. I'm looking forward to putting more time into these and other JavaScript frameworks.

[^1]: A couple resources I found helpful as I read up on JavaScript frameworks: <a href="http://blog.stevensanderson.com/2012/08/01/rich-javascript-applications-the-seven-frameworks-throne-of-js-2012/">"Rich JavaScript Applications – the Seven Frameworks" and <a href="http://readwrite.com/2014/02/06/angular-backbone-ember-best-javascript-framework-for-you#awesm=~oFANeijJRQC7c3">Angular, Ember, And Backbone: Which JavaScript Framework Is Right For You?</a>. Beyond that, I've found that reading (at least skimming) each framework's documentation has been helpful.
[^2]:<a href="http://toptal.com/nodejs/why-the-hell-would-i-use-node-js">This post</a> was also helpful in explaining "why the hell" you might use Node.
[^3]: <a href="http://code.danyork.com/2011/01/25/node-js-doctors-offices-and-fast-food-restaurants-understanding-event-driven-programming/">Helpful analogies</a> about event-driven programming.
[^4]: AngularJS explains one-way and two-way data binding <a href="https://docs.angularjs.org/guide/databinding">here</a>.
[^5]: <a href="http://pusher.com/websockets">WebSockets explained</a>.
[^6]: <a href="http://medium.com/node-js-javascript/b63bfca0539">Here are a few others</a>.
[^7]: A couple good ones: <a href="http://codesquire.com/post/NodeSockAngularChat">Chat Application with Express, SockJS and Angular</a>, <a href="http://gilesthomas.com/2013/02/a-super-simple-chat-app-with-angularjs-sockjs-and-node-js/">A super-simple chat app with AngularJS, SockJS and node.js</a>.
[^8]: As introduced <a href="http://nodetuts.com/01-node_intro.html">here</a>.