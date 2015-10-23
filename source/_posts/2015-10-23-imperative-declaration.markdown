---
layout: post
title: "An Imperative Declaration"
date: 2015-10-23 16:42:28 -0400
comments: true
categories: ["Imperative Programming", "Declarative Programming", "Functional Programming", "JavaScript"]
---
A few hours ago, my understanding of imperative and declarative programming was effectively: imperative is about "how" something should happen and declarative is about "what" should happen. Not exactly authoritative, so I spent these last couple hours trying to clear that up by finding conclusive answers to the following questions:

 - What's the difference between imperative programming and declarative programming?
 - Is functional programming a subset of declarative programming?
 - If so, what's an example of declarative programming that's not functional?

Unfortunately, no definitive answers. Or perhaps too many "definitive" answers. So here's where I stand.

<!--more-->

###The Backstory###

Let me back up for a second. I went through a similar exercise a little while back. Google even pointed me to [this handy article](http://latentflip.com/imperative-vs-declarative/), which I found so useful that I summarized it in a [StackOverflow answer](http://stackoverflow.com/a/28216263).

I was pleasantly surprised by the three upvotes that came over the next few months, but of course all pleasant things must come to an end:

{% blockquote %}
  As with frighteningly many answers to this question, your example of 'declarative' programming is an example of functional programming. The semantics of 'map' are 'apply this function to the elements of the array in order'. You're not allowing the runtime any leeway in the order of execution.
{% endblockquote %}

Silly me, thinking I'd grasped a complex but fundamental concept, and sillier me, thinking I should share it. On the internet.

Thus began my quest to answer those three questions. (1) What *is* the difference between imperative and declarative? (2) Can I safely call functional programming a subset of declarative programming? (3) If so, what's an example of declarative programming that isn't functional?

###Defining the Question(s)###

I first tried to make sense of the critique I'd received on StackOverflow: "...your example of 'declarative' programming is an example of functional programming." I suppose that's what rendered my answer inappropriate for the question "What is the difference between declarative and imperative programming?". Easy solution--just look back to the [accepted answer](http://stackoverflow.com/a/1784702)...and find that the same commented left [a very similar critique](https://stackoverflow.com/questions/1784664/what-is-the-difference-between-declarative-and-imperative-programming#comment52439156_1784702).

This seemed to imply that functional programming and declarative programming are *not* synonomous (which I already believed), but also that there's a significant difference between declarative programming and functional programming (which I hadn't recognized). So what is it? Going back even farther, if this is a valid critique, what's the difference between imperative and declarative to begin with? I decided to reassess my answer.

###Some definitions###

<strong>Imperative Programming:</strong>

 - "Telling the 'machine' how to do something, and as a result what you want to happen will happen." [(Latentflip)](http://latentflip.com/imperative-vs-declarative/)
 - "A programming paradigm that uses statements that change a program's state. In much the same way that the imperative mood in natural languages expresses commands, an imperative program consists of commands for the computer to perform. Imperative programming focuses on describing how a program operates." [(Wikipedia)](https://en.wikipedia.org/wiki/Imperative_programming)
 - "Any programming language that specifies explicit manipulation of the state of the computer system." [(Foldoc)](http://foldoc.org/imperative%20programming)

<strong>Declarative Programming:</strong>

 - "Telling the 'machine' what you would like to happen, and let the computer figure out how to do it." [(Latentflip)](http://latentflip.com/imperative-vs-declarative/)
 - "A programming paradigm...that expresses the logic of a computation without describing its control flow. Many languages applying this style attempt to minimize or eliminate side effects by describing what the program should accomplish in terms of the problem domain, rather than describing how to go about accomplishing it as a sequence of the programming language primitives (the how being left up to the language's implementation)." [(Wikipedia)](https://en.wikipedia.org/wiki/Declarative_programming)
 - "Any relational language or functional language. These kinds of programming language describe relationships between variables in terms of functions or inference rules, and the language executor (interpreter or compiler) applies some fixed algorithm to these relations to produce a result." [(Foldoc)](http://foldoc.org/declarative%20languages)

<strong>Some takeaways:</strong>

 - How (imperative) vs. what (declarative)
 - Using control flow and mutating state (imperative) vs. minimizing/eliminating control flow and side effects

Here's where we already see some divergence in definition. *Minimizing* vs *eliminating* opens us up to an ambiguity. Does declarative programming necessitate absolutely no side effects, or just a preference for immutability? Is imperative programming about the lowest level of specified instructions, or just less abstraction?

###Arriving Back Full Circle###

With these thoughts in mind, I'd argue that declarative and imperative are *relative* terms, not absolute black and white, but a spectrum of lighter and darker gray. Generalizing, declarative programming is about specifying the "what", by way of certain abstractions (for example, functional operations like `map`) or by removing abstractions (for example, plain HTML rather than jQuery DOM manipulation), whereas declarative programming is about the "how", using lower level steps (for example, `for` loops).

So I stand by my original sentiments, and my original answer on StackOverflow. If we think of imperative and declarative as a spectrum rather than a binary either-or, we can use it as an effective part of our vocabulary rather than a confusing semantic argument.

That's where I'm at anyway. I hope you don't find it "frighteningly" off-target.