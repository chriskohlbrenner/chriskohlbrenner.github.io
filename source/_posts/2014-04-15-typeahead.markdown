---
layout: post
title: "Typeahead and Gon: a How-To Guide (Part 1 of 2)"
date: 2014-04-15 17:15:42 -0400
comments: true
categories: Rails JavaScript Gems Gon Typeahead Front-End CT
---
I'm currently working on <a href="http://www.tendermessenger.com/">a project</a> with users and messages (<a href="https://github.com/AlexPatriquin/BitcoinMessenger">full Github repo here</a>). The main functionality is complete--the first 80%, if you will--but there's plenty more to do--Avi has emphasized that the finishing touches, the final 20%, can drag on for much longer than anticipated. One aspect of that final 20% was a key front end feature: typeahead.

If you think you don't know what typeahead is, you're mistaken. You do know what typeahead is, you just might now it as autocomplete. I choose to refer to it specifically as typeahead, because I used <a href="http://twitter.github.io/typeahead.js/">Twitter's typeahead.js</a> (Twitter's engineers wrote <a href="https://blog.twitter.com/2013/twitter-typeaheadjs-you-autocomplete-me">a handy blog post about it</a>).

Typeahead.js is "a flexible JavaScript library that provides a strong foundation for building robust typeaheads," which means it supplements jQuery with the <code>.typeahead()</code> method. This method, when passed a dataset, can compute suggestions for a given suggestion. At the end of the day, it makes form inputs dynamic and prettier.

<!--more-->

<h2>The How-To</h2>
I implemented this into my Rails app and--surprise!--there's <a href="https://github.com/yourabi/twitter-typeahead-rails/">a Ruby Gem</a> that packages typeahead.js specifically for the Rails asset pipeline. This guide will cover that twitter-typeahead-rails gem and a couple other requisite pieces (the <a href="https://github.com/gazay/gon">Gon gem</a>, javascript assets, html in the views, etc.).

This process really breaks down to two main steps: (1) making a dataset accessible to the view by getting Rails variables into Javascript (Gon does that) and (2) using that dataset with the <code>.typeahead</code> JavaScript method.
<h3>1. The Gon gem</h3>
<ul>
  <li>
    Watch <a href="http://railscasts.com/episodes/324-passing-data-to-javascript">this RailsCast</a>. Seriously, Ryan Bates covers Gon very well and in just over six minutes. Then again, you could try to save those six minutes by skipping ahead to the next couple steps.
  </li><br>
  <li>
    Add the gem (copy the following to your Gemfile): <code>gem 'gon'</code>.
  </li><br>
  <li>
    Add <code><%= include_gon %></code> to the head of your html, right under the title attribute (probably in the application.html.erb view). Your html should look something like this:
        {% include_code application.html.erb %}
  </li><br>
  <li>
    Add Gon to your controllers. The idea is to assign your Rails variable to a Gon variable (which will become a JavaScript variable). In my case, trying to pass users' names and images, it looked like this:
        {% include_code some_controller.rb %}
    You can assign any array to the Gon variable. Both of my examples return arrays by calling methods (ActiveRecord query for usernames and mapping image links), but you could just as easily do <code>gon.variable = [example1, example2, example3]</code> (though, as we'll see, you could add this data straight into your JavaScript file)
  </li><br>
  <li>
    Assign that Gon variable to a JavaScript variable. In whatever .js file you choose, assign <code>gon.whatever</code> to <code>var whateverVariable</code>. Continuing my example:
        {% include_code random.js %}
        {% img right /images/gon_alert.png 400 %}
    Try adding <code>alert(whateverVariable)</code> (in my example <code>alert(users)</code>). Look at that--your dataset has made it from Rails to JavaScript! (Yes, I have funny test users).
  </li><br>
</ul>

I will post Part 2 of this blog tomorrow, which will cover using this JavaScript variable with the <code>.typeahead()</code> method to create a fancy typeahead like the one with Tenderlove below. I may combine it all into one post. But this seems long enough for now.

<i><strong>Edit:</strong>Here's <a href="/blog/2014/04/16/typeahead-2/">part 2!</a></i>
{% img /images/typeahead.png %}

<h3>Resources</h3>
<ul>
  <li><a href="http://railscasts.com/episodes/324-passing-data-to-javascript">Ryan Bates (RailsCast) on Gon</a></li>
  <li><a href="https://github.com/gazay/gon">Gon source code</a></li>
</ul>