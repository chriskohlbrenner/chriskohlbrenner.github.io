---
layout: post
title: "Debugging with Git Archaeology: Log -S, Bisect, and Blame"
date: 2014-05-29 19:41:14 -0400
comments: true
categories: 
---
I recently attended <a href="http://meetup.com/nycruby/events/182591142/">a meetup during which Danielle Sucher discussed debugging in Ruby</a>. Be jealous--those who came were given rubber duckies, since no discussion of debugging would be complete without mentioning <a href="http://en.wikipedia.org/wiki/Rubber_duck_debugging">rubber duck debugging</a>.

{% img center /images/git-debugging/rubberduck.png 600 %}

Rubber ducks aside, Danielle mentioned some helpful git commands when it comes to debugging--<code>git bisect</code>, <code>git blame</code>, and <code>git log -S</code>--which I'll cover in more detail here.

<!--more-->
<h3>Log -S</h3>
<code>git log</code> is a common command. It shows the commit logs. But what happens with the <code>-S</code> flag? Quoting the <a href="http://git-scm.com/docs/git-log">documentation</a> here,
<code>git log -S [string]</code> "Look[s] for differences that change the number of occurrences of the specified string (i.e. addition/deletion) in a file."

In the Bitcoin payment app I built, the <code>send_bitcoin</code> method was an obviously important one. If I wanted to see all commits in which that method was newly introduced or called, I could run <code>git log -S "send_bitcoin"</code>, and I'd see the log below.

{% img center /images/git-debugging/git-log-s.png %}

  
<h3>Blame</h3>
<code>git blame</code>
 <a href="http://git-scm.com/docs/git-blame">"Show what revision and author last modified each line of a file"</a>


<h3>Bisect</h3>
Most anyone who's used git has heard of <code>git bisect</code>, but a lot of us know it as one of those advanced git commands that we shouldn't mess with. That's a mistake.

Bisect--<a href="http://git-scm.com/docs/git-bisect">"find[ing] by binary search the change that introduced a bug"</a>--can be an invaluable debugging technique. When I first tried it, it seemed that there was a lot going on, but it's actually pretty simple (at least the basic bisect commands).

The example below shows how it can be done. In a sample app with a long commit history, assume there's a bug that was introduced somewhere between commit cd27e52 and the current master. There are about a dozen commits between, so the "bug" could be in any one of them. Four main steps:
<ol>
  <li>I run <code>git bisect start</code> to initiate the bisect process.</li>
  <li>I mark the current commit (on master) as good with <code>git bisect bad</code>.</li>
  <li>I indicate the most recent "good" commit (without the bug) with <code>git bisect good [commit]</code>. Bisect will now binary search through the recent commit history to determine where the bug got started.</li>
  <li>Bisect will pull up commits to be checked, which I designate as <code>git bisect good</code> or <code>git bisect bad</code>. Do this enough times, and you'll see "[commit hash] is the first bad commit".</li>
</ol>

{% img center /images/git-debugging/bisect.png %}

Just a couple minutes of debugging, and we've already determined the bad commit! (Some bug it must've been, in a markdown file). The <a href="http://git-scm.com/docs/git-bisect">Git documentation</a> describes a lot of additional git bisect commands.