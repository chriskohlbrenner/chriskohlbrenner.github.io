---
layout: post
title: "Two Truths and a [False]: Booleans and Truthiness in Ruby and JavaScript"
date: 2014-04-30 10:34:23 -0400
comments: true
categories: Ruby JavaScript Boolean Truthiness
---
We all know the icebreaker game "Two Truths and a Lie": each individual in a group tells three statements about themselves; the rest of the group tries to distinguish which of the three is a lie. For example:
<ol>
  <li>I speak Arabic, French, German, Spanish, and Hebrew.</li>
  <li>I once broke my collarbone in a game of wiffleball.</li>
  <li>I have been to Staten Island.</li>
</ol>
(The lie is revealed below).

<h3>Context in Programming: Ruby vs. JavaScript</h3>
What's Boolean? <a href="http://en.wikipedia.org/wiki/Boolean_data_type">Per Wikipedia</a>, "the Boolean or logical data type is a data type, having two values (usually denoted true and false), intended to represent the truth values of logic and Boolean algebra. It is named after George Boole, who first defined an algebraic system of logic in the mid 19th century."

<!--more-->

Some context in JavaScript:
{% blockquote "Speaking JavaScript" http://speakingjs.com/es5/ch01.html#basic_prim_vs_obj { "Primitive Values Versus Objects" } %}
JavaScript makes a somewhat arbitrary distinction between values:<ul>
  <li>The primitive values are Booleans, numbers, strings, null, and undefined.</li>
  <li>All other values are objects.</li></ul>
{% endblockquote %}

This distinction between primitives and objects is important, as we'll see in a minute.

<h3>What's False in JavaScript?</h3>
JavaScript interprets the following values as false (i.e., if these values were to follow a conditional (<code>if</code>), the conditional code wouldn't run:
<ul>
  <li>undefined, null</li>
  <li>Boolean: false</li>
  <li>Number: -0, NaN</li>
  <li>String: ''</li>
</ul>
All other values are considered true, particularly <strong>all objects</strong>.

<h3>And Ruby?</h3>
It's even simpler in Ruby. The following are false:
<ul>
  <li>nil</li>
  <li>Boolean: false</li>
</ul>
Everything else is true!

<h3>Is it really that simple?</h3>
Yes and no. In terms of how Ruby and JavaScript evaluate certain values, yes. Where a Boolean is expected, Ruby evaluates nil as false, JavaScript evaluates NaN as false.

That said, what we're doing is evaluating non-Boolean values as Boolean. For that reason, values like 8, "abc", undefined, and nil are "truthy" or "falsey". They're not technically true or false, because only true and false are Booleans.


<h3>Proof that this is accurate</h3>
The best way to become familiar with Boolean values is to try them out in the console. In JavaScript, the <code>Boolean([value])</code> object evaluates the Boolean value (i.e., converts non-Boolean to Boolean). In Ruby, the double bang (<code>!!</code>) converts non-Boolean values to Boolean. See some examples below: first JavaScript, then Ruby.

{% img center /images/js-boolean.png %}
{% img center /images/ruby-boolean.png %}
(note, that warning--"string literal in condition"--is telling us what we already know: that a string literal like "abc" is non-Boolean but being evaluated as such.)


<h3>My lie revealed</h3>
For those readers interested in my personal truths and lies...
<ol>
  <li>I speak Arabic, French, German, Spanish, and Hebrew.
      <strong>FALSE[Y]</strong> - I speak (to some degree) Arabic, French, German, and Spanish. I do not speak Hebrew.
  </li>
  <li>I once broke my collarbone in a game of wiffleball.
      <strong>TRUE</strong> - I ran (very quickly) into someone much bigger than myself.</li>
  <li>I have been to Staten Island.
      <strong>TRU[THY]</strong> - I haven't <u>really</u> been to Staten Island, but I've taken the ferry a few times and driven across the Verrazano Bridge.
  </li>
</ol>