---
layout: post
title: "I'm a Rails Contributor!"
date: 2014-03-19 17:03:24 -0400
comments: true
categories: Ruby Rails Github
---

I can now count myself among the 2,000 or so contributors to Ruby on Rails. Pretty elite company--but I got in on a technicality.

{% img left /images/rails_contribution.png %}

When I say I got in on a technicality, I mean that quite literally. The technicality was a typo in a Rails guide. A missing "s", to be exact.

Visit section 12.2 of the <a href="http://guides.rubyonrails.org/active_record_querying.html#joining-tables">ActiveRecord Querying guide</a> and you'll see a line that says "Active Record lets you use the names of the associations defined onthe model as a shortcut for specifying JOIN <strong>clause</strong> when using the joins method." Emphasis is mine, because that word "clause" is the typo. I added an "s", which should be reflected shortly.

{% img right /images/merged_rails_pull_request.png %}

Of course that's a trivial change to the code base that is <a href="http://github.com/rails/rails">github.com/rails/rails</a>. And yet, because it's such a significant open-source project, Rails has a whole <a href="http://guides.rubyonrails.org/contributing_to_ruby_on_rails.html">guide devoted to contributing</a>.

There are a few formalities (a significant one: it's a good idea to inlude "[ci skip]" in the commit message, so that Rails skips the build for that commit), but the whole process can be completed very quickly. In fact, my pull request was accepted and closed just minutes after submitting, so it only took me 20-30 minutes from start to finish.

<h4>Postscript</h4>
Apparently Rails is listed on <a href="http://tip4commit.com/">Tip4Commit</a>, which enables donors to sponsor open-source projects, thus granting a tip for merged commits. I didn't know any of that. But it means I was tipped 0.00015659 Ƀ, the first bitcoins (or fractions thereof) I've ever owned--even if it's only $0.10.
