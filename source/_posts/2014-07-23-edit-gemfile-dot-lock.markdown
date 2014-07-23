---
layout: post
title: "Should you ever edit your Gemfile.lock? (No...But Maybe Sometimes...Conservatively)"
date: 2014-07-23 10:19:30 -0400
comments: true
categories: [Ruby, Rails, Gems, Gemfile, Bundler, Dependencies]
---
When developing a Rails app, should you ever edit your Gemfile.lock? Easy answer: it's no, right? <a href="http://stackoverflow.com/a/11136025/3166243">Plenty</a> <a href="http://codedecoder.wordpress.com/2013/01/02/difference-gemfile-lock-rails/">of</a> <a href="http://asciicasts.com/episodes/201-bundler">reputable</a> <a href="http://codelikethis.com/lessons/ruby_tools/bundler">sources</a> all seem to discourage it. I myself gave that answer when asked recently. But I've come to learn that the answer is not a complete cut-and-dried "no", at least not in certain circumstances.

<!--more-->

<h3>Some background</h3>
How does the Gemfile work? A quick refresher:
<ul>
  <li>
    The Gemfile is a list of all gems that you want to include in the project. It is used with bundler to install, update, remove and otherwise manage your used gems.
  </li>
  <li>
    <a href="http://bundler.io/">Bundler</a> "provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed. Bundler is an exit from dependency hell, and ensures that the gems you need are present in development, staging, and production. Starting work on a project is as simple as bundle install."
  </li>
  <li>
    Simply put, we list our gems and dependencies in the Gemfile, run <code>bundle install</code>, a Gemfile.lock is generated, and our dependencies are taken care of. Right?
  </li>
</ul>

<h3>What happens when we <code>bundle install</code>?</h3>
Quoting the bundler documentation:
{% blockquote Bundler.io http://bundler.io/v1.6/man/bundle-install.1.html bundle-install %}
Install the gems specified in your Gemfile. If this is the first time you run bundle install (and a Gemfile.lock does not exist), bundler will fetch all remote sources, resolve dependencies and install all needed gems.

If a Gemfile.lock does exist, and you have not updated your Gemfile, bundler will fetch all remote sources, but use the dependencies specified in the Gemfile.lock instead of resolving dependencies.

If a Gemfile.lock does exist, and you have updated your Gemfile, bundler will use the dependencies in the Gemfile.lock for all gems that you did not update, but will re-resolve the dependencies of gems that you did update.
{% endblockquote %}

No surprises here. This fits with the general understanding of Bundler and Gemfiles. But keep this in mind as you continue below, since the resolving of dependencies may mean more than you realize.

<h3>Introducing some controversy: conservative gem updates</h3>
Imagine this situation: 
You run <code>bundle update cucumber-rails</code>, thinking it will only update <code>cucumber-rails</code>. In fact, this actually updates not just <code>cucumber-rails</code>, but all of its dependencies as well, which will explode in your face when one of these dependencies release a new version with breaking API changes. This happens all too often.

Lest you think I'm all alone in this, know that I'm pulling the above example from <a href="http://makandracards.com/makandra/13885-how-to-update-a-single-gem-conservatively">this post from Makandra Cards</a>, and the idea in general from more experienced developers than myself. The author of the post suggests three options for conservative gem updates, the first of which is to make changes directly to Gemfile.lock.

Crazy, right? Controversial, even? Perhaps not. To date, Bundler has not acknowledged <a href="https://github.com/bundler/bundler/issues/2016">this issue</a>, but there's a significant use case (edge case, perhaps) that calls for editing Gemfile.lock. Just do it conservatively. Everything in moderation.