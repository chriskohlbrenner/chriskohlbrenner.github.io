---
layout: post
title: "wasting, spending, and saving time on active support"
date: 2014-03-27 13:08:38 -0400
comments: true
categories: Ruby Rails ActiveSupport Time
---
I'm working on a trip planner app using NJ Transit data to find the next departure time for a trip, given its origin and destination. For example, what's the next train leaving Hoboken for Secaucus?

{% img right images/hoboken_secaucus.png %}

<h4>It works!</h4>
At least as a proof of concept (<a href="https://github.com/chriskohlbrenner/njtransit">full code here</a>). I know, it's Jersey--not that great. Also messy SQL/Active Record queries... Those things aside, the fact that it's working means an annoying hurdle is behind me (or I at least better understand how to get around it). That hurdle is <strong>comparing time</strong>.

<!-- Making sense of Arel and ActiveRecord queries is an issue unto itself (and perhaps the subject of a future post), but  -->
<h3>About Time Comparisons</h3>
To determine the <i>next</i> departure time, I need to determine a time from the database with the current time. Not as easy as it seems.

<!-- the There's a lot going on behind the scenes--Rails and ActiveRecord and database associations and all--but some of the main code is below. -->

The code below is what enabled the screenshot above. So that's good, it works. But it's not pretty. <code>Time.now</code> is straightforward enough. And <code>.where("departure_time" > ?, \<time\>)</code> makes sense--it's an <a href="http://guides.rubyonrails.org/active_record_querying.html">Active Record query</a> that fires a SQL statement comparing the departure times from the database with the current time. But what about the <code>.change(year: 2000, month: 01, day: 01)</code>, especially with the appended <code>- 18000</code>?

{% include_code time.rb %}

<h3>Active Support and the <code>change</code> helper</h3>

Enter <a href="http://guides.rubyonrails.org/active_support_core_extensions.html">Active Support</a>, specifically its <strong>Time</strong> class (<a href="http://api.rubyonrails.org/classes/Time.html">documentation</a> and <a href="https://github.com/rails/rails/blob/master/activesupport/lib/active_support/core_ext/time/calculations.rb">full source code</a>). Thanks to <a href="https://stackoverflow.com/questions/11973225/rails-how-to-store-time-of-day-for-schedule/15350965#15350965">this StackOverflow answer</a>, I was directed to the ActiveSupport helpers. These inlude <code>beginning_of_day()</code>, <code>seconds_until_end_of_day()</code>, <code>days_in_month(month, year = now.year)</code>, and dozens of other awesome helpers.

As my code shows, I chose the <code><a href="http://api.rubyonrails.org/classes/Time.html#method-i-change">change(options)</a></code> helper. This helper returns a new Time based on a number of parameters. It got the job done, but it was only necessary because of a formatting issue (I also left my previous attempts in the code as artifacts--evidence of my failed attempts at hacking through the time comparison).

The original values I used to populate my database were CSVs, meaning that the time values were strings, like <code>09:30:00</code> (hour/minute/second). Simple enough, except that when I seeded the database with those strings as time values, they created values like this: <code>2000-01-01 09:30:00 UTC</code>. Basically, those time values (as strings) were converted to instances of the Time class, which include year, month, day, and timezone with defaults of 2000, 01, 01, and UTC.

My solution--hacky as it was--was to <code>change</code>my <code>Time.now</code> to match that format, hence my <code>Time.now</code> of <code>2014-03-27 09:30:00 -400</code> became <code>2014-03-27 09:30:00 -500</code>. This was still off because of the time zone, hence the <code>- 18000</code>. 18000 seconds is how many hours? Five, the exact number I needed to offset for the timezone (UTC, or Coordinated Universal Time, is treated as equivalent to Greenwich Mean Time).

<h3>There's got to be a better way</h3>
There is. A lot of what I did is unnecessary. In theory, the dates don't even need to match up--I could just calculate the difference and append a different value than the 18000 to compensate (though it'd be more difficult to conceptualize). Even that is bad. What I really want to do is store those initial values (the time strings) as <strong>offsets from midnight in seconds</strong>.

In a roundabout way, I'm back to the original StackOverflow answer, which suggests storing database values as seconds from midnight. I'm still working out how, given strings like "06:48:00", I can populate my database with offsets from midnight (24480), but I've played with irb enough (requiring 'active_support/time') to know that <code>Time.parse("06:48:00").seconds_since_midnight</code> works. Now I just need to refactor to make that work in my app.