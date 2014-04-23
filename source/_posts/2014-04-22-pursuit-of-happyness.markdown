---
layout: post
title: "Pursuit of (Programming) Happiness"
date: 2014-04-22 15:29:33 -0400
comments: true
categories: RSpec Tests Testing Rails Simplecov
---

I recently remarked that I'm beginning to enjoy writing tests, but--in the same breath--acknowledged that "enjoy" is not quite accurate. It's more like I've moved from avoidance of testing to a neutrality about it, a mindset that sees its value and knows it's attainable. That transition is an ongoing pursuit: of testing, of test-driven development, and of "enjoyment" of those things. An ongoing pursuit of happiness.

There's a ton of variety to testing. There are different frameworks (an old but helpful <a href="http://www.ultrasaurus.com/2009/08/ruby-unit-test-frameworks/">breakdown of a few frameworks here</a> and <a href="http://en.wikipedia.org/wiki/Unit_testing_frameworks_for_Ruby#Unit-testing_frameworks">Wikipedia's overview here</a>):
<ul>
  <li><a href="https://github.com/rspec/rspec">Rspec</a>,</li>
  <li><a href="http://ruby-doc.org/stdlib-1.9.3/libdoc/minitest/spec/rdoc/MiniTest/Spec.html,">Minitest</a> </li>
  <li><a href="http://www.ruby-doc.org/stdlib-2.1.1/libdoc/test/unit/rdoc/Test/Unit.html">Test::Unit</a>,</li>
  <li><a href="https://github.com/thoughtbot/shoulda">Shoulda</a>,</li>
</ul>
There are different types of tests:
<ul>
  <li>Unit and integration tests</li>
  <li>Model, view, and controller specs</li>
  <li>Feature and request specs</li>
</ul>
There are even differences of opinions about best practices (though, for RSpec, <a href="http://betterspecs.org/">here are some practices</a> that seem to be considered "better"). Acknowledging all of that diversity in test-driven development, my experience has been primarily contrained to RSpec, so this blog post will be too.

<!--more-->

<h2>An example: testing Tender</h2>
{% img right /images/typeahead.png 400 %}
One application I've built recently is Tender (<a href="http://github.com/AlexPatriquin/BitcoinMessenger">code on Github</a> and <a href="http://tendermessenger.com">live deployed app</a>). The key components to Tender boil down to the interface you see at right: (1) a User model and (2) the functionality of sending messages and bitcoin.

For that reason I decided on two key test areas:
<ol>
  <li>A <a href="https://github.com/AlexPatriquin/BitcoinMessenger/blob/master/spec/models/user_spec.rb">User model spec</a>.</li>
  <li>A <a href="https://github.com/AlexPatriquin/BitcoinMessenger/blob/master/spec/features/form_feature_spec.rb">feature spec</a> ensuring the form functioned as intended.</li>
</ol>
Feature specs became my best friend. The most difficult part was <a href="https://github.com/AlexPatriquin/BitcoinMessenger/blob/master/spec/support/omniauth_macros.rb">mocking the omniauth login</a> (so I'd have a valid test user who could "send" bitcoin). With this covered, I was able to run the code below.
{% include_code form_spec.rb %}
And voilà, Capybara tests the feature perfectly. This was, of course, very easy to replicate to test form validations, requests, Bitcoin requests (instead of payments), etc.

<h2>The why</h2>
Is this whole blog post about a shiny green badge on the Readme? Yes, in part. It looks so nice!

{% img center /images/tender-readme.png %}

Jokes aside, it's validating to have a <a href="https://coveralls.io/r/AlexPatriquin/BitcoinMessenger?branch=master">seemingly comprehensive test suite</a>. But it's only validating because there's value in an <strong>actually</strong> comprehensive test suite.

Testing is ultimately about <strong>making our jobs easier</strong>. As <a href="http://guides.rubyonrails.org/v3.2.13/testing.html#why-write-tests-for-your-rails-applications">the RailsGuide on testing</a> says:
{% blockquote RailsGuides http://guides.rubyonrails.org/v3.2.13/testing.html#why-write-tests-for-your-rails-applications A Guide to Testing Rails Applications %}
<ul>
  <li>By simply running your Rails tests you can ensure your code adheres to the desired functionality even after some major code refactoring.</li>
  <li>Rails tests can also simulate browser requests and thus you can test your application’s response without having to test it through your browser.</li>
</ul>
{% endblockquote %}
Doesn't that sound great? Ensuring adherence to the desired functionality even after refactoring. Knowing how your application will respond without opening your browser. Of course there are other ways of testing your app--you can open the browser and try it out. But how much more reliable, fast, and easy is it to have a test suite that you can run and trust?

This became evident over the course of building Tender. We'd have the functionality we wanted, then add a feature, which would break a different (previously working) feature, but we wouldn't know that until hours or days later. Testing makes that feedback immediate, and ensures that your code is always working (or at least points out where it's not working).

<h2>Better Specs</h2>
This was all great--I'm now more comfortable writing tests, and I see their value more clearly (ensuring my app is running is as simple as running <code>rspec</code> or looking at my <a href="https://travis-ci.org/AlexPatriquin/BitcoinMessenger">Travis build</a>). That said, I'm certainly still learning. A helpful lesson came from John Kelly Ferguson, Flatiron alum and web developer extraordinaire who reviewed Tender's code. His feedback is laid out nicely in <a href="https://github.com/AlexPatriquin/BitcoinMessenger/pull/4">this pull request</a>.

What it boils down to is what <a href="http://betterspecs.org/">Better Specs</a> says on its homepage:
{% blockquote BetterSpecs http://betterspecs.org/ { rspec guidelines with ruby } %}
On the web there are many resources that give complete overview of _what_ you can do with RSpec. But there are fewer resources devoted to how to create a great RSpec test suite.

Better Specs tries to fill this gap by collecting most of the "best practices" that other developers learn through years of experience.
{% endblockquote %}

My learning has gotten me to an initial implementation of an RSpec test suite--I now look to Better Specs for some better (or even best) practices. That said, getting this far was an accomplishment in itself. Now to continue that pursuit of happiness.

<h4>Bonus: straight from the creator of Ruby on Rails</h4>
DHH just happened to post <a href="http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html">this essay</a> the day after I wrote this blog. A helpful reminder to focus on what's helpful--what makes programming easier--and not on dogmas of TDD or test-first.