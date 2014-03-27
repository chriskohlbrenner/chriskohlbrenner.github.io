---
layout: post
title: "Gems and Weather Forecasts"
date: 2014-03-03 08:47:00 -0500
comments: true
categories: Ruby Gems
---
<h2>What's a gem anyway?</h2>

{% img right http://chriskohlbrenner.github.io/images/what_is_a_gem.png 335 400 %}
What is a gem? According to RubyGems.org, "Each gem has a name, version, and platform." That's literally the first sentence of its answer to that question. Clear as mud.

Simply put, a gem is a packaged Ruby application or library. That's all. It's just Ruby code, arranged in a format that's easy to share.

<h5>And RubyGems?</h5>
Gems actually exist apart from RubyGems (i.e., you can have your own internal gems), but RubyGems is the package that became part Ruby's standard library (in version 1.9 of Ruby). With RubyGems, developers can search, install, build, and publicly share gems straight from the command line. When you type <code>gem list</code> (or any other <code>gem</code> command into the command line, you're depending on RubyGems. Typing <code>gem -h</code>, you'll see that "RubyGems is a <i>sophisticated</i> package manager for Ruby," so I suppose we can add pretentious to the list of RubyGems' attributes.

<h2>My own exploration</h2>
In the interest of learning by doing, I made a gem. The process is straightforward; I followed the <a href="http://guides.rubygems.org/make-your-own-gem/">RubyGems guide</a>, which lays out each step quite clearly. It comes down to the following:
<ul>
  <li>Name your gem name, write your code, and put it in a 'lib' directory.</li>
  <li>Create the gemspec (named [gem name].gemspec). The content follows a clear template specifying the gem's name, version, date, etc.</li>
  <li>From the command line, run <code>gem build [gem name].gemspec</code></li>
  <li>Once built, run <code>gem install ./[gemfile name]</code> (the gemfile will end with the ".gem" extension and will be included in the return value of the build command.</li>
  <li>Run <code>curl -u [RubyGems username] https://rubygems.org/api/v1/api_key.yaml</code> to connect to RubyGems.org (it's very easy to create a RubyGems account).</li>
  <li>Run <code>gem push [gemfile name]</code></li>
</ul>

<h2>NY Forecast</h2>
I could've done a simple "Hello World" example like the one in the guide, but I wanted to make something more "useful." I could describe it here, but you should just try it out isnstead: <code>gem install ny_forecast</code>.

I now have an extra layer of illusive legitimacy, with <a href="https://rubygems.org/gems/ny_forecast">my NY Forecast gem on RubyGems.org</a>. It means there's not so much separating <a href="https://rubygems.org/profiles/chriskohlbrenner">me</a> from a programmer like <a href="https://rubygems.org/profiles/webster132">DHH</a>! Except maybe 23 extra gems and 250 more million downloads...
