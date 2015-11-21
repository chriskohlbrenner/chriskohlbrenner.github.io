---
layout: post
title: "Pruning Code"
date: 2015-11-21 12:23:14 -0500
comments: true
categories: [JavaScript, Front End, Maintenance, User Interface, UI, React, Workflow]
---

It was Friday afternoon, the end of the day, at the end of a long week of urgent bugfixes to prepare a release. Our next features hadn't been fully designed and approved, all the high-priority bugs had been identified and fixed, and I was left with a few hours to choose what to work on.

These moments are some of my favorites, opportunities to focus on the important/non-urgent tasks like performance improvements, refactors, new technologies, and code cleanup. So I spent the last few hours of the day on that last item: pruning old code from the codebase.

We all know that pruning is about [removing the superfluous](http://dictionary.reference.com/browse/pruning), which is by definition a good thing ("superfluous" being "unnecessary", after all), but the benefits of pruning also include:

  - improving or maintaining health
  - reducing risk
  - increasing yield or quality

<em>Source</em>: ["Pruning", Wikipedia](https://en.wikipedia.org/wiki/Pruning)

Ok, ok, we're not talking about plant health, risk of falling branches, or yield of flowers and fruits. But it's a pretty straightforward metaphor for code.

<!--more-->

The pull request I ended up submitting did three things (removed, removed, removed, like pruning):
  
  - It removed the `/** @jsx React.DOM */` pragma, which has been unnecessary since React 0.12 (we're currently running 0.13).
  - It removed `Immutable` as a global variable (we're using Immutable JS on most--but not all--pages, and we want to explicitly require libraries for each file/component, plus...[yeah](http://c2.com/cgi/wiki?GlobalVariablesAreBad)).
  - It removed a couple helper functions from a utility file the depends on lodash.js, which largely overlaps with our Ramda.js library.

These are simple things. Remove unnecessary lines of code. Clarify what a given file is doing by making modules more explicit. Reduce the number of dependencies and the weight of the codebase.

These are clearly beneficial things. Deleting the unnecessary reduces mental overhead. Explicit requires ease our ability to reason about a piece of code. Removing an external library improves performance.

Simple, beneficial, and yet when do these things get accomplished? As I referenced above, rarely. It was only after feature development, testing, and bugfixing that I even considered it. To some degree that's on me: it's a technical discipline like performance or code quality that needs to be considered at each step along the way. But it's also on the development process and management: if it's not prioritized and time isn't allotted, it won't happen! That simple.

Anyway, that's my argument for code pruning. Regardless of whether anyone else finds it valid, it's a personal goal of mine to spend a couple hours a week on exactly that. Removing dependencies, deleting dead code, refactoring. And who knows, perhaps with a little more disciplined code pruning along the way, code quality will improve and our team will have fewer weeks of urgent bugfixes.