---
layout: post
title: "Generating Rails in Broad Strokes"
date: 2014-03-13 07:51:07 -0400
comments: true
categories: Ruby Rails
---

In the last couple days we've moved from Sinatra to Rails as our Ruby framework. There are actually <a href="https://en.wikipedia.org/wiki/Comparison_of_web_application_frameworks#Ruby">several Ruby frameworks</a>, but we've focused on Sinatra (as our small introductory framework) and now Rails.

According to <a href="http://guides.rubyonrails.org/getting_started.html#what-is-rails-questionmark">the intro to the Ruby on Rails Guides</a>:
<quote>Rails is a web application development framework written in the Ruby language. It is designed to make programming web applications easier by making assumptions about what every developer needs to get started. It allows you to write less code while accomplishing more than many other languages and frameworks. Experienced Rails developers also report that it makes web application development more fun.</quote>

"Easier", "assumptions", "less code", "more fun". How does Rails accomplish this? It mostly comes down to valuing convention over congifuration, equipping the programmer with a conventional setup rather than requiring him to configure it every time. One way Rails enables this is through generators.

<h2><code>rails generate</code></h2>
{% img /images/rails_generator.png %}

Using <code>rails generate</code> (or the aliased <code>rails g</code> command) gives developers access to a number of generators, which <a href="http://guides.rubyonrails.org/command_line.html#rails-generate">"will save you a large amount of time by writing boilerplate code, code that is necessary for the app to work."</a> The list of Rails generators are depicted below (and can be accessed by simply running <code>rails g</code>), specifically in the "Rails" section of the options.

{% img right /images/migration.png 313 52 %}
My main focus (for now) is on the following five generators, since they're the ones I've already used in building basic MVC apps: controller, migration, model, resource, and scaffold. {% img right /images/scaffold.png  313 291%}I want to sort out exactly what happens when each generator command is run. Quite simply, there's a big diference between running <code>rails g migration [migration name]</code> and <code>rails g scaffold [resource name]</code>, as you can tell by the images to the right. There's obviously a big difference there, between the broad strokes of <code>rails g scaffold</code> and the surgical addition of a single migration file with <code>rails g migration</code>. That difference boils down to a high-level generator vs. a low-level one.
<br>

<h2>Why does this matter though?</h2>
As Avi told us, "we always want to generate the least amount of code possible." He encouraged us to "use the lowest level generator you can to get all your functionality" because, the programmer should dictate the direction of the application, not be driven by the Rails framework.

<table width="400">
  <tr>
    <td><strong><code>rails g</code>  command</strong></td>
    <td><strong>Number of files created</strong></td>
  </tr>
  <tr>
    <td>Migration</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Model</td>
    <td>4</td>
  </tr>
  <tr>
    <td>Controller</td>
    <td>7</td>
  </tr>
  <tr>
    <td>Resource</td>
    <td>12</td>
  </tr>
  <tr>
    <td>Scaffold</td>
    <td>19</td>
  </tr>
</table>
<br>
It's easy enough to play with the different Rails generators to see what they do, but--in the interest of minimizing the number of files and lines of code we create--this table lays out some really basic data.


<h2>A couple final comments</h2>
Each generator basically stubs out a given thing. For example, <code>rails g controller</code> stubs out a new controller and its view. Some of the other generators:
<ul>
  <li><code>assets</code> stubs out placeholders for new assets (like JavaScript and CSS) in the app/assets directory.</li>
  <li><code>generator</code> stubs out a new generator, which can <a href="http://guides.rubyonrails.org/generators.html">speed up workflow</a> by creating, for example, an initializer generator.</li>
  <li><code>scaffold</code> scaffolds an entire resource, from model and migration to controller and views, along with a full test suite.</li>
  <li><code>task</code> stubs out a new Rake task.</li>
</ul>

All that aside, it's always really easy to figure it out--<code>rails g [generator]</code> will list the usage, options, description, and example of a given generator.
  