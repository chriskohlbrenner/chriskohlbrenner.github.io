---
layout: post
title: "on blog scheduling"
date: 2014-02-28 08:01:48 -0500
comments: true
categories: Ruby Flatiron
---
<h4>Or, evidence that I've learned something in four weeks at Flatiron School.</h4>

{% img right http://chriskohlbrenner.github.io/images/piazza_blog_schedule.png 400 476 %}

Each student at Flatiron School is expected to write a blog post about every two weeks, but when exactly are blog posts due?  I confirm my dates by referring to a schedule on our Piazza course page (a screenshot appears to the right).

But how was this schedule generated? Of course it could have been done manually, copying and pasting four names at a time into each date (manually cutting out) weekends. But programmers are better than that. Avi certainly didn't manually construct this schedule. He must have automated the process by writing a program. This post chronicles my effort to do the same.

<h2>Some context</h2>

At the end of today, we'll have completed four of twelve weeks at Flatiron School, a full one-third. Those four weeks have covered the following:
<div><ul>
  <strong><li>Git</li></strong>
  <strong><li>Ruby fundamentals</li></strong>
  <strong><li>Web scraping (Nokogiri)</li></strong>
  <strong><li>ERB</li></strong>
  <li>ORMs, databases, etc.</li>
  <li>Servers, Rack, Sinatra, etc</li>
  <strong><li>Model-View-Controller (MVC) pattern</li></strong>
  <li>Test-driven development</li>
</ul></div>

The bolded items? Those are the ones I used in this exercise so as to intentionally practice.

<h2>My blog scheduler</h2>
You can see the <a href="https://github.com/chriskohlbrenner/flatiron_blog_scheduler">full code on Github</a>. My blog scheduler program does three main things (and two other kind of important things):
<h6>Three main things</h6>
<div><ol>
  <li>The Author class gets an array of all blog "authors" by scraping each student name from <a href="http://students.flatironschool.com">the Flatiron students site</a>.</li>
  {% include_code author.rb %}
  <li>The BlogDate creates an array of all blog dates, specifically all weekdays occuring during the semester (beginning one week into the semester).</li>
  {% include_code blog_date.rb %}
  <li>The GenerateAssignments class integrates the two arrays (authors and blog dates) and generates an html document displaying the schedule in a similar format to the one on Piazza.</li>
  {% include_code generator.rb %}
</ol>
<h6>Two other things</h6>
<ul>
  <li>In order to do number 3 (above), I need an erb template.</li>
  {% include_code index.html.erb %}
  <li>A runner to make it go. This way I can simply type 'bin/runner' into my command line, and it generates the index.</li>
  {% include_code runner %}
</ul></div>

It works! Left: original blog schedule on Piazza. Right: my blog schedule.

{% img http://chriskohlbrenner.github.io/images/combine_images.png %}


<h2>Why do all this?</h2>
This was a pretty simple but worthwhile exercise. Actually, "simple" is an overstatement--I ran into quite a few snags along the way, and that's reason enough to do it. To practice, and thus learn how to navigate those issues more easily.

But beyond just practicing, I did it for the following reasons:
<div><ol>
  <li><strong>Looking back</strong>: I wanted to look back at what I've accomplished. Every day at Flatiron School there are moments that are stressful, overwhelming, and/or confusing, when it seems as if we'll never understand /<insert lesson of the day here/>. Of course those moments come and go, but the cycle runs all over again, without any opportunity to reflect on the progress we've made. As <a href="https://medium.com/p/b7261799cd87">Justin noted the other day</a>, like skier making their way down a difficult slope, we need to stop along the way, look up, and realize how far we've come.</li>
  <li><strong>Ensuring that I understand</strong>: I could look back at what I've done by running through old labs and homework exercises. But that wouldn't accomplish what I wanted; it wouldn't prove that I can do it myself. Almost everything we work on at Flatiron School is structured and standardized to some degree (it is a "school,"" after all). That means that my work is generally guided, whether by the other students I'm collaborating with, the test files in each given project, the pull requests up on Github, the project's Readme, etc. I've learned a ton this way, but it's left a doubt: can I do it myself? Isolated from those crutches, can I solve a problem--however basic--using the tools I've learned?</li>
  <li><strong>Finish what I start</strong>: Expanding on number 2, I want to make sure I can put it all together. Sure, I can remember a basic Ruby method or a given concept like ERB. I can write methods and classes and modules and templates. But I want to make sure I can put it all together, actually run it, and see my program spit out a solution to a problem.
  </li>
</ol></div>
