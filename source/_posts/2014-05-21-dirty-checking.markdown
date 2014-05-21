---
layout: post
title: "Dirty Checking of Callbacks in Rails"
date: 2014-05-21 14:30:19 -0400
comments: true
categories: ActiveModel Dirty_Checking Ruby Rails Callbacks CT
---
<strong>Summary</strong>: Dirty checking is a way of tracking changes by checking a variable's value against what that variable's value was. The Ruby on Rails <code>ActiveModel::Dirty</code> module enables dirty checking. This is useful for running ActiveRecord callbacks only when an attribute of an active model has changed.

-------
<br>
I first heard the phrase "dirty checking" only recently, as I began exploring front end frameworks. Dirty checking is inherent to frameworks like Angular JS, in which a listener asynchronously checks its value against its previous value (thus knowing if something has changed and needs to be re-rendered). 

Little did I know that dirty checking is possible (and valuable) in Ruby as well.

<!--more-->

<h3>Background</h3>
(To skip the background context and jump straight to the technical explanation, click <a href="http://localhost:4000/blog/2014/05/21/dirty-checking#code">here</a>).<br>
In a recent pairing session, I was asked to implement a feature for a Q&A polling application. Imagine the application depicted below:

{% img center /images/dirty_checking/q_and_a_img.png %}

Now imagine yourself on the flip side, not as a user answering a poll, but as an admin at the portal implementing a poll, creating new questions, and populating prospective choices. This was the context for my challenge.

The challenge broke down into two parts:
{% img right /images/dirty_checking/rand-spec-answer.png %}
<ol>
  <li>
    <strong>Front end</strong>: Add a couple options, in addition to populating the required choices with text.
    <ul>
      <li>A 'randomize' checkbox, which would mix up the order in which choices displayed.</li>
      <li>A 'special choices' option, which could either be 'Other' or 'None of the Above'.</li>
    </ul>
  </li>
  <li><strong>Back end</strong>: Reflect any changes by persisting to the database.</li>
</ol>

The front end feature was straightforward enough: add a checkbox option for randomization, and a radio button. Something as simple as the above right.

<h3 id="code">Code Example</h3>
Imagine the class below. In creating an answer as an administrator, we create an answer object with multiple choices (take my word for it that there was a lot more going on than this):
{% include_code dirty_checking/answer_choices.rb %}

We need to add an attribute for <code>:special_answer</code>--easy enough. But how do we ensure that our new <code>special_answer</code> becomes an element in the array of our answer object's <code>choices</code>? A simple append method. And how do we ensure things are saved as necessary? A simple callback: <code>before_save :add_special_answer</code>.
{% include_code dirty_checking/answer_choices_2.rb %}

One problem:each time we change the special answer, we'll get an additional answer.
{% img center /images/dirty_checking/answer_irb.png %}

There should only ever be one special answer, so we need the new special answer to replace the previous one rather than continuing to add additional ones. And that's a job that dirty checking can handle.
{% include_code dirty_checking/answer_choices_3.rb %}

The difference here? That simple <code>if: special_answer_changed?</code> following the callback, as well as <code>  include ActiveModel::Dirty</code>. The <a href="http://api.rubyonrails.org/classes/ActiveModel/Dirty.html">ActiveModel::Dirty module</a> gives us a few key methods, most notable <code>changed?</code>. As the code above illustrates, we can make the callback conditional by dirty checking whether the <code>special_answer</code> attribute has changed.

<h3>ActiveModel::Dirty</h3>
You can view the module's documentation in its entirety <a href="http://api.rubyonrails.org/classes/ActiveModel/Dirty.html">here</a>. By its own definition, it "Provides a way to track changes in your object in the same way as Active Record does." This way of tracking changes is helpful to us in this case--performing a callback only if the attribute has changed--and likely has applications in many other situations.

<h5>Resources</h5>
<ul>
  <li><a href="http://api.rubyonrails.org/classes/ActiveModel/Dirty.html">ActiveModel::Dirty documentation</a></li>
  <li><a href="http://craftingruby.com/posts/2014/01/13/callbacks-and-dirty-objects-in-rails.html">This blog post</a> explains dirty checking of Rails callbacks similarly.</li>
</ul>