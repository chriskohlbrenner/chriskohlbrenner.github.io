---
layout: page
title: "portfolio"
date: 2014-05-28 15:00
comments: true
sharing: true
footer: true
---
<p>Below are a few of the apps I've built:</p>
<ul>
  <li><a href="http://world-cup-14.herokuapp.com/">WorldCupApp</a> (June 2014) - 2014 World Cup tracker (<a href="https://github.com/chriskohlbrenner/world-cup-2014">code on Github</a>).
    <ul>
      <li>Rails app with multiple models and associations</li>
      <li>Real-time updates using Rake tasks and Heroku scheduler</li>
      <li>Built using the <a href="http://www.kimonolabs.com/worldcup/explorer">"(un)official World Cup API"</a></li>
    </ul>
  </li>
  <br>

  <li><a href="http://node-express-chat.herokuapp.com/">ExpressChat</a> (May 2014) - simple real-time chat application (<a href="https://github.com/chriskohlbrenner/express-chat">code</a>).
    <ul>
      <li>Node.js with Express as the server side framework</li>
      <li>AngularJS for client side rendering</li>
      <li>SockJS for WebSocket emulation</li>
    </ul>
  </li>
  <br>

  <li><a href="http://www.tendermessenger.com/">Tender</a> (April 2014) - Venmo for Bitcoin (<a href="https://github.com/chriskohlbrenner/BitcoinMessenger">code</a>).
    <ul>
      <li>Enable users to send or receive any amount of Bitcoin</li>
      <li>Implement inbox/outbox system for messages to accompany payments and requests</li>
      <li>Built with Ruby on Rails, Omniauth, Javascript, AJAX, Postgres, Heroku, Rspec, Capybara and the Coinbase API</li>
    </ul>
  </li>
  <br>

  <li><a href="http://language-80-20.herokuapp.com">Language 80/20</a> (April 2014) - Rails app that applies the 80-20 rule to language learning (<a href="https://github.com/chriskohlbrenner/language8020">code</a>).
    <ul>
      <li>Populated database of languages and words from frequency lists based on data from OpenSubtitles.org</li>
      <li>Gathered translations from Google Translate using Net::HTTP and JSON parsing in Ruby</li>
      <li>Displayed translations dynamically with jQuery</li>
      <li>Implemented Javascript game to test user’s knowledge of a given language</li>
      <li>Implemented Wrap Bootstrap theme for front-end display</li>
    </ul>
  </li>
  <br>
  <li><a href="http://107.170.26.201">Weather app</a> (March 2014) - Sinatra app to display current temperature (<a href="https://github.com/chriskohlbrenner/temperatures-sinatra">code</a>).
    <ul>
      <li>Scraped data from Weather.com using Nokogiri</li>
      <li>Determined current location based on user’s IP address  with Geocoder gem</li>
      <li>Hosted on Digital Ocean web server</li>
    </ul>
  </li>
  <br>
</ul>