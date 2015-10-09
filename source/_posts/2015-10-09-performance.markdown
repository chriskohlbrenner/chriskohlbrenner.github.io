---
layout: post
title: "Performance Process: takeaways from AEA"
date: 2015-10-09 12:39:03 -0500
comments: true
categories: ["Performance", "Front End", "UI", "User Interface", "Conferences"]
---

The stars have aligned lately to focus my attention on performance. Consider the following:

 - A few months ago, I was tasked with assessing and documenting the differences between our app's functionality/performance in Chrome vs. Firefox.
 - This exercise resulted in a pull request that improved Firefox performance by over 2 seconds (~25%) on initial page load.
 - [Earlier this week](/blog/2015/10/08/an-event-apart/), two separate talks (by [Yesenia Perez-Cruz](http://twitter.com/yeseniaa) and [Lara Hogan](http://twitter.com/lara_hogan)) focused on designing for performance.
 - Also this week, [Nate Berkopec's post on front end performance](http://www.nateberkopec.com/2015/10/07/frontend-performance-chrome-timeline.html) made the rounds on Hacker News.

What does this add up to? I've been thinking a lot about performance, particularly front end performance of web apps. In this post, I'll summarize some takeaways from AEA regarding performance, particularly as they relate to integrating performance into planning and design.

<!--more-->

<h3>Set up for failure</h3>

Summarizing a few points from Yesenia's talk, consider this project plan, one that we've all presumed to follow:

{% img /images/performance/ideal-plan.png %}

But then realize that, due to biz dev requirements, delays in research, and longer-than-expected design time, all while keeping the same sprint/client/deployment deadline, the actual project plan looks like this:

{% img /images/performance/actual-plan.png %}

We've all seen it! And it probably happens more often this way than the ideal case. What's the definition of insanity again?

Now I could speculate and hypothesize about the underlying issues of failed project management, but I'll leave that to someone else. I want to focus on performance. A question: with that development timeline in mind, when do we think about performance? During the software development segment, right?

{% img /images/performance/perf-timeline-reality.png %}

But why? We developers think we can implement user functionality, meet the design specs, and still have time left over to optimize at the end. But that never happens. Could we not consider performance at the beginning of the process?

{% img /images/performance/perf-timeline-improved.png %}

We need to think about performance as a design feature. We need to think about performance early. We need to prioritize page speed and load times just as much as UX and beautiful interfaces. But how?

<h3>Performance Budgets</h3>

{% imgcap /images/performance/dilbert-budget.gif "We only have the budget for a poor job" %}

I'm not sure we're being cheap <em>or</em> smart by thinking about performance this way. We don't have any budget at all! A theme throughout AEA, and not just in Yesenia's and Lara's talks, was <strong>setting a performance budget</strong>.

Yesenia explained that a performance budget is both "a performance goal used to guide design & development" and "a tangible way to talk about performance." How well do those conversations about performance-intensive features usually go? For developers, it's often either "no, we can't do that" or a resigned "ok, I guess we have to do it."

{% imgcap /images/performance/google-designer-developer.png One incredible trick will render 728,000 Google results obselete! %}

What if, instead of a win-lose scenario between designers and devs, the conversation was framed around a budget? We talk about the inherent tradeoffs between technologies, so why not consider performance tradeoffs in discussions about design?

"But how do I go about setting a performance budget?", you might ask. Yesenia and Lara made some suggestions:
 
 - <em>Browser-based approach</em>: "our pages should weigh no more than 400kb, and make no more than 15 requests."
 - <em>User experience-based</em>: "our pages should take no more than 10 seconds to load over a sub-3G connection."
 - <em>Look to your competitors</em>: aim for a 20% improvement over your competitors.

I'm still working on this, on how to practically establish a performance budget on the job. I don't have access to my competitors' product, so for now I can only set the goal as arbitrarily better performance.

One thing I will say: everything I've said in this blogpost has to be a culture change. Stealing from Lara's talk, it can't be all on one individual. You have to establish a culture of performance.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">&quot;There should be no performance cops or janitors. It&#39;s not sustainable. You need a culture of performance.&quot; <a href="https://twitter.com/lara_hogan">@lara_hogan</a> <a href="https://twitter.com/hashtag/aeaaus?src=hash">#aeaaus</a></p>&mdash; Chris EK (@cek_io) <a href="https://twitter.com/cek_io/status/651406414225649666">October 6, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>